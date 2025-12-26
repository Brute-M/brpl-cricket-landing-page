import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
// import { useSearchParams } from 'react-router-dom'; ❌ commented
import RegistrationForm from './RegistrationForm';

const HeroSection = () => {
  // const [searchParams] = useSearchParams(); ❌ commented

  // ❌ Referral code state disabled
  // const [referralCode, setReferralCode] = useState<string | null>(null);
  // const [copied, setCopied] = useState(false);

  // ❌ Referral logic disabled
  /*
  useEffect(() => {
    const code =
      searchParams.get('ref') ||
      localStorage.getItem('brpl_ref_code') ||
      'WELCOME2025';
    setReferralCode(code);
  }, [searchParams]);
  */

  // ❌ Copy function disabled
  /*
  const copyToClipboard = () => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  */

  return (
    <section className="relative md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img
          src="/stats.png"
          alt="Cricket Banner"
          className="absolute inset-0 w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-[20s]"
        />
      </div>

      <div className="absolute inset-0 bg-black/30" />

      {/* Animated particles */}
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

      {/* Content */}
      <div className="container relative z-10 px-4 mx-auto pt-24 pb-8 md:py-20">
        <div className="grid lg:grid-cols-2 gap-0 md:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left text-white">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mt-10 md:mt-0 mb-0 md:mb-6 leading-tight text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="block mb-2">BHARAT KI LEAGUE</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                BHARTIYO KA SAPNA
              </span>
            </motion.h1>

            {/* ❌ Referral Code UI fully commented */}
            {/*
            {referralCode && (
              <motion.div>...</motion.div>
            )}
            */}
          </div>

          {/* Right Content */}
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
