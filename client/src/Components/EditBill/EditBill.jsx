import React from "react";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";

const EditBill = () => {
  const bill = useLoaderData();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedBill = Object.fromEntries(formData.entries());
    // http://localhost:4000
    fetch(`http://localhost:4000/editbill/${bill._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedBill),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success("Bill updated successfully");
        } else {
          toast.error("Failed to update bill");
        }
      });
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        Edit Bill
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Bill Type
          </label>
          <input
            type="text"
            name="bill_type"
            defaultValue={bill.bill_type}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Organization
          </label>
          <input
            type="text"
            name="organization"
            defaultValue={bill.organization}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            defaultValue={bill.amount}
            required
            min={1}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            name="due_date"
            defaultValue={bill.due_date}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Update Bill
        </button>
      </form>
    </div>
  );
};

export default EditBill;
