import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Clock } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href.replace('#', '#'));
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Top Registration Ticker */}
      <div className="fixed top-0 left-0 right-0 z-50 h-9 bg-gradient-to-r from-[#FACC15] to-[#f59e0b] text-black overflow-hidden flex items-center">
        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 30s linear infinite;
            }
          `}
        </style>
        <div className="flex w-max animate-marquee">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-4">
              <div className="flex items-center gap-2">
                <span className="font-black uppercase text-sm tracking-wider whitespace-nowrap">
                  Registration Closing Soon - Limited Slots Available
                </span>
              </div>
              <span className="text-xs md:text-sm font-bold">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        className={`fixed top-9 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'glass py-2' : 'py-4'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Container Fluid - Full Width */}
        <div className="w-full px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              type="button"
              onClick={() => scrollToSection('#')}
              className="flex items-center gap-3"
              aria-label="BRPL home"
            >
              <img
                src="/logo.png"
                alt="BRPL logo"
                className="h-14 md:h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]"
              />
            </button>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => scrollToSection('#registration')}
                className="px-6 py-2 bg-gradient-to-r from-[#FACC15] to-[#f59e0b] text-black font-black rounded-lg shadow-[0_4px_15px_rgba(250,204,21,0.4)] uppercase tracking-wider transition-all duration-300 relative overflow-hidden group border-none"
              >
                <span className="relative z-10">Register Now</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-30 glass pt-32 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-full px-4">
              <div className="flex flex-col gap-6">
                <motion.button
                  onClick={() => scrollToSection('#registration')}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-[#FACC15] to-[#f59e0b] text-black font-black rounded-lg shadow-[0_4px_15px_rgba(250,204,21,0.3)] uppercase tracking-wider relative overflow-hidden group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="relative z-10">Register Now</span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;