'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from 'react-icons/fa';
import { HiSparkles, HiBolt } from 'react-icons/hi2';
import { IoMdRefresh } from 'react-icons/io';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const quickReplies = [
    { icon: '🎨', text: 'Services', query: 'What services do you offer?' },
    { icon: '💰', text: 'Pricing', query: 'How much does it cost?' },
    { icon: '📧', text: 'Contact', query: 'How can I contact you?' },
    { icon: '💼', text: 'Portfolio', query: 'Show me your work' },
];

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "👋 Hi! I'm GraphiXpert AI Assistant. How can I help you today?",
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showQuickReplies, setShowQuickReplies] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const generateBotResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase();

        // Services related
        if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
            return "We offer a wide range of digital services including:\n\n🎨 Web Design & Development\n📱 Mobile App Development\n🎬 Video Editing\n📊 Digital Marketing\n🖌️ Graphic Design\n✨ UI/UX Design\n🎯 Branding & Identity\n📸 Photography & Videography\n\nWhich service interests you the most?";
        }

        // Pricing
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
            return "Our pricing is tailored to your needs! 💎\n\n💻 Basic Website: Starting from ₹82,999\n🚀 Advanced Web App: Starting from ₹2,49,000\n📱 Mobile App: Starting from ₹4,15,000\n🎨 Graphic Design: Starting from ₹15,000\n🎬 Video Editing: Starting from ₹25,000\n\nWant a custom quote? Let's discuss your project!";
        }

        // Contact
        if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
            return "Let's connect! 🤝\n\n📧 Email: info@graphixpert.com\n📱 Phone: +1 (555) 123-4567\n🌐 Website: www.graphixpert.com\n\nOr visit our Contact page to send us a message directly!";
        }

        // Portfolio
        if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('project')) {
            return "We've completed 100+ successful projects! 🎯\n\nOur portfolio includes:\n✅ E-commerce platforms\n✅ SaaS applications\n✅ Mobile apps (iOS & Android)\n✅ Corporate websites\n✅ Custom web solutions\n\nCheck out our Portfolio page to see our latest work!";
        }

        // Web development
        if (lowerMessage.includes('web') || lowerMessage.includes('website')) {
            return "We create stunning, high-performance websites! 🌐\n\n✨ Modern & Responsive Design\n⚡ Lightning-Fast Performance\n📱 Mobile-First Approach\n🔒 Secure & Scalable\n🎨 Custom UI/UX\n♿ Accessibility Compliant\n\nReady to build your dream website?";
        }

        // App development
        if (lowerMessage.includes('app') || lowerMessage.includes('mobile')) {
            return "We develop cutting-edge mobile applications! 📱\n\n⚡ Native iOS & Android\n🔄 Cross-Platform (React Native)\n🎨 Beautiful UI/UX\n🚀 High Performance\n🔔 Push Notifications\n💾 Offline Support\n\nLet's bring your app idea to life!";
        }

        // Timeline
        if (lowerMessage.includes('time') || lowerMessage.includes('how long') || lowerMessage.includes('duration')) {
            return "Project timelines vary based on complexity: ⏱️\n\n📄 Landing Page: 3-5 days\n🌐 Business Website: 1-2 weeks\n💼 E-commerce Site: 3-4 weeks\n🚀 Web Application: 6-12 weeks\n📱 Mobile App: 8-16 weeks\n\nWe'll provide a detailed timeline after understanding your needs!";
        }

        // Technology
        if (lowerMessage.includes('technology') || lowerMessage.includes('tech stack') || lowerMessage.includes('tools')) {
            return "We use cutting-edge technologies! 🚀\n\n⚛️ Frontend: React, Next.js, Vue\n📱 Mobile: React Native, Flutter\n🎨 Styling: Tailwind CSS, Framer Motion\n⚙️ Backend: Node.js, Express, Python\n💾 Database: MongoDB, PostgreSQL, Firebase\n☁️ Cloud: AWS, Vercel, Netlify\n\nAlways staying ahead with the latest tech!";
        }

        // Greeting
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! 👋 Great to meet you!\n\nI'm here to help you learn more about GraphiXpert's services. What would you like to know?";
        }

        // Thanks
        if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            return "You're very welcome! 😊\n\nIs there anything else you'd like to know about our services? I'm here to help!";
        }

        // Default response
        return "That's a great question! 🤔\n\nI'd be happy to help you with that. For detailed information, I recommend:\n\n1. 📧 Contacting our team directly\n2. 📱 Scheduling a free consultation\n3. 🌐 Exploring our website\n\nWhat else can I help you with?";
    };

    const handleSendMessage = async (messageText?: string) => {
        const textToSend = messageText || inputValue;
        if (!textToSend.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: textToSend,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);
        setShowQuickReplies(false);

        // Simulate AI thinking time
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: generateBotResponse(textToSend),
                sender: 'bot',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botResponse]);
            setIsTyping(false);
        }, 1200 + Math.random() * 800);
    };

    const handleQuickReply = (query: string) => {
        handleSendMessage(query);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleReset = () => {
        setMessages([
            {
                id: '1',
                text: "👋 Hi! I'm GraphiXpert AI Assistant. How can I help you today?",
                sender: 'bot',
                timestamp: new Date(),
            },
        ]);
        setShowQuickReplies(true);
    };

    return (
        <>
            {/* Chatbot Toggle Button - Responsive */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 text-white shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center group overflow-hidden"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
                {/* Animated background pulse */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-400 via-blue-400 to-cyan-400 opacity-0 group-hover:opacity-30"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />

                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <FaTimes className="text-xl sm:text-2xl relative z-10" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative z-10"
                        >
                            <FaRobot className="text-xl sm:text-2xl" />
                            <motion.div
                                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chatbot Window - Fully Responsive */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed inset-x-4 bottom-20 sm:bottom-24 sm:right-4 sm:left-auto z-50 
                                   w-auto sm:w-[400px] md:w-[420px] lg:w-[440px]
                                   h-[calc(100vh-120px)] sm:h-[600px] md:h-[650px] lg:h-[680px]
                                   max-h-[calc(100vh-120px)]
                                   rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl"
                        style={{
                            background: 'linear-gradient(to bottom, #ffffff, #faf9ff)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                        }}
                    >
                        {/* Header - Responsive */}
                        <div className="relative overflow-hidden">
                            {/* Animated gradient background */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500"
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                                style={{
                                    backgroundSize: '200% 200%',
                                }}
                            />

                            {/* Overlay pattern */}
                            <div className="absolute inset-0 bg-black/10" />

                            {/* Content */}
                            <div className="relative p-3 sm:p-4 md:p-5 text-white">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <motion.div
                                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg"
                                        whileHover={{ scale: 1.1, rotate: 10 }}
                                    >
                                        <FaRobot className="text-xl sm:text-2xl" />
                                    </motion.div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-base sm:text-lg flex items-center gap-1.5 sm:gap-2">
                                            <span className="truncate">GraphiXpert AI</span>
                                            <motion.div
                                                animate={{ rotate: [0, 10, -10, 0] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                <HiSparkles className="text-yellow-300 text-base sm:text-lg flex-shrink-0" />
                                            </motion.div>
                                        </h3>
                                        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm opacity-90">
                                            <motion.div
                                                className="w-2 h-2 bg-green-300 rounded-full shadow-lg shadow-green-400/50"
                                                animate={{ scale: [1, 1.3, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                            <span>Always Online</span>
                                        </div>
                                    </div>
                                    <motion.button
                                        onClick={handleReset}
                                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors flex-shrink-0"
                                        whileHover={{ scale: 1.1, rotate: 180 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <IoMdRefresh className="text-lg sm:text-xl" />
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        {/* Messages Container - Responsive */}
                        <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4 custom-scrollbar">
                            {messages.map((message, index) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className={`flex gap-2 sm:gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                                        }`}
                                >
                                    {/* Avatar - Responsive */}
                                    <motion.div
                                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${message.sender === 'user'
                                            ? 'bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 shadow-purple-500/50'
                                            : 'bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-600 shadow-blue-500/50'
                                            }`}
                                        whileHover={{ scale: 1.15, rotate: 15 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {message.sender === 'user' ? (
                                            <FaUser className="text-white text-xs sm:text-sm drop-shadow-lg" />
                                        ) : (
                                            <FaRobot className="text-white text-xs sm:text-sm drop-shadow-lg" />
                                        )}
                                    </motion.div>

                                    {/* Message Bubble - Responsive */}
                                    <div className="flex flex-col max-w-[80%] sm:max-w-[75%]">
                                        <motion.div
                                            className={`rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 ${message.sender === 'user'
                                                ? 'bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 text-white rounded-tr-sm shadow-xl shadow-purple-500/40'
                                                : 'bg-white/90 backdrop-blur-sm shadow-xl rounded-tl-sm border border-gray-200/50'
                                                }`}
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <p className="text-xs sm:text-sm whitespace-pre-line leading-relaxed">
                                                {message.text}
                                            </p>
                                        </motion.div>
                                        <span
                                            className={`text-[10px] sm:text-xs mt-1 px-2 font-medium ${message.sender === 'user'
                                                ? 'text-right text-gray-500'
                                                : 'text-left text-gray-500'
                                                }`}
                                        >
                                            {message.timestamp.toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing Indicator - Responsive */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex gap-2 sm:gap-3"
                                >
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                                        <FaRobot className="text-white text-xs sm:text-sm" />
                                    </div>
                                    <div className="bg-white shadow-lg rounded-xl sm:rounded-2xl rounded-tl-sm px-4 py-3 sm:px-5 sm:py-4 border border-gray-100">
                                        <div className="flex gap-1.5">
                                            <motion.div
                                                className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                                                animate={{ y: [0, -8, 0] }}
                                                transition={{
                                                    duration: 0.6,
                                                    repeat: Infinity,
                                                    delay: 0,
                                                }}
                                            />
                                            <motion.div
                                                className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                                                animate={{ y: [0, -8, 0] }}
                                                transition={{
                                                    duration: 0.6,
                                                    repeat: Infinity,
                                                    delay: 0.2,
                                                }}
                                            />
                                            <motion.div
                                                className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                                                animate={{ y: [0, -8, 0] }}
                                                transition={{
                                                    duration: 0.6,
                                                    repeat: Infinity,
                                                    delay: 0.4,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Quick Replies - Responsive */}
                            {showQuickReplies && messages.length === 1 && !isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="space-y-2"
                                >
                                    <p className="text-[10px] sm:text-xs text-gray-600 text-center font-semibold mb-1">
                                        ⚡ Quick replies:
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {quickReplies.map((reply, index) => (
                                            <motion.button
                                                key={index}
                                                onClick={() => handleQuickReply(reply.query)}
                                                className="px-3 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-br from-white to-gray-50 rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-purple-400 hover:from-purple-50 hover:to-blue-50 transition-all duration-300 text-xs sm:text-sm font-semibold text-gray-700 hover:text-purple-700 flex items-center gap-1.5 sm:gap-2 shadow-md hover:shadow-xl active:scale-95 group"
                                                whileHover={{ scale: 1.08, y: -3 }}
                                                whileTap={{ scale: 0.95 }}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.6 + index * 0.1 }}
                                            >
                                                <span className="text-base sm:text-lg group-hover:scale-110 transition-transform">{reply.icon}</span>
                                                <span className="truncate">{reply.text}</span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area - Responsive */}
                        <div className="p-3 sm:p-4 bg-gradient-to-br from-white/95 to-purple-50/30 backdrop-blur-xl border-t border-gray-200/50">
                            <div className="flex gap-2 mb-2">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type your message..."
                                        className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl sm:rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white shadow-md hover:shadow-lg focus:shadow-xl text-sm sm:text-base placeholder:text-gray-400"
                                    />
                                    <motion.div
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                        animate={{
                                            opacity: inputValue ? 1 : 0.3,
                                            scale: inputValue ? [1, 1.2, 1] : 1
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <HiBolt className="text-purple-500 text-base sm:text-lg" />
                                    </motion.div>
                                </div>
                                <motion.button
                                    onClick={() => handleSendMessage()}
                                    disabled={!inputValue.trim()}
                                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 disabled:hover:shadow-xl flex-shrink-0"
                                    whileHover={{ scale: inputValue.trim() ? 1.1 : 1, rotate: inputValue.trim() ? 5 : 0 }}
                                    whileTap={{ scale: inputValue.trim() ? 0.9 : 1 }}
                                >
                                    <FaPaperPlane className="text-base sm:text-lg" />
                                </motion.button>
                            </div>
                            <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs text-gray-500">
                                <span>Powered by</span>
                                <motion.span
                                    className="font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent"
                                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    style={{ backgroundSize: '200% 200%' }}
                                >
                                    GraphiXpert AI
                                </motion.span>
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <HiSparkles className="text-purple-500 text-xs sm:text-sm" />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Custom Scrollbar Styles */}
            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        @media (min-width: 640px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #a855f7, #3b82f6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #9333ea, #2563eb);
        }
      `}</style>
        </>
    );
}
