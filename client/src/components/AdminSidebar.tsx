'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FaTachometerAlt, FaServicestack, FaImages, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

const AdminSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login');
    };

    const links = [
        { name: 'Dashboard', path: '/admin', icon: <FaTachometerAlt /> },
        { name: 'Services', path: '/admin/services', icon: <FaServicestack /> },
        { name: 'Portfolio', path: '/admin/portfolio', icon: <FaImages /> },
        { name: 'Enquiries', path: '/admin/enquiries', icon: <FaEnvelope /> },
    ];

    return (
        <div className="bg-gray-900 text-white w-64 min-h-screen flex flex-col">
            <div className="p-6 border-b border-gray-800">
                <h2 className="text-2xl font-bold">Admin Panel</h2>
            </div>
            <nav className="flex-grow p-4">
                <ul className="space-y-2">
                    {links.map((link) => (
                        <li key={link.path}>
                            <Link
                                href={link.path}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-md transition duration-300 ${pathname === link.path
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                <span className="text-xl">{link.icon}</span>
                                <span>{link.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 w-full text-left text-red-400 hover:bg-gray-800 rounded-md transition duration-300"
                >
                    <FaSignOutAlt className="text-xl" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
