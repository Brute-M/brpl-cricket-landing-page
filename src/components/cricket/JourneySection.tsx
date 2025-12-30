import { motion } from 'framer-motion';
import { Video, Globe, Zap, Trophy, ArrowRight } from 'lucide-react';

const steps = [
    {
        icon: <Video className="w-6 h-6 text-[#263574]" />,
        title: 'Record Your Skills',
        description: 'Batting, Bowling, Wicket-keeping. One video. From your ground, street, or terrace.',
        note: '(No fancy equipment needed. Just your raw talent.)',
        color: 'bg-red-500'
    },
    {
        icon: <Globe className="w-6 h-6 text-[#263574]" />,
        title: 'Clear Zone Trials',
        description: 'Show up. Perform. Impress. 100% talent-based selection. No politics. No bias. Just skill.',
        color: 'bg-red-500'
    },
    {
        icon: <Zap className="w-6 h-6 text-[#263574]" />,
        title: 'Get Selected',
        description: 'Join a BRPL team. Play in packed stadiums. Compete for ₹3 Crores.',
        color: 'bg-red-500'
    },
    {
        icon: <Trophy className="w-6 h-6 text-[#263574]" />,
        title: 'Get Discovered',
        description: 'National teams watching. Scouts present. Your career takes off.',
        color: 'bg-red-500'
    }
];

const JourneySection = () => {
    const scrollToForm = () => {
        const element = document.getElementById('registration');
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-6xl font-black italic text-[#263574] leading-tight uppercase tracking-tight">
                        Your Journey to <span className="text-[#FACC15] drop-shadow-sm">Glory</span>
                    </h2>

                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="relative bg-gray-50 border border-gray-100 rounded-3xl p-8 pt-12 shadow-xl hover:shadow-2xl transition-all group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Step Number Badge */}
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#FF5C5C] text-white rounded-full flex items-center justify-center font-black text-3xl shadow-lg border-4 border-white">
                                {index + 1}
                            </div>

                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100">
                                    {step.icon}
                                </div>

                                <h3 className="text-2xl font-black text-[#263574] uppercase tracking-tight">
                                    {step.title}
                                </h3>

                                <p className="text-gray-600 font-medium leading-relaxed">
                                    {step.description}
                                </p>

                                {step.note && (
                                    <p className="text-gray-400 text-sm italic font-bold">
                                        {step.note}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-20 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <button
                        onClick={scrollToForm}
                        className="px-12 py-5 bg-gradient-to-r from-[#FACC15] to-[#f59e0b] text-black font-black text-xl md:text-2xl rounded-2xl shadow-[0_15px_35px_rgba(250,204,21,0.3)] uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-4 mx-auto group"
                    >
                        <span>Start Your Journey - Register Now</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </button>
                </motion.div>
            </div>

            {/* Subtle Patterns */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full -translate-y-1/2 translate-x-1/2 -z-0" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-50 rounded-full translate-y-1/2 -translate-x-1/2 -z-0" />
        </section>
    );
};

export default JourneySection;
