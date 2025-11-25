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
                            To provide innovative and high-quality digital services that empower businesses to thrive in the digital age. We strive to exceed client expectations through creativity, technology, and dedication.
                        </p>
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Vision</h2>
                        <p className="text-lg text-gray-600">
                            To be a leading global provider of digital solutions, known for our excellence, integrity, and customer-centric approach.
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
