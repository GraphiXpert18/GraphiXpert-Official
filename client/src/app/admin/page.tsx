'use client';

import { FaServicestack, FaImages, FaEnvelope, FaUsers } from 'react-icons/fa';

export default function AdminDashboard() {
    const stats = [
        { title: 'Total Services', value: '6', icon: <FaServicestack size={30} />, color: 'bg-blue-500' },
        { title: 'Portfolio Items', value: '12', icon: <FaImages size={30} />, color: 'bg-green-500' },
        { title: 'New Enquiries', value: '5', icon: <FaEnvelope size={30} />, color: 'bg-yellow-500' },
        { title: 'Total Clients', value: '24', icon: <FaUsers size={30} />, color: 'bg-purple-500' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-center">
                        <div className={`${stat.color} text-white p-4 rounded-full mr-4`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">{stat.title}</p>
                            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Enquiries</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-gray-800">John Doe</p>
                                        <p className="text-sm text-gray-500">Web Design Request</p>
                                    </div>
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">New</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="bg-blue-50 text-blue-600 p-4 rounded-lg hover:bg-blue-100 transition text-center font-medium">
                            Add New Service
                        </button>
                        <button className="bg-green-50 text-green-600 p-4 rounded-lg hover:bg-green-100 transition text-center font-medium">
                            Add Portfolio Item
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
