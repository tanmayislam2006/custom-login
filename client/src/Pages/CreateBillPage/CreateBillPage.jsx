import React, { useState,use } from "react";
import SmartBillContext from "../../Context/SmartBillContext";
import { toast } from "react-toastify";

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
      const {fireBaseUser}=use(SmartBillContext)
  const [form, setForm] = useState({
    bill_type: "",
    organization: "",
    amount: "",
    due_date: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const billInformation = Object.fromEntries(formData.entries());
    const createdBill ={
        ...billInformation,
        uid:fireBaseUser?.uid
    }
    // set data on db
    fetch("http://localhost:4000/createdbill", {
        method:"POST",
        headers:{
          'content-type': "application/json"
        },
        body:JSON.stringify(createdBill)
    })
      .then((res) => res.json())
      .then((data) => {
       if(data.insertedId){
        toast.success("Bill created successfully");
       }
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
