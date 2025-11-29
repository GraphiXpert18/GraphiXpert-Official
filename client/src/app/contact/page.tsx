'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaPhone, FaEnvelope, FaUser, FaPaperPlane, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';
import api from '@/lib/api';

interface ContactPerson {
    name: string;
    email: string;
    role: string;
    phone?: string;
}

const contactPersons: ContactPerson[] = [
    {
        name: 'GraphiXpert',
        email: 'graphixpert18@gmail.com',
        role: 'Technical Lead'
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
            await api.post('/enquiries', formData);
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', serviceType: '', message: '' });
        } catch (error: any) {
            console.error('Error submitting form:', error);
            setStatus('error');
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-blue-600 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                    <FaPaperPlane className="mr-3" /> Send us a Message
                </h2>
                <p className="text-blue-100 mt-2">Fill out the form below and we'll get back to you shortly.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
                {status === 'success' && (
                    <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded shadow-sm animate-fade-in">
                        <p className="font-bold">Success!</p>
                        <p>Your message has been sent successfully. We'll be in touch soon.</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-sm animate-fade-in">
                        <p className="font-bold">Error</p>
                        <p>Something went wrong. Please try again later.</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="john@example.com"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="+91 98765 43210"
                        />
                    </div>
                    <div>
                        <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-700 mb-2">Service Interested In</label>
                        <div className="relative">
                            <select
                                id="serviceType"
                                name="serviceType"
                                value={formData.serviceType}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none bg-white"
                            >
                                <option value="">Select a Service</option>
                                <option value="Web Design">Web Design</option>
                                <option value="App Development">App Development</option>
                                <option value="UI/UX Design">UI & UX Design</option>
                                <option value="Graphic Design">Graphic Design</option>
                                <option value="Multimedia Service">Multimedia Service</option>
                                <option value="Digital Marketing">Digital Marketing</option>
                                <option value="Other">Other</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                        placeholder="Tell us about your project requirements..."
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === 'submitting' ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending Message...
                        </span>
                    ) : 'Send Message'}
                </button>
            </form>
        </div>
    );
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gray-900 text-white py-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 mix-blend-multiply" />
                </div>
                <div className="relative max-w-7xl mx-auto text-center z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Conversation</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
                        Ready to transform your digital presence? We're here to help you achieve your goals.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info Column */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Team Cards */}
                        {contactPersons.map((person, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                        <FaUser size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-900">{person.name}</h4>
                                        <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">{person.role}</p>
                                    </div>
                                </div>
                                <div className="space-y-3 pl-16">
                                    {person.phone && (
                                        <a href={`tel:+91${person.phone}`} className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                                            <FaPhone className="mr-3 text-gray-400" size={14} />
                                            <span className="text-sm font-medium">+91 {person.phone}</span>
                                        </a>
                                    )}
                                    <a href={`mailto:${person.email}`} className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                                        <FaEnvelope className="mr-3 text-gray-400" size={14} />
                                        <span className="text-sm font-medium break-all">{person.email}</span>
                                    </a>
                                </div>
                            </div>
                        ))}

                        {/* General Info Card */}
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg text-white">
                            <h4 className="font-bold text-xl mb-6 flex items-center">
                                <FaGlobe className="mr-2" /> Connect With Us
                            </h4>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="bg-white/10 p-2 rounded-lg mr-3">
                                        <FaEnvelope className="text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-semibold">General Inquiries</p>
                                        <a href="mailto:graphixpert18@gmail.com" className="text-white hover:text-blue-300 transition-colors">graphixpert18@gmail.com</a>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-white/10 p-2 rounded-lg mr-3">
                                        <FaMapMarkerAlt className="text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase font-semibold">Location</p>
                                        <p className="text-white">Available Worldwide</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Column */}
                    <div className="lg:col-span-2">
                        <Suspense fallback={
                            <div className="bg-white rounded-2xl shadow-xl p-12 flex justify-center items-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                            </div>
                        }>
                            <ContactForm />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}
