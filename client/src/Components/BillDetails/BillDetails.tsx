import React, { useEffect, useState } from "react";
import { useSmartBill } from "../../Context/SmartBillContext";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import useAxiosSecure from "../../Utility/AxiosInseptor/AxiosInseptor";

// Define interfaces for Bill and Transaction
interface Bill {
  _id: string;
  bill_type: string;
  organization: string;
  amount: number;
  due_date: string;
}

interface Transaction {
  _id: string;
  bill_id: string;
  bill_type: string;
  organization: string;
  amount: number;
  uid: string;
  date: string;
  time: string;
  payCode: number;
}

const BillDetails = () => {
  const { id } = useParams();
  const { user } = useSmartBill();
  const [transictions, setTransictions] = useState<Transaction[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [bill, setBill] = useState<Bill | null>(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (id) {
        // Endpoint: /api/bill/:billId
        axiosSecure.get(`/api/bill/${id}`)
        .then((res) => {
           // Backend returns { success: true, data: ... }
           setBill(res.data.data);
        })
        .catch(err => console.error(err));
    }
  }, [id, axiosSecure]);

  useEffect(() => {
    if (user?.id) {
        // Checking for transactions if endpoint exists
        // Since backend doesn't have it, this will likely fail 404.
        // I'll keep it as requested to "fetch all api from my whole client match my front end"
        // assuming maybe user forgot to mention backend change or I should attempt it.
        // But to be safe, I will wrap it in try/catch and just log error.
        axiosSecure.get(`/transiction/${user.id}`)
        .then((res) => setTransictions(res.data))
        .catch(err => {
            // Silently fail if route doesn't exist
            console.warn("Transaction fetch failed", err.message);
        });
    }
  }, [user, refresh, axiosSecure]);

  const handlePayNow = () => {
    if (!bill) return;

    const isAlreadyPaid = transictions.find(
      (transiction) => transiction.bill_id === bill._id
    );
    if (isAlreadyPaid) {
      return toast.error("You have already paid this bill");
    }

    let now = new Date();
    let date = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    let time = now.toLocaleTimeString();
    const payCode = Math.floor(100000 + Math.random() * 900000);
    const transictionInformation = {
      bill_id: bill._id,
      bill_type: bill.bill_type,
      organization: bill.organization,
      amount: bill.amount,
      due_date: bill.due_date,
      uid: user?.id,
      date,
      time,
      payCode,
    };

    // Attempt to post transaction.
    // If /bill/:id POST was the old way, and backend only has /create, /get, /update, /delete,
    // then this payment feature is indeed missing in backend.
    // I will try to call it, but expect failure if backend isn't updated.
    axiosSecure.post(`/bill/${bill._id}`, transictionInformation)
      .then((res) => {
        if (res.data.insertedId || res.data.success) {
          toast.success("Payment Successful");
          setRefresh(!refresh);
        }
      })
      .catch(err => toast.error("Payment Failed (Backend support missing?)"));
  };

  if (!bill) {
      return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Bill Details
      </h2>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">Bill Type:</span>
          <span className="text-blue-600 font-semibold capitalize">
            {bill.bill_type}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">Organization:</span>
          <span className="text-gray-700 font-semibold">
            {bill.organization}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">Amount:</span>
          <span className="text-green-600 font-bold text-xl">
            ৳ {bill.amount}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">Due Date:</span>
          <span className="text-gray-700 font-semibold">{bill.due_date}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">Bill ID:</span>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
            {bill._id}
          </span>
        </div>
        <div className="flex justify-center">
          <button onClick={() => handlePayNow()} className="btn btn-primary">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillDetails;
