import React, { use, useEffect, useState } from "react";
import SmartBillContext from "../../Context/SmartBillContext";
import { toast } from "react-toastify";

const Transiction = () => {
    const [allTransiction,setAllTransiction]=useState([])
  const { fireBaseUser,logoutUser } = use(SmartBillContext);
 const accessToken =fireBaseUser?.accessToken
 const uid =fireBaseUser?.uid
    useEffect(()=>{
        fetch(`http://localhost:4000/transiction/${uid}`,{
            headers:{
                authoriztion :`Bearer ${accessToken}`
            }
        }).then(res=>{
            if(res.status ===401){
                logoutUser()
               return toast.warn("Unauthorized acces")
            }
            else if(res.status ===403){
                logoutUser()
              return  toast.warn("Forbidden  acces")
            }
            return res.json()
        }).then(data=>setAllTransiction(data))

    },[uid,accessToken,logoutUser])

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
                Transactions <span className="text-base text-gray-500">({allTransiction.length})</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allTransiction.map((trx) => (
                    <div
                        key={trx._id}
                        className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border hover:shadow-lg transition"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-blue-600 font-semibold text-lg capitalize">{trx.bill_type}</span>
                            <span className="text-gray-400 text-xs">#{trx._id.slice(-6)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">{trx.organization}</span>
                            <span className="text-green-600 font-bold text-xl">৳ {trx.amount}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-gray-500 text-sm">
                                Paid: <span className="font-medium text-gray-700">{trx.date}, {trx.time}</span>
                            </span>
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">PayCode: {trx.payCode}</span>
                        </div>
                        <div className="flex items-center mt-2">
                            <span className="text-gray-500 text-sm">
                                Due: <span className="font-medium text-gray-700">{trx.due_date}</span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
    </div>
  );
};

export default Transiction;
