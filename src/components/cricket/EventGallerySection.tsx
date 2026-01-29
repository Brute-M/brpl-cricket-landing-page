import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

const images = [
  { src: 'collarge1.png' },
  { src: 'collarge2.png' },
];

const EventGallerySection = () => {
  const [index, setIndex] = useState(-1);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
  });

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    emblaApi.on("pointerDown", () => clearInterval(autoplay));
    emblaApi.on("settle", () => {
      // Optional: Restart autoplay logic if desired, or keep it stopped after interaction
    });

    return () => clearInterval(autoplay);
  }, [emblaApi]);

  return (
    <section className="py-8 relative overflow-hidden bg-white">
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-wider">
            Event Gallery
          </h2>
        </motion.div>

        {/* Auto-sliding Collage Carousel */}
        <div className="max-w-6xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {images.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 pl-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div
                    className="relative group aspect-video overflow-hidden rounded-xl cursor-pointer"
                    onClick={() => setIndex(index)}
                  >
                    <img
                      src={item.src}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      alt={`Event ${index + 1}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={images.map(img => ({ src: img.src }))}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
        }}
      />
    </section>
  );
};

export default EventGallerySection;
