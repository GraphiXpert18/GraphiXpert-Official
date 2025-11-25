'use client';

import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

// Mock Data
const initialServices = [
    { _id: '1', title: 'Web Design', price: '$500 - $5000' },
    { _id: '2', title: 'App Development', price: '$2000 - $15000' },
    { _id: '3', title: 'UI/UX Design', price: '$1000 - $8000' },
];

export default function AdminServicesPage() {
    const [services, setServices] = useState(initialServices);

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this service?')) {
            setServices(services.filter(s => s._id !== id));
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Manage Services</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition">
                    <FaPlus className="mr-2" /> Add New Service
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price Range</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {services.map((service) => (
                            <tr key={service._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 mr-4"><FaEdit /></button>
                                    <button onClick={() => handleDelete(service._id)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
