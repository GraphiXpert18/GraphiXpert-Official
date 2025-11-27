'use client';

import { FaUsers, FaLightbulb, FaHandshake } from 'react-icons/fa';

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="bg-blue-900 text-white py-20 px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">About GraphiXpert</h1>
                <p className="text-xl max-w-2xl mx-auto">
                    We are a creative agency dedicated to transforming your ideas into digital reality.
                </p>
            </section>

            {/* Mission & Vision */}
            <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Our mission is to empower businesses, creators, and brands with high-quality digital solutions that combine creativity, innovation, and technology. We aim to deliver designs, websites, and applications that not only look exceptional but also create meaningful user experiences. Through affordable pricing, reliable service, and a commitment to excellence, we strive to help every client grow, stand out, and succeed in today’s digital world.
                        </p>
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Vision</h2>
                        <p className="text-lg text-gray-600">
                            Our vision is to become a trusted and globally recognized creative and digital solutions team known for transforming ideas into powerful visual and digital experiences. We aspire to lead with innovation, inspire through design, and build a future where every brand—big or small—has access to professional, impactful, and user-centric digital products. We aim to shape a digital landscape where creativity and technology work together to create limitless possibilities.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80"
                            alt="Team working"
                            className="rounded-lg shadow-lg w-full h-48 object-cover"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80"
                            alt="Meeting"
                            className="rounded-lg shadow-lg w-full h-48 object-cover mt-8"
                        />
                    </div>
                </div>
            </section>




            {/* Our Services */}
            <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Comprehensive digital solutions tailored to your business needs
                    </p>
                </div>

                <div className="space-y-16">
                    {/* Web Development */}
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Web Development – Fast, Responsive & High-Performance Websites</h3>
                            <p className="text-gray-600 mb-4">
                                Your website is the digital face of your business so it should be powerful, professional, and easy to use. Our web development services deliver fully responsive, secure, and visually appealing websites tailored to your brand’s identity.
                            </p>
                            <p className="text-gray-600">
                                We build websites that load fast, function smoothly, and provide an exceptional user experience across all devices. Whether you need a business website, portfolio, e-commerce store, or landing page, we blend clean coding with creative design to help your brand shine online.
                            </p>
                        </div>
                    </div>

                    {/* App Development */}
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">App Development – Bringing Your Ideas to Life on Mobile</h3>
                            <p className="text-gray-600 mb-4">
                                Our app development services transform your ideas into high-quality mobile applications with modern features, seamless navigation, and a sleek user interface. We develop apps that are reliable, fast, and scalable designed to perform consistently across both Android and iOS devices.
                            </p>
                            <p className="text-gray-600">
                                From planning and UI/UX design to development and final deployment, we ensure your app meets user expectations and supports your business goals. Whether you want a simple utility app or a complex platform, we deliver solutions that combine creativity with strong technical execution.
                            </p>
                        </div>
                    </div>

                    {/* UI/UX Design */}
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">UI/UX Design – Crafting Seamless & Engaging Digital Experiences</h3>
                            <p className="text-gray-600 mb-4">
                                At Graphixpert, our UI/UX design services focus on creating intuitive, user-friendly, and visually appealing digital experiences. We design interfaces that not only look great but also work smoothly ensuring users can navigate your website or app effortlessly.
                            </p>
                            <p className="text-gray-600">
                                From wireframes and prototypes to full interface designs, we prioritize clarity, functionality, and user satisfaction. Whether you’re building a digital product from scratch or improving an existing platform, we ensure every screen is crafted with purpose, consistency, and modern design principles.
                            </p>
                        </div>
                    </div>

                    {/* Graphic Design */}
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Graphic Design Services – Creative, Reliable & Brand-Focused</h3>
                            <p className="text-gray-600 mb-4">
                                At Graphixpert, we transform ideas into visually compelling designs that speak for your brand. Whether you're a startup, small business, or established company, we craft clean, modern, and impactful visuals tailored to your identity. From social media posts and business cards to flyers, billboards, and magazine covers every design is thoughtfully created to enhance your brand presence and engage your audience.
                            </p>
                            <p className="text-gray-600">
                                We focus on delivering high quality custom designs that communicate clearly, look stunning, and help you stand out in today’s competitive digital world. With creativity, precision, and fast turnaround, we ensure your brand looks professional across every platform.
                            </p>
                        </div>
                    </div>

                    {/* Multimedia Services */}
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Multimedia Services – High-Quality Edits That Bring Your Ideas to Life</h3>
                            <p className="text-gray-600 mb-4">
                                Our multimedia services are designed to help you tell your story in the most engaging way possible. We offer expert video editing, ads creation, and photo enhancement to give your content a polished, professional finish. Whether it's for marketing campaigns, social media promotions, events, or personal projects, we handle every detail from color grading and transitions to clean cuts and impactful visuals.
                            </p>
                            <p className="text-gray-600">
                                At Graphixpert, we combine creativity with technical skill to deliver content that captures attention, communicates your message clearly, and elevates your brand's digital presence. Fast delivery, affordable pricing, and premium quality results every time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="bg-gray-50 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <FaUsers className="text-blue-600 mx-auto mb-4" size={40} />
                            <h3 className="text-xl font-bold mb-2">Collaboration</h3>
                            <p className="text-gray-600">
                                We believe in the power of teamwork and working closely with our clients to achieve shared goals.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <FaLightbulb className="text-yellow-500 mx-auto mb-4" size={40} />
                            <h3 className="text-xl font-bold mb-2">Innovation</h3>
                            <p className="text-gray-600">
                                We constantly explore new technologies and creative ideas to deliver cutting-edge solutions.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <FaHandshake className="text-green-600 mx-auto mb-4" size={40} />
                            <h3 className="text-xl font-bold mb-2">Integrity</h3>
                            <p className="text-gray-600">
                                We conduct our business with honesty, transparency, and a strong ethical foundation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
