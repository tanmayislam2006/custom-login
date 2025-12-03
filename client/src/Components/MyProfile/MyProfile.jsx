import React, { use } from 'react';
import SmartBillContext from '../../Context/SmartBillContext';

const MyProfile = () => {
    const { user } = use(SmartBillContext);

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="text-gray-500">Loading profile...</span>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-12 bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <img
                src={user.photoURL}
                alt={user.fullName}
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 mb-4"
            />
            <h2 className="text-2xl font-bold text-blue-700 mb-1">{user.fullName}</h2>
            <p className="text-gray-600 mb-2">{user.email}</p>
            <div className="w-full mt-4">
                <div className="flex justify-between py-2 border-b">
                    <span className="font-medium text-gray-500">User ID:</span>
                    <span className="text-gray-700 text-sm">{user._id}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                    <span className="font-medium text-gray-500">Account Created:</span>
                    <span className="text-gray-700 text-sm">{user.creationTime}</span>
                </div>
                <div className="flex justify-between py-2">
                    <span className="font-medium text-gray-500">Last Sign In:</span>
                    <span className="text-gray-700 text-sm">{user.lastSignInTime}</span>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;