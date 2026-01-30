import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const teams = [
    {
        name: "North East Panthers",
        logo: "https://brpl-public-uploads.s3.ap-south-1.amazonaws.com/1.png",
    },
    {
        name: "Central Strikers",
        logo: "https://brpl-public-uploads.s3.ap-south-1.amazonaws.com/2.png",
    },
    {
        name: "Western Heroes",
        logo: "https://brpl-public-uploads.s3.ap-south-1.amazonaws.com/3.png",
    },
    {
        name: "Northern Dabanggs",
        logo: "https://brpl-public-uploads.s3.ap-south-1.amazonaws.com/4.png",
    },
    {
        name: "Southern Lions",
        logo: "https://brpl-public-uploads.s3.ap-south-1.amazonaws.com/5.png",
    },
    {
        name: "Eastern Rhinos",
        logo: "https://brpl-public-uploads.s3.ap-south-1.amazonaws.com/6.png",
    }
];

const TeamsSection = () => {
    const [emblaRef] = useEmblaCarousel({
        loop: true,
        align: 'start',
        slidesToScroll: 1
    }, [
        Autoplay({ delay: 3000, stopOnInteraction: false })
    ]);

    return (
        <section className="py-20 bg-[#0e0e49] overflow-hidden">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-black text-center mb-10 md:mb-14 text-white uppercase tracking-tight">
                    Teams <span className="text-[#FACC15]">Playing</span>
                </h2>

                <div className="relative overflow-hidden" ref={emblaRef}>
                    <div className="flex touch-pan-y">
                        {teams.map((team, index) => (
                            <div
                                key={team.name}
                                className="flex-[0_0_50%] sm:flex-[0_0_33.33%] lg:flex-[0_0_16.666%] min-w-0 px-3 sm:px-4"
                            >
                                <motion.div
                                    className="flex flex-col items-center group cursor-grab active:cursor-grabbing"
                                >
                                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 xl:w-44 xl:h-44 mb-4 sm:mb-6 rounded-full flex items-center justify-center p-4 border-4 border-white group-hover:border-[#FACC15] transition-all duration-300 transform group-hover:-translate-y-2 bg-white/5 backdrop-blur-sm shadow-xl">
                                        <img
                                            src={team.logo}
                                            alt={team.name}
                                            className="w-full h-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] scale-110"
                                        />
                                    </div>
                                    <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-white text-center uppercase tracking-wide drop-shadow-md">
                                        {team.name}
                                    </h3>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamsSection;
