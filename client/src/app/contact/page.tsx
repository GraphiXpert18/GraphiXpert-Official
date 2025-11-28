'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaPhone, FaEnvelope, FaUser } from 'react-icons/fa';
import api from '@/lib/api';

const contactPersons = [
    {
        name: 'Surya',
        phone: '7358918032',
        email: 'suriya1252004@gmail.com',
    },
    {
        name: 'Shree Ganesh',
        phone: '8610927831',
        email: 'shreeganeshaiengg@gmail.com',
    },
    {
        name: 'Raja Mohamed',
        phone: '9788156637',
        email: 'rajaaysha78@gmail.com',
    },
];

function ContactForm() {
    const searchParams = useSearchParams();
    const initialService = searchParams.get('service') || '';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        serviceType: initialService,
        message: '',
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            // Attempt to send to backend
            console.log('Submitting to:', api.defaults.baseURL + '/enquiries');
            console.log('Form data:', formData);
            await api.post('/enquiries', formData);
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', serviceType: '', message: '' });
        } catch (error: any) {
            console.error('Error submitting form:', error);
            console.error('Error response:', error.response);
            console.error('Error message:', error.message);
            setStatus('error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

            {status === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    Thank you! Your message has been sent successfully.
                </div>
            )}

            {status === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    Something went wrong. Please try again later.
                </div>
            )}

            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone (Optional)</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="serviceType" className="block text-gray-700 font-medium mb-2">Service Type</label>
                <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select a Service</option>
                    <option value="Web Design">Web Design</option>
                    <option value="App Development">App Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Multimedia Service">Multimedia Service</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
}

export default function ContactPage() {
    return (
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                    Contact Us
                </h1>
                <p className="mt-4 text-xl text-gray-500">
                    We'd love to hear from you. Let's discuss your project.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">Our Team</h3>
                    <div className="grid grid-cols-1 gap-6 mb-8">
                        {contactPersons.map((person, index) => (
                            <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div className="flex items-center mb-4">
                                    <div className="bg-blue-600 p-3 rounded-full mr-3">
                                        <FaUser className="text-white" size={20} />
                                    </div>
                                    <h4 className="font-bold text-lg text-gray-900">{person.name}</h4>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-start">
                                        <FaPhone className="text-blue-600 mt-1 mr-3 flex-shrink-0" size={16} />
                                        <a href={`tel:+91${person.phone}`} className="text-gray-700 hover:text-blue-600 transition-colors text-sm">
                                            +91 {person.phone}
                                        </a>
                                    </div>
                                    <div className="flex items-start">
                                        <FaEnvelope className="text-blue-600 mt-1 mr-3 flex-shrink-0" size={16} />
                                        <a href={`mailto:${person.email}`} className="text-gray-700 hover:text-blue-600 transition-colors text-sm break-all">
                                            {person.email}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Form */}
                <div>
                    <Suspense fallback={<div>Loading form...</div>}>
                        <ContactForm />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
