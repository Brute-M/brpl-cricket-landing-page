import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const MissionSection = () => {
    return (
        <section className="py-20 bg-white relative overflow-hidden border-y border-gray-200">
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

                    {/* Left Side - Video Section */}
                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group border-2 border-gray-200">
                            {/* This would be the video element, using an image as placeholder for now */}
                            <img
                                src="/banner-2.png"
                                alt="Tournament Promo"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75 group-hover:brightness-90"
                            />

                            {/* Play Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    initial={{ opacity: 0.8 }}
                                    whileHover={{ scale: 1.1, opacity: 1 }}
                                    className="w-24 h-24 bg-[#FACC15] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(250,204,21,0.6)] cursor-pointer"
                                >
                                    <Play className="w-12 h-12 text-black fill-current translate-x-1" />
                                </motion.div>
                            </div>

                            {/* Video Bottom Info */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 flex items-center justify-between">
                                    <span className="text-white font-black italic uppercase tracking-wider text-sm md:text-base">
                                        Official Pro Reel 2024
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                                        <span className="text-white/80 text-xs font-bold uppercase tracking-tighter">Live Demo</span>
                                    </div>
                                </div>
                            </div>

                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                        </div>
                    </motion.div>

                    {/* Right Side - Impact Content */}
                    <motion.div
                        className="w-full lg:w-1/2 text-left space-y-8"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black italic text-[#FACC15] leading-tight uppercase">
                                Where unknown talent becomes unstoppable.
                            </h2>

                            <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                                One performance that <span className="text-[#FACC15]">changes everything</span>. Your skills finally get the stage they deserve.
                            </p>
                        </div>

                        <div className="pt-6 relative">
                            {/* Decoration Line */}
                            <div className="absolute top-0 left-0 w-24 h-1 bg-gradient-to-r from-[#FACC15] to-transparent" />

                            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black italic text-gray-900 leading-tight uppercase">
                                This is your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FACC15] to-orange-500">audition</span> for greatness.
                            </h3>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Dynamic Background Glows */}
            <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#FACC15]/5 blur-[150px] rounded-full -z-10" />
            <div className="absolute bottom-0 -left-24 w-80 h-80 bg-blue-600/5 blur-[150px] rounded-full -z-10" />
        </section>
    );
};

export default MissionSection;