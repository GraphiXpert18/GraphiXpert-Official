import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SiFiverr } from 'react-icons/si';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">GraphiXpert</h3>
                        <p className="text-gray-400">
                            Providing top-notch digital services to help your business grow.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Services</h4>
                        <ul className="space-y-2">
                            <li><Link href="/services" className="text-gray-400 hover:text-white">Web Design</Link></li>
                            <li><Link href="/services" className="text-gray-400 hover:text-white">App Development</Link></li>
                            <li><Link href="/services" className="text-gray-400 hover:text-white">UI/UX Design</Link></li>
                            <li><Link href="/services" className="text-gray-400 hover:text-white">Graphic Design</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                            <li><Link href="/portfolio" className="text-gray-400 hover:text-white">Portfolio</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                            <li><Link href="/login" className="text-gray-400 hover:text-white">Login</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            <a href="https://fiverr.com/s/vvgB0wL" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><SiFiverr size={24} /></a>
                            <a href="mailto:graphixpert18@gmail.com" className="text-gray-400 hover:text-white"><FaEnvelope size={24} /></a>
                            <a href="https://www.instagram.com/graphixpert18?igsh=OGdwcDNmNmE2MW9u" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FaInstagram size={24} /></a>
                            <a href="https://www.facebook.com/share/17Y637Ud42/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FaFacebook size={24} /></a>
                            <a href="http://www.linkedin.com/in/graphixpert-xpert-b79049398" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FaLinkedin size={24} /></a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} GraphiXpert. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
