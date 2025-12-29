import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

const FloatingRegisterButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToRegistration = () => {
        const element = document.getElementById('registration');
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 100, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 100, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="fixed bottom-8 right-4 md:right-8 z-[100]"
                >
                    <button
                        onClick={scrollToRegistration}
                        className="group relative flex items-center gap-3 bg-gradient-to-r from-[#FACC15] to-[#f59e0b] text-black px-6 py-4 rounded-2xl shadow-[0_10px_30px_rgba(250,204,21,0.4)] hover:shadow-[0_15px_40px_rgba(250,204,21,0.6)] transition-all duration-300 overflow-hidden"
                    >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                        <div className="bg-black/10 p-2 rounded-lg group-hover:bg-black/20 transition-colors">
                            <Zap className="w-5 h-5 fill-current" />
                        </div>

                        <span className="font-black italic uppercase tracking-tighter text-lg md:text-xl">
                            Register Now
                        </span>

                        {/* Pulsing Outer Ring */}
                        <div className="absolute -inset-1 bg-[#FACC15]/20 rounded-2xl animate-ping -z-10" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FloatingRegisterButton;
