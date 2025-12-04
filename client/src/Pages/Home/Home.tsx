import React from 'react';
import { useSmartBill } from '../../Context/SmartBillContext';
import { Link } from 'react-router';
import Hero from './Hero';

const Home = () => {
    const { user } = useSmartBill();

    return (
        <div className="min-h-[80vh] bg-gray-50 flex flex-col items-center justify-center px-4">
            {/* Hero Section */}
            <Hero/>
            <section className="text-center mb-10">
                <h1 className="text-4xl font-bold text-blue-700 mb-3">Welcome to Smart Bill Manager</h1>
                <p className="text-gray-600 max-w-xl mx-auto">
                    Effortlessly manage, track, and pay all your bills in one place. Stay organized and never miss a due date again!
                </p>
            </section>

            {/* Quick Actions */}
            <section className="flex gap-4 mb-12">
                <Link
                    to="/createbill"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Create New Bill
                </Link>
                <Link
                    to={user ? `/mybill/${user.id}` : "/login"}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                >
                    View My Bills
                </Link>
            </section>

            {/* Features Section */}
            <section className="w-full max-w-3xl grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                    <span className="text-blue-500 text-3xl mb-2">📅</span>
                    <h3 className="font-bold mb-1">Bill Reminders</h3>
                    <p className="text-gray-500 text-sm text-center">Get notified before your bills are due so you never miss a payment.</p>
                </div>
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                    <span className="text-green-500 text-3xl mb-2">💳</span>
                    <h3 className="font-bold mb-1">Easy Payments</h3>
                    <p className="text-gray-500 text-sm text-center">Pay your bills quickly and securely from one dashboard.</p>
                </div>
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                    <span className="text-yellow-500 text-3xl mb-2">📊</span>
                    <h3 className="font-bold mb-1">Track Spending</h3>
                    <p className="text-gray-500 text-sm text-center">See your payment history and analyze your monthly expenses.</p>
                </div>
            </section>

            {/* About Section */}
            <section className="max-w-2xl text-center text-gray-600">
                <h2 className="text-xl font-semibold text-blue-700 mb-2">Why Smart Bill Manager?</h2>
                <p>
                    Our platform is designed to simplify your life by keeping all your bills organized and accessible. Whether it's utilities, tuition, or credit cards, Smart Bill Manager is your one-stop solution for stress-free bill management.
                </p>
            </section>
        </div>
    );
};

export default Home;
