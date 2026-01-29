import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Copy, Check } from 'lucide-react';
import { useState, useEffect, lazy, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import CelebritySlider from './CelebritySlider';

// Lazy load the form to reduce initial bundle size for mobile LCP
const RegistrationForm = lazy(() => import('./RegistrationForm'));

const backgroundImages = [
  "banner-image1.png",
  "akash-banner.png",
  "manoj-banner1.png",
  "manoj-banner2.png",
  "pawan-image.png"
];

const HeroSection = () => {
  const [searchParams] = useSearchParams();
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const BASE_URL = "http://localhost:5000/api";
  const BASE_URL = import.meta.env.VITE_LANDING_PAGE_BASE_URL || "https://brpl.net/api";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Force show with fallback as requested "show this hardly"
    const code = searchParams.get('ref') || localStorage.getItem('brpl_ref_code') || 'WELCOME2025';
    setReferralCode(code);
  }, [searchParams]);

  useEffect(() => {
    const fetchActiveCoupon = async () => {
      try {
        const response = await fetch(`${BASE_URL}/coupons/active`);
        const data = await response.json().catch(() => null);
        if (response.ok && data?.data?.code) {
          setCouponCode(String(data.data.code));
          return;
        }
      } catch {
        // ignore
      }
    };

    fetchActiveCoupon();
  }, []);

  const copyToClipboard = () => {
    if (couponCode) {
      navigator.clipboard.writeText(couponCode);
      localStorage.setItem('brpl_coupon_code', couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToForm = () => {
    document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col md:flex md:items-center md:justify-center overflow-x-hidden bg-[#0e0e49] pt-[120px] md:pt-0">
      {/* Background Image Slider */}
      <div className="relative w-full h-[50vh] md:absolute md:inset-0 md:h-full overflow-hidden bg-[#0e0e49] shrink-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentImageIndex}
            src={backgroundImages[currentImageIndex]}
            alt="Cricket Banner"
            className="absolute inset-0 w-full h-full object-cover object-top"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            fetchPriority="high"
          />
        </AnimatePresence>
        {/* Dark overlay for better text readability - Desktop only or adjusting opacity */}
        {/* <div className="absolute inset-0 bg-black/5 md:bg-black/20" /> */}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full container mx-auto px-4 pt-8 md:py-12">
        {/* Title and Subtitle at Top (Centered) */}
        <div className="text-center text-white mt-12 md:mt-24 mb-8 sm:mb-10 select-none w-full">
          <div className="mb-4 animate-in fade-in slide-in-from-top-4 duration-700">
            <motion.div
              initial={{ boxShadow: '0 0 0px rgba(250, 204, 21, 0.0)', borderColor: 'rgba(250, 204, 21, 0.45)' }}
              animate={{
                boxShadow: [
                  '0 0 0px rgba(250, 204, 21, 0.0)',
                  '0 0 18px rgba(250, 204, 21, 0.55)',
                  '0 0 0px rgba(250, 204, 21, 0.0)',
                ],
                borderColor: [
                  'rgba(250, 204, 21, 0.35)',
                  'rgba(250, 204, 21, 0.9)',
                  'rgba(250, 204, 21, 0.35)',
                ],
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full max-w-xl md:max-w-7xl mx-auto rounded-2xl bg-black/35 backdrop-blur-md px-2 py-2 md:px-6 md:py-4 border"
            >
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-x-2 md:gap-x-2 gap-y-2 w-full px-2">
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-x-2 gap-y-1 sm:gap-y-0">
                  <h2 className="text-xs sm:text-sm md:text-xl lg:text-2xl font-black italic text-white leading-none tracking-tight drop-shadow-lg uppercase whitespace-nowrap">
                    INDIA'S BIGGEST
                  </h2>
                  <h1 className="text-base sm:text-lg md:text-3xl lg:text-5xl font-black italic text-[#FACC15] leading-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] uppercase whitespace-nowrap">
                    T10 TENNIS BALL
                  </h1>
                  <h2 className="text-xs sm:text-sm md:text-xl lg:text-2xl font-black italic text-[#FACC15] leading-none drop-shadow-lg uppercase whitespace-nowrap">
                    CRICKET TOURNAMENT
                  </h2>
                </div>

                {/* Separator for desktop */}
                <div className="hidden md:block h-8 w-0.5 bg-white/30 mx-1"></div>

                <div className="w-full md:w-auto text-[10px] md:text-sm lg:text-lg font-black leading-snug drop-shadow-md md:whitespace-nowrap flex flex-wrap justify-center md:justify-start items-center gap-x-1.5 gap-y-0.5 mt-1 md:mt-0">
                  <span className="text-white">Your Gully Cricket Days </span>
                  <span className="text-[#FACC15] uppercase">ARE OVER</span>
                  <span className="text-white hidden md:inline">-</span>
                  <span className="text-white mt-0.5 md:mt-0">Now Play in Real Stadiums</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5 md:gap-10 lg:gap-12 items-start md:items-center">
          {/* Left Content - Celebrity Slider (Hidden/Placeholder) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block order-2 lg:order-1 w-full max-w-xs sm:max-w-sm md:max-w-lg mx-auto lg:mx-0 h-[250px] sm:h-[300px] md:h-[420px] lg:h-[520px]"
          >
            {/* <CelebritySlider /> */}
          </motion.div>

          {/* Right Content - Title/Subtitle + Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="order-1 lg:order-2 w-full max-w-2xl mx-auto lg:ml-auto"
          >

            {/* Coupon Code (if available) */}
            {couponCode && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-4 inline-flex flex-col items-center lg:items-start w-full lg:w-auto"
              >
                <p className="text-[#FACC15] text-xs md:text-sm mb-2 font-black tracking-[0.2em] uppercase drop-shadow-sm">
                  ★ Your Exclusive Coupon Code ★
                </p>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border-2 border-[#FACC15] p-1.5 pr-3 rounded-xl shadow-[0_0_25px_rgba(250,204,21,0.3)] group transition-all hover:bg-white/15">
                  <button
                    onClick={copyToClipboard}
                    className="bg-[#FACC15] text-black px-3 py-1.5 rounded-lg font-mono font-black italic tracking-widest text-sm md:text-lg shadow-inner cursor-pointer hover:bg-yellow-400 transition-colors"
                  >
                    {couponCode}
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                    title="Copy Code"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-white/90 group-hover:text-[#FACC15]" />}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Registration Form */}
            <Suspense fallback={<div className="h-[600px] w-full bg-white/10 backdrop-blur-md rounded-2xl animate-pulse" />}>
              <RegistrationForm isEmbedded={true} />
            </Suspense>
          </motion.div>
        </div>
      </div>


      {/* Scroll indicator - Hidden on mobile if needed, or adjusted */}
      <motion.div
        className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-primary/60" />
      </motion.div>
    </section >
  );
};

export default HeroSection;
