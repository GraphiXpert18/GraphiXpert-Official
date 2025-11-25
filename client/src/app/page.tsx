import Link from 'next/link';
import { FaLaptopCode, FaMobileAlt, FaPaintBrush, FaVideo } from 'react-icons/fa';

export default function Home() {
  const services = [
    {
      title: 'Web Design',
      description: 'Stunning, responsive websites tailored to your brand.',
      icon: <FaLaptopCode size={40} className="text-blue-600" />,
    },
    {
      title: 'App Development',
      description: 'Native and cross-platform mobile applications.',
      icon: <FaMobileAlt size={40} className="text-green-600" />,
    },
    {
      title: 'UI/UX Design',
      description: 'User-centric designs that drive engagement.',
      icon: <FaPaintBrush size={40} className="text-purple-600" />,
    },
    {
      title: 'Video Editing',
      description: 'Professional video editing for all your needs.',
      icon: <FaVideo size={40} className="text-red-600" />,
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-blue-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Elevate Your Digital Presence
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          We provide top-tier digital services to help your business grow and succeed in the modern world.
        </p>
        <Link
          href="/contact"
          className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition duration-300"
        >
          Get Started
        </Link>
      </section>

      {/* Services Preview */}
      <section className="w-full max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <Link
                href="/services"
                className="text-blue-600 font-medium hover:underline"
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-block border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-600 hover:text-white transition duration-300"
          >
            View All Services
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Expert Team</h3>
              <p className="text-gray-600">
                Our team consists of highly skilled professionals with years of experience.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Quality Assurance</h3>
              <p className="text-gray-600">
                We are committed to delivering the highest quality work for every project.
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Timely Delivery</h3>
              <p className="text-gray-600">
                We understand the importance of deadlines and always deliver on time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full bg-blue-600 text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
        <p className="text-xl mb-8">
          Contact us today to discuss your requirements and get a free quote.
        </p>
        <Link
          href="/contact"
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition duration-300"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}
