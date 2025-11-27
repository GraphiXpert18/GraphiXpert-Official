'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaServicestack, FaImages, FaEnvelope, FaUsers } from 'react-icons/fa';
import api from '@/lib/api';

export default function AdminDashboard() {
    const router = useRouter();
    const [stats, setStats] = useState({
        services: 0,
        projects: 0,
        enquiries: 0,
        clients: 0,
    });
    const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const userStr = localStorage.getItem('user');
            console.log('Dashboard: Current User in LocalStorage:', userStr);

            // Fetch services count
            const servicesRes = await api.get('/services');
            const services = servicesRes.data;

            // Fetch portfolio/projects count
            const projectsRes = await api.get('/portfolio');
            const projects = projectsRes.data;

            // Fetch enquiries
            const enquiriesRes = await api.get('/enquiries');
            const enquiries = enquiriesRes.data;

            setStats({
                services: services.length,
                projects: projects.length,
                enquiries: enquiries.filter((e: any) => e.status === 'new').length,
                clients: enquiries.length, // Total enquiries as clients
            });

            // Get 3 most recent enquiries
            setRecentEnquiries(enquiries.slice(0, 3));
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const statsData = [
        { title: 'Total Services', value: stats.services.toString(), icon: <FaServicestack size={30} />, color: 'bg-blue-500' },
        { title: 'Projects', value: stats.projects.toString(), icon: <FaImages size={30} />, color: 'bg-green-500' },
        { title: 'New Enquiries', value: stats.enquiries.toString(), icon: <FaEnvelope size={30} />, color: 'bg-yellow-500' },
        { title: 'Total Clients', value: stats.clients.toString(), icon: <FaUsers size={30} />, color: 'bg-purple-500' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard Overview</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsData.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-center">
                        <div className={`${stat.color} text-white p-4 rounded-full mr-4`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">{stat.title}</p>
                            <p className="text-2xl font-bold text-gray-800">{loading ? '...' : stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Enquiries */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Recent Enquiries</h2>
                        <button
                            onClick={() => router.push('/admin/enquiries')}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                            View All →
                        </button>
                    </div>
                    <div className="space-y-4">
                        {loading ? (
                            <p className="text-gray-500 text-center py-4">Loading...</p>
                        ) : recentEnquiries.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">No enquiries yet</p>
                        ) : (
                            recentEnquiries.map((enquiry) => (
                                <div key={enquiry._id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold text-gray-800">{enquiry.name}</p>
                                            <p className="text-sm text-gray-500">{enquiry.serviceType || 'General Enquiry'}</p>
                                            <p className="text-xs text-gray-400 mt-1">{enquiry.email}</p>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded ${enquiry.status === 'new'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {enquiry.status || 'New'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => router.push('/admin/services')}
                            className="bg-blue-50 text-blue-600 p-4 rounded-lg hover:bg-blue-100 transition text-center font-medium"
                        >
                            Manage Services
                        </button>
                        <button
                            onClick={() => router.push('/admin/portfolio')}
                            className="bg-green-50 text-green-600 p-4 rounded-lg hover:bg-green-100 transition text-center font-medium"
                        >
                            Manage Projects
                        </button>
                        <button
                            onClick={() => router.push('/admin/enquiries')}
                            className="bg-yellow-50 text-yellow-600 p-4 rounded-lg hover:bg-yellow-100 transition text-center font-medium"
                        >
                            View Enquiries
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-purple-50 text-purple-600 p-4 rounded-lg hover:bg-purple-100 transition text-center font-medium"
                        >
                            Refresh Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
