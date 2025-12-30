import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const futureBenefits = [
    {
        title: "National TV Coverage",
        desc: "Your family watches you on prime time"
    },
    {
        title: "Professional Stadium Experience",
        desc: "Lights. Cameras. Roaring crowds. Real cricket."
    },
    {
        title: "Talent Scout Access",
        desc: "National and state team selectors present"
    },
    {
        title: "₹3 Crore Prize Pool",
        desc: "Life-changing money for the winning team"
    },
    {
        title: "Career Launch Platform",
        desc: "Players get spotted for bigger leagues"
    },
    {
        title: "Fair Selection Process",
        desc: "Your skill is your ticket. Nothing else matters."
    },
    {
        title: "Age-Inclusive Categories",
        desc: "Whether you're 15 or 35, you compete"
    },
    {
        title: "Professional Training Exposure",
        desc: "Learn from the best during the tournament"
    }
];

const FutureSection = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://brpl-public-uploads.s3.ap-south-1.amazonaws.com/count-image.png"
                    alt="Cricket Background"
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            <div className="w-full px-4 md:px-10 relative z-10">
                <motion.h2
                    className="text-3xl md:text-5xl lg:text-6xl font-black text-center mb-10 text-[#FACC15] uppercase tracking-tight drop-shadow-2xl"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    This Is More Than Cricket. This Is Your Future.
                </motion.h2>

                {/* Desktop Staggered One-Row Layout */}
                <div className="hidden lg:grid grid-cols-8 gap-2 h-[450px] items-center relative">
                    {futureBenefits.map((benefit, index) => {
                        const isEven = (index + 1) % 2 === 0;
                        return (
                            <div key={index} className="relative flex items-center">
                                <motion.div
                                    className={`bg-white backdrop-blur-xl p-6 rounded-2xl border-l-4 border-[#FACC15] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative transition-all group hover:bg-white/90 w-full min-h-[160px] flex flex-col justify-center
                                    ${isEven ? '-translate-y-24' : 'translate-y-24'}`}
                                    initial={{ opacity: 0, y: isEven ? -120 : 120 }}
                                    whileInView={{ opacity: 1, y: isEven ? -96 : 96 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.08, zIndex: 30 }}
                                >
                                    <div className="flex items-start gap-2 mb-3">
                                        <div className="p-1 bg-[#FACC15] rounded-full mt-1">
                                            <Check className="w-3 h-3 text-black stroke-[4]" />
                                        </div>
                                        <h3 className="text-sm font-black text-blue-900 leading-tight uppercase tracking-widest ">
                                            {benefit.title}
                                        </h3>
                                    </div>
                                    <p className="text-[11px] text-blue-800 font-bold leading-relaxed group-hover:text-blue-950 transition-colors ">
                                        {benefit.desc}
                                    </p>
                                </motion.div>

                                {index < futureBenefits.length - 1 && (
                                    <div className={`absolute -right-16 z-20 hidden xl:flex items-center ${isEven ? '-translate-y-24' : 'translate-y-24'}`}>
                                        <div className="w-20 h-[2px] bg-gradient-to-r from-[#FACC15]/40 to-[#FACC15]"></div>
                                        <ArrowRight className="w-20 h-20 text-[#FACC15] -ml-2 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Mobile/Tablet Grid (Normal flow for readability) */}
                <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-8">
                    {futureBenefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            className="bg-white backdrop-blur-md p-8 rounded-2xl border-l-4 border-[#FACC15] flex flex-col gap-3 shadow-xl"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-1.5 bg-[#FACC15] rounded-full">
                                    <Check className="w-4 h-4 text-black stroke-[4]" />
                                </div>
                                <h3 className="text-xl font-black text-blue-900 uppercase  tracking-wider">
                                    {benefit.title}
                                </h3>
                            </div>
                            <p className="text-blue-800 text-base ml-12  font-medium">
                                {benefit.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Decorative Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-900/5 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
};

export default FutureSection;
