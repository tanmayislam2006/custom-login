import React, { useState, ChangeEvent, FormEvent } from "react";
import { useSmartBill } from "../../Context/SmartBillContext";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Utility/AxiosInseptor/AxiosInseptor";

const billTypes = [
  "electricity",
  "gas",
  "internet",
  "water",
  "credit card bill",
  "tuition",
  "college fee",
  "school fee",
];

const organizations = [
  "DESCO",
  "NESCO",
  "PDB",
  "WZPDCL",
  "Tista",
  "Karnaphuli Gas",
  "Bakhrabad Gas",
  "Jalalabad Gas",
  "Link3",
  "Summit Communications",
  "Bangla Lion",
  "WASA",
  "DWASA",
  "Chittagong WASA",
  "City Bank",
  "BRAC Bank",
  "Eastern Bank",
  "DPS School",
  "North South University",
  "Sunbeams School",
];

const CreateBillPage = () => {
  const { user } = useSmartBill();
  const axiosSecure = useAxiosSecure();
  const [form, setForm] = useState({
    bill_type: "",
    organization: "",
    amount: "",
    due_date: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const formData = new FormData(target);
    const billInformation = Object.fromEntries(formData.entries());
    const createdBill = {
      ...billInformation,
      uid: user?.id,
    };

    // Updated endpoint to /api/bill/create
    axiosSecure.post("/api/bill/create", createdBill)
      .then((res) => {
        if (res.data.success) {
          toast.success("Bill created successfully");
        }
      })
      .catch(err => {
          console.error(err);
          toast.error("Failed to create bill");
      });

    setForm({
      bill_type: "",
      organization: "",
      amount: "",
      due_date: "",
    });
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        Create New Bill
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Bill Type
          </label>
          <select
            name="bill_type"
            value={form.bill_type}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Bill Type</option>
            {billTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Organization
          </label>
          <select
            name="organization"
            value={form.organization}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Organization</option>
            {organizations.map((org) => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
            min={1}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter amount"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            name="due_date"
            value={form.due_date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Create Bill
        </button>
      </form>
    </div>
  );
};

export default CreateBillPage;
