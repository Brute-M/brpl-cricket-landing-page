import { motion } from 'framer-motion';

const teams = [
    {
        name: "North East Panthers",
        logo: "1.png",
    },
    {
        name: "Central Strikers",
        logo: "2.png",
    },
    {
        name: "Western Heroes",
        logo: "3.png",
    },
    {
        name: "Northern Dabanggs",
        logo: "4.png",
    },
    {
        name: "Southern Lions",
        logo: "5.png",
    },
    {
        name: "Eastern Rhinos",
        logo: "6.png",
    }
];

const TeamsSection = () => {
    return (
        <section className="py-20 bg-[#0e0e49] overflow-hidden">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-black text-center mb-10 md:mb-14 text-white uppercase tracking-tight">
                    Teams <span className="text-[#FACC15]">Playing</span>
                </h2>

                <div className="overflow-x-auto lg:overflow-x-visible scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <div className="flex flex-nowrap justify-start lg:justify-center gap-6 sm:gap-8 lg:gap-10 min-w-max lg:min-w-0 lg:w-full pb-6 px-2">
                        {teams.map((team, index) => (
                            <motion.div
                                key={team.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex flex-col items-center group flex-shrink-0 snap-center"
                            >
                                <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 mb-4 sm:mb-6 rounded-full flex items-center justify-center p-4 border-4 border-white group-hover:border-[#FACC15] transition-all duration-300 transform group-hover:-translate-y-2 bg-white/5 backdrop-blur-sm shadow-xl">
                                    <img
                                        src={team.logo}
                                        alt={team.name}
                                        className="w-full h-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] scale-110"
                                    />
                                </div>
                                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white text-center uppercase tracking-wide drop-shadow-md">
                                    {team.name}
                                </h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamsSection;
