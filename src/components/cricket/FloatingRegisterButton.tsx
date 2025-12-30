import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Zap, MessageCircle } from 'lucide-react';

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

    const openWhatsApp = () => {
        window.open('https://wa.me/919821563585', '_blank');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    <div className="fixed bottom-32 right-8 z-[100] flex flex-col gap-4">
                        {/* WhatsApp Button */}
                        <motion.div
                            initial={{ opacity: 0, x: 100, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 100, scale: 0.8 }}
                            transition={{ delay: 0.1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <button
                                onClick={openWhatsApp}
                                className="group relative flex items-center justify-center bg-[#25D366] hover:bg-[#20BA5A] text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] transition-all duration-300"
                                aria-label="Contact us on WhatsApp"
                            >
                                {/* WhatsApp Icon SVG */}
                                <svg
                                    className="w-7 h-7 md:w-8 md:h-8"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>

                                {/* Pulsing Ring */}
                                <div className="absolute -inset-1 bg-[#25D366]/30 rounded-full animate-ping" />
                            </button>
                        </motion.div>
                    </div>
                    <div className="fixed bottom-8 right-4 z-[100] flex flex-col gap-4">
                        {/* Register Button */}
                        <motion.div
                            initial={{ opacity: 0, x: 100, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 100, scale: 0.8 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
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

                                <span className="font-black uppercase tracking-tighter text-lg md:text-xl">
                                    Register Now
                                </span>

                                {/* Pulsing Outer Ring */}
                                <div className="absolute -inset-1 bg-[#FACC15]/20 rounded-2xl animate-ping -z-10" />
                            </button>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default FloatingRegisterButton;