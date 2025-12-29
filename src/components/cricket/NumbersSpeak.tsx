import { motion } from 'framer-motion';
import { Trophy, Map, Video, Users, Zap, Target } from 'lucide-react';

const stats = [
    {
        icon: <Trophy className="w-8 h-8 text-yellow-500" />,
        value: '₹3 Cr',
        label: 'Total Prize Pool',
        color: 'text-[#FACC15]'
    },
    {
        icon: <Map className="w-8 h-8 text-blue-400" />,
        value: '28+8',
        label: 'States + UTs',
        color: 'text-[#FACC15]'
    },
    {
        icon: <Video className="w-8 h-8 text-purple-400" />,
        value: '100%',
        label: 'Remote Audition',
        color: 'text-[#FACC15]'
    },
    {
        icon: <Users className="w-8 h-8 text-indigo-400" />,
        value: 'All Ages',
        label: 'U-16, U-19, U-24, U-40',
        color: 'text-[#FACC15]'
    },
    {
        icon: <Zap className="w-8 h-8 text-orange-400" />,
        value: '1,000+',
        label: 'Players Registered',
        color: 'text-[#FACC15]'
    },
    {
        icon: <Target className="w-8 h-8 text-pink-400" />,
        value: '0 Bias',
        label: 'Pure Skill Selection',
        color: 'text-[#FACC15]'
    }
];

const NumbersSpeak = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/count-image.png"
                    alt="Cricket Stadium Stats"
                    className="w-full h-full object-cover"
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10">
                <motion.h2
                    className="text-3xl md:text-5xl font-black text-center mb-16 text-[#FACC15] uppercase tracking-wider"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    The Numbers Speak
                </motion.h2>

                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="bg-white backdrop-blur-sm p-6 rounded-2xl flex flex-col items-center text-center border border-white/10 hover:border-white/20 transition-all group shadow-xl"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                        >
                            <div className="mb-6 transform group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>
                            <div className={`text-2xl md:text-3xl font-black italic mb-2 ${stat.color} drop-shadow-sm brightness-75`}>
                                {stat.value}
                            </div>
                            <div className="text-blue-900 font-bold uppercase tracking-tight text-[10px] md:text-xs">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NumbersSpeak;