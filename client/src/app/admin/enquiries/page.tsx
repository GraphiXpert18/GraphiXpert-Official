'use client';

import { useState, useEffect } from 'react';
import { FaTrash, FaEnvelope, FaPhone } from 'react-icons/fa';
import api from '@/lib/api';

export default function AdminEnquiriesPage() {
    const [enquiries, setEnquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        try {
            const response = await api.get('/enquiries');
            setEnquiries(response.data);
        } catch (error) {
            console.error('Error fetching enquiries:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            await api.put(`/enquiries/${id}`, { status: newStatus });
            setEnquiries(enquiries.map(e => e._id === id ? { ...e, status: newStatus } : e));
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this enquiry?')) {
            try {
                await api.delete(`/enquiries/${id}`);
                setEnquiries(enquiries.filter(e => e._id !== id));
            } catch (error) {
                console.error('Error deleting enquiry:', error);
                alert('Failed to delete enquiry');
            }
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Client Enquiries</h1>
                <div className="text-sm text-gray-600">
                    Total: <span className="font-bold">{enquiries.length}</span>
                </div>
            </div>

            {loading ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <p className="text-gray-500">Loading enquiries...</p>
                </div>
            ) : enquiries.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <FaEnvelope className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500">No enquiries yet</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {enquiries.map((enquiry) => (
                                    <tr key={enquiry._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(enquiry.createdAt || enquiry.date)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {enquiry.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            <div className="flex flex-col space-y-1">
                                                <div className="flex items-center">
                                                    <FaEnvelope className="mr-2 text-gray-400" size={12} />
                                                    <span className="text-xs">{enquiry.email}</span>
                                                </div>
                                                {enquiry.phone && (
                                                    <div className="flex items-center">
                                                        <FaPhone className="mr-2 text-gray-400" size={12} />
                                                        <span className="text-xs">{enquiry.phone}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {enquiry.serviceType || 'General'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                                            <div className="line-clamp-2" title={enquiry.message}>
                                                {enquiry.message}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={enquiry.status || 'new'}
                                                onChange={(e) => handleStatusChange(enquiry._id, e.target.value)}
                                                className={`text-xs px-2 py-1 rounded border-0 font-semibold ${enquiry.status === 'new' || !enquiry.status
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : enquiry.status === 'in-progress'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : enquiry.status === 'completed'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-gray-100 text-gray-800'
                                                    }`}
                                            >
                                                <option value="new">New</option>
                                                <option value="in-progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                                <option value="archived">Archived</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleDelete(enquiry._id)}
                                                className="text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-50 transition"
                                                title="Delete enquiry"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
