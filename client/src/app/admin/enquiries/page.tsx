'use client';

import { useState } from 'react';

// Mock Data
const initialEnquiries = [
    { _id: '1', name: 'John Doe', email: 'john@example.com', service: 'Web Design', status: 'New', date: '2023-10-25' },
    { _id: '2', name: 'Jane Smith', email: 'jane@example.com', service: 'App Development', status: 'In Progress', date: '2023-10-24' },
];

export default function AdminEnquiriesPage() {
    const [enquiries, setEnquiries] = useState(initialEnquiries);

    const handleStatusChange = (id: string, newStatus: string) => {
        setEnquiries(enquiries.map(e => e._id === id ? { ...e, status: newStatus } : e));
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Client Enquiries</h1>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {enquiries.map((enquiry) => (
                            <tr key={enquiry._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{enquiry.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <div>{enquiry.name}</div>
                                    <div className="text-gray-400 text-xs">{enquiry.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{enquiry.service}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${enquiry.status === 'New' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {enquiry.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <select
                                        value={enquiry.status}
                                        onChange={(e) => handleStatusChange(enquiry._id, e.target.value)}
                                        className="border border-gray-300 rounded text-sm p-1"
                                    >
                                        <option value="New">New</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Archived">Archived</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
