import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const BillPage = () => {
  const initialBillData = useLoaderData();
  const [allBillData, setAllBillData] = useState(initialBillData);
  const handleDeleteBill = (id) => {
    // delte also db
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:4000/bill/${id}`, {
          method:"DELETE"
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              toast.success("Bill deleted successfully");
            }
          });
        const remainingBills = allBillData.filter((bill) => bill._id !== id);
        setAllBillData(remainingBills);

      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        My Bills{" "}
        <span className="text-base text-gray-500">({allBillData.length})</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allBillData.map((bill) => (
          <div
            key={bill._id}
            className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-blue-600 font-semibold text-lg capitalize">
                {bill.bill_type}
              </span>
              <span className="text-gray-400 text-xs">
                #{bill._id.slice(-6)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">
                {bill.organization}
              </span>
              <span className="text-green-600 font-bold text-xl">
                ৳ {bill.amount}
              </span>
            </div>
            <div className="flex  items-center mt-2">
              <span className="text-gray-500 text-sm">
                Due:{" "}
                <span className="font-medium text-gray-700">
                  {bill.due_date}
                </span>
              </span>
            </div>
            <div className="flex justify-around mt-4">
              <Link to={`/billdetails/${bill._id}`} className="btn btn-primary">Details</Link>
              <Link to={`/editbill/${bill._id}`} className="btn btn-primary">Edit</Link>
              <button
                onClick={() => handleDeleteBill(bill._id)}
                className="btn btn-primary"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillPage;
