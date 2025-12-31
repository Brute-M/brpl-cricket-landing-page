import { motion } from 'framer-motion';
import { ChevronDown, Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';

const HeroSection = () => {
  const [searchParams] = useSearchParams();
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  // const BASE_URL = "http://localhost:5000/api";
  const BASE_URL = "https://brpl.net/api";

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
    <section className="relative md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src="https://brpl-public-uploads.s3.ap-south-1.amazonaws.com/banner-image.png"
          alt="Cricket Banner"
          className="absolute inset-0 w-full h-full object-cover object-top"
          fetchPriority="high"
        />
      </div>

      {/* Animated particles - Commented out for cleaner view
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      */}



      {/* Content */}
      <div className="container relative z-10 px-4 mx-auto pt-40 pb-8 md:py-20 mt-4 md:mt-20">
        <div className="grid lg:grid-cols-2 gap-0 md:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left text-white">


            <div className="text-center lg:text-left select-none">
              {/* Top Group */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 md:mb-12"
              >
                <h2 className="text-2xl md:text-5xl lg:text-6xl font-black italic text-white leading-none tracking-tight drop-shadow-lg uppercase">
                  INDIA'S BIGGEST
                </h2>
                <h1 className="text-5xl md:text-8xl lg:text-9xl font-black italic text-[#FACC15] leading-none md:leading-[0.8] mt-2 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] uppercase">
                  T10 TENNIS
                </h1>
                <h2 className="text-2xl md:text-5xl lg:text-6xl font-black italic text-[#FACC15] leading-none mt-2 drop-shadow-lg uppercase">
                  CRICKET TOURNAMENT
                </h2>
              </motion.div>

              {/* Bottom Group */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 space-y-3"
              >
                <p className="text-lg md:text-3xl lg:text-4xl font-black leading-none drop-shadow-md">
                  <span className="text-white">Your Gully Cricket Days </span>
                  <span className="text-[#FACC15] uppercase">ARE OVER</span>
                </p>
                <p className="text-base md:text-2xl lg:text-3xl font-bold text-white/90 drop-shadow-sm uppercase">
                  Now Play in Real Stadiums
                </p>

                <motion.button
                  onClick={scrollToForm}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-10 py-4 bg-gradient-to-r from-[#FACC15] to-[#f59e0b] text-black font-black text-xl md:text-2xl rounded-lg shadow-[0_10px_30px_rgba(250,204,21,0.4)] uppercase tracking-wider transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Register Now</span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </motion.button>
              </motion.div>
            </div>

            {couponCode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8 mb-8 md:mb-0 inline-flex flex-col items-center lg:items-start w-full lg:w-auto"
              >
                <p className="text-[#FACC15] text-xs md:text-sm mb-2 md:mb-3 font-black tracking-[0.2em] uppercase drop-shadow-sm">
                  ★ Your Exclusive Coupon Code ★
                </p>
                <div className="flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-xl border-2 border-[#FACC15] p-1.5 md:p-2 pr-3 md:pr-4 rounded-xl shadow-[0_0_25px_rgba(250,204,21,0.3)] group transition-all hover:bg-white/15 hover:shadow-[0_0_40px_rgba(250,204,21,0.5)]">
                  <button
                    onClick={copyToClipboard}
                    className="bg-[#FACC15] text-black px-3 py-1.5 md:px-6 md:py-2.5 rounded-lg font-mono font-black italic tracking-widest text-lg md:text-2xl shadow-inner cursor-pointer hover:bg-yellow-400 transition-colors"
                  >
                    {couponCode}
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
                    title="Copy Code"
                  >
                    {copied ? <Check className="w-8 h-8 text-green-400" /> : <Copy className="w-8 h-8 text-white/90 group-hover:text-[#FACC15]" />}
                  </button>
                </div>
                <p className="text-white/80 text-[10px] md:text-xs mt-3 font-bold uppercase tracking-tight">
                  Applied at registration Step 3
                </p>
              </motion.div>
            )}


            {/* {referralCode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8 mb-8 md:mb-0 inline-flex flex-col items-center lg:items-start"
              >
                <p className="text-gray-300 text-sm mb-2 font-medium tracking-wide uppercase">
                  Your Exclusive Referral Code
                </p>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 p-2 pr-4 rounded-xl shadow-2xl group transition-all hover:bg-white/15">
                  <button
                    onClick={copyToClipboard}
                    className="bg-[#263574] text-white px-4 py-2 rounded-lg font-mono font-bold tracking-wider text-xl shadow-inner cursor-pointer hover:bg-[#1f2d5f] transition-colors"
                  >
                    {referralCode}
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
                    title="Copy Code"
                  >
                    {copied ? <Check className="w-6 h-6 text-green-400" /> : <Copy className="w-6 h-6 text-white/80 group-hover:text-white" />}
                  </button>
                </div>
                <p className="text-white/60 text-xs mt-2 max-w-[300px]">
                  Use this code during registration (Step 3) to unlock special benefits.
                </p>
              </motion.div>
            )} */}
          </div>



          {/* Right Content - Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full max-w-2xl mx-auto lg:ml-auto"
          >
            <RegistrationForm isEmbedded={true} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-primary/60" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
