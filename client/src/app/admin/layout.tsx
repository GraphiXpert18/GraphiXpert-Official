'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            router.push('/login');
            return;
        }

        try {
            const user = JSON.parse(userStr);
            if (user.role !== 'admin') {
                router.push('/dashboard'); // Redirect non-admins to user dashboard
                return;
            }
            setAuthorized(true);
        } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('user');
            router.push('/login');
        }
    }, [router]);

    if (!authorized) {
        return null; // Or a loading spinner
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />
            <main className="flex-grow p-8 overflow-y-auto h-screen">
                {children}
            </main>
        </div>
    );
}
