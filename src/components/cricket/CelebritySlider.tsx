import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

interface Celebrity {
  name: string;
  quote: string;
  image: string;
  role?: string;
}

const celebrities: Celebrity[] = [
  {
    name: "Robin Uthapa",
    quote: "Close this page and your cricket dream dies today",
    image: "/robin.png",
    // role: "Former Indian Captain"
  },
  {
    name: "Manoj Tiwary",
    quote: "Register now - or watch less talented players live the life you wanted.",
    image: "/manoj-1.png",
    // role: "Indian Cricketer"
  },
  {
    name: "Akash chopra",
    quote: "Register now—or watch less talented players live the life you wanted.",
    image: "https://media.crictracker.com/media/attachments/1718800437823_Untitled-3.jpeg",
    // role: "Cricket Legend"
  },
  {
    name: "Pawan singh",
    quote: "जब घूमेगा बल्ला, मचेगा बवाल, BRPL में देखऽ India के कमाल!",
    image: "https://patnapress.com/wp-content/uploads/2025/10/Pawan-Singhs-.jpg",
    // role: "Indian Captain"
  },
    {
    name: "Manoj tiwari ",
    quote: "सोचते रहोगे तो कोई और जीत जाएगा. अभी REGISTER करो.",
    image: "/manoj-2.png",
    // role: "Indian Captain"
  },
];

const CelebritySlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    // Auto-advance every 5 seconds
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => {
      emblaApi.off('select', onSelect);
      clearInterval(interval);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Slider Container */}
      <div className="flex-1 relative overflow-hidden bg-transparent" ref={emblaRef}>
        <div className="flex h-full">
          {celebrities.map((celebrity, index) => (
            <div key={celebrity.name} className="flex-[0_0_100%] min-w-0 relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="h-full"
              >
                <img
                  src={celebrity.image}
                  alt={celebrity.name}
                  className="w-full h-full object-contain bg-transparent"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(celebrity.name)}&size=400&background=FACC15&color=263574&bold=true`;
                  }}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all hover:scale-110"
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all hover:scale-110"
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {celebrities.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedIndex
                ? 'bg-[#FACC15] w-8'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CelebritySlider;

