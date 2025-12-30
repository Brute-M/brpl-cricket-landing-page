import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Users, Zap, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const UrgencySection = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        // Target date set to January 11, 2026 00:00 AM IST (End of Jan 10)
        const targetDate = new Date('2026-01-11T00:00:00+05:30');

        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    const scrollToForm = () => {
        const element = document.getElementById('registration');
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background with Cinematic Image & Dark Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/count-image.png"
                    alt="Cricket Stadium"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Title with Warning Icon */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-3 mb-10"
                    >
                        <AlertTriangle className="w-8 h-8 md:w-12 md:h-12 text-[#FACC15] animate-pulse" />
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight drop-shadow-xl">
                            Your Zone Is <span className="text-[#FACC15]">Filling Up Fast</span>
                        </h2>
                    </motion.div>

                    {/* High-Impact Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-4">
                        <motion.div
                            className="flex flex-col items-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <span className="text-5xl md:text-7xl font-black text-white mb-2 drop-shadow-md">78%</span>
                            <span className="text-[#FACC15] font-bold uppercase tracking-widest text-sm md:text-base">Seats Filled</span>
                        </motion.div>

                        <motion.div
                            className="flex flex-col items-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="text-5xl md:text-7xl font-black text-white mb-2 drop-shadow-md tabular-nums">
                                {String(timeLeft.days).padStart(2, '0')}:{String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                            </span>
                            <span className="text-[#FACC15] font-bold uppercase tracking-widest text-sm md:text-base">Time Remaining</span>
                        </motion.div>

                        <motion.div
                            className="flex flex-col items-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <span className="text-5xl md:text-7xl font-black text-white mb-2 drop-shadow-md">89</span>
                            <span className="text-[#FACC15] font-bold uppercase tracking-widest text-sm md:text-base">Spots Remaining</span>
                        </motion.div>
                    </div>

                    {/* Taglines */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="space-y-4 mb-16"
                    >
                        <p className="text-xl md:text-2xl font-bold italic text-white/90 uppercase tracking-wide">
                            Players who wait, <span className="text-[#FACC15]">miss out.</span>
                        </p>
                        <p className="text-xl md:text-2xl font-black italic text-white uppercase tracking-widest">
                            Players who act, <span className="underline decoration-[#FACC15] underline-offset-8">make history.</span>
                        </p>
                    </motion.div>

                    {/* Final CTA Button */}
                    <motion.button
                        onClick={scrollToForm}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        viewport={{ once: true }}
                        className="group bg-white text-[#263574] px-8 md:px-16 py-5 rounded-full font-black text-xl md:text-3xl uppercase tracking-tighter shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-4 mx-auto transition-all hover:bg-[#FACC15] hover:text-black"
                    >
                        <span>CLAIM YOUR SPOT NOW - ₹1,499</span>
                        <ArrowRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform" />
                    </motion.button>
                </div>
            </div>

            {/* Decorative Shimmer/Glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FACC15]/50 to-transparent animate-shimmer"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FACC15]/50 to-transparent animate-shimmer"></div>
        </section>
    );
};

export default UrgencySection;
