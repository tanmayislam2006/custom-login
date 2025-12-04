import React from 'react';
import { useSmartBill } from '../../Context/SmartBillContext';

const MyProfile = () => {
    const { user } = useSmartBill();

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="text-gray-500">Loading profile...</span>
            </div>
        );
    }

    // Fallback image if photoURL is missing
    const photoURL = user.photoURL || "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg";

    return (
        <div className="max-w-md mx-auto mt-12 bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <img
                src={photoURL}
                alt={user.name || user.email}
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 mb-4"
            />
            <h2 className="text-2xl font-bold text-blue-700 mb-1">{user.name}</h2>
            <p className="text-gray-600 mb-2">{user.email}</p>
            <div className="w-full mt-4">
                <div className="flex justify-between py-2 border-b">
                    <span className="font-medium text-gray-500">User ID:</span>
                    <span className="text-gray-700 text-sm">{user.id}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                    <span className="font-medium text-gray-500">Role:</span>
                    <span className="text-gray-700 text-sm">{user.role}</span>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
