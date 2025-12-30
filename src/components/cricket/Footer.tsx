import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: 'https://www.instagram.com/brplofficial/', label: 'Instagram' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://x.com/BRPLOfficial', label: 'Twitter' },
    { icon: <Facebook className="w-5 h-5" />, href: 'https://www.facebook.com/people/BRPL-Official/61584782136820/', label: 'Facebook' },
  ];

  return (
    <footer className="py-20 relative overflow-hidden text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://brpl-public-uploads.s3.ap-south-1.amazonaws.com/banner-image.png"
          alt="Cricket Stadium"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-black/20 backdrop-blur-md rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-2xl">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            {/* Brand Section */}
            <div className="md:col-span-2 space-y-8">
              <motion.a
                href="#"
                className="inline-block"
                aria-label="BRPL home"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src="/logo.png"
                  alt="BRPL logo"
                  className="h-24 w-auto object-contain drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]"
                />
              </motion.a>

              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-[#FACC15]">
                  Beyond Reach Premier League
                </h3>
                <p className="text-white leading-relaxed max-w-md font-bold text-lg">
                  BRPL is dedicated to nurturing cricket talent through world-class training, competitive leagues, and professional coaching. Our mission is to elevate the game and empower the next generation of champions.
                </p>
              </div>

              {/* <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white hover:bg-[#FACC15] hover:text-black transition-all duration-300 border border-white/20 group shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div> */}
            </div>

            {/* Navigation Spacer */}
            <div className="hidden md:block"></div>

            {/* Contact Info */}
            <div className="space-y-8">
              <h4 className="text-xl font-black italic uppercase tracking-widest text-[#FACC15] border-b-2 border-[#FACC15]/30 pb-2 inline-block">
                Get In Touch
              </h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 text-white group">
                  <div className="p-2 bg-[#FACC15] rounded-lg shadow-lg">
                    <MapPin className="w-5 h-5 text-black" />
                  </div>
                  <span className="font-bold text-sm md:text-base leading-relaxed">
                    Ground Floor, Suite G-01, Procapitus Business Park, D-247/4A, D Block, Sector 63, Noida, UP 201309
                  </span>
                </li>
                <li className="flex items-center gap-4 text-white group cursor-pointer" onClick={() => window.location.href = 'mailto:info@brpl.net'}>
                  <div className="p-2 bg-[#FACC15] rounded-lg shadow-lg">
                    <Mail className="w-5 h-5 text-black" />
                  </div>
                  <span className="font-black italic lowercase tracking-wider text-sm md:text-base group-hover:text-[#FACC15] transition-colors">info@brpl.net</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-6">
          <p className="text-xs md:text-sm text-white/60 font-medium text-center md:text-left">
            © {new Date().getFullYear()} <span className="text-[#FACC15] text-center">Beyond Reach Premier League</span>. All Players. All Talent. One Final Stage.
          </p>

          {/* <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
              <span className="text-[10px] uppercase font-black italic tracking-widest text-white/40">Network Operational</span>
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
