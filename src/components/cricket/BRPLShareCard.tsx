import { Upload, MapPin } from 'lucide-react';

interface BRPLShareCardProps {
  userName: string;
  userRole: string; // Kept for interface compatibility but not used in this specific design
  city: string;
  userImage: string | null;
  onImageUpload?: (imageUrl: string) => void;
}

const BRPLShareCard = ({ userName, city, userImage, onImageUpload }: BRPLShareCardProps) => { // Removed userRole from destructuring as it's unused

  return (
    <div className="w-full flex justify-center">
      <div
        className="relative shadow-2xl overflow-hidden group"
        style={{ width: 400, height: 400 }} // Square aspect ratio as per image
      >
        {/* Background Image */}
        <div className="absolute inset-0 bg-black">
          <img
            src="/stadium_bg.png"
            alt="Stadium Background"
            className="w-full h-full object-cover opacity-90"
          />
          {/* Overlay gradient to darken bottom for text readability if needed */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex flex-col">

          {/* Top Section */}
          <div className="flex justify-between items-start p-4">
            {/* Logo */}
            <div className="w-16">
              <img src="/logo.png" alt="BRPL Logo" className="w-full object-contain drop-shadow-md" />
            </div>

            {/* Officially Registered Badge */}
            <div className="bg-[#0E0E49] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider skew-x-[-10deg] shadow-lg border-l-4 border-[#FACC15]">
              <span className="skew-x-[10deg] block">Officially Registered</span>
            </div>
          </div>

          {/* Top Text */}
          <div className="absolute top-4 left-0 w-full text-center mt-6 z-20">
            <h2 className="text-[#FACC15] text-lg font-bold font-sans tracking-tight leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] uppercase">
              Sapna sirf khelna nahi, <br />
              <span className="text-white">Ab Stadium Me Khelna Hai.</span>
            </h2>
          </div>

          {/* User Image (Middle-Bottom) */}
          <div className="absolute bottom-0 left-0 w-full h-[75%] flex items-end justify-center overflow-hidden pointer-events-none z-0">
            {userImage ? (
              <div className="relative w-full h-full flex items-end justify-center">
                <img
                  src={userImage}
                  alt={userName}
                  className="h-full w-auto object-cover object-bottom"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
              </div>
            ) : (
              // Placeholder if no image
              <div className="h-full w-2/3 bg-gray-600/30 backdrop-blur-sm border-2 border-white/20 rounded-t-3xl flex items-center justify-center pointer-events-auto cursor-pointer group-hover:bg-gray-600/40 transition-colors" onClick={() => document.getElementById('image-upload')?.click()}>
                <div className="flex flex-col items-center text-white/70">
                  <Upload className="w-10 h-10 mb-2" />
                  <span className="text-xs uppercase font-bold">Upload Photo</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Overlays */}
          <div className="relative z-10 mt-auto w-full flex flex-col items-center pb-0">

            {/* Strip: One Step Closer */}
            <div className="w-full bg-gradient-to-r from-transparent via-black/80 to-transparent py-1 backdrop-blur-sm mb-1">
              <h1 className="text-white text-lg font-black italic uppercase text-center tracking-wide leading-none drop-shadow-lg">
                ONE STEP <span className="text-[#FACC15]">CLOSER TO THE STADIUM</span>
              </h1>
            </div>

            {/* User Info Container */}
            <div className="flex flex-col items-center gap-0.5 mb-1 bg-black/40 p-2 rounded-xl backdrop-blur-md border border-white/10 w-[90%]">
              <h3 className="text-white text-lg font-bold uppercase tracking-wide leading-none">{userName}</h3>

              <div className="flex items-center justify-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#FACC15]" />
                <p className="text-gray-200 text-xs font-medium uppercase">
                  {city}
                </p>
              </div>

              <p className="text-[#FACC15] text-[10px] font-bold tracking-wider uppercase mt-1">
                Officially Registered for BRPL Trial 2026
              </p>
            </div>

            {/* Bottom Red Footer Strip - Changed to Blue */}
            <div className="w-full bg-[#0E0E49] py-2 flex justify-center items-center shadow-[0_-4px_10px_rgba(0,0,0,0.5)] z-20 border-t border-[#FACC15]/50 cursor-pointer">
              <a href="https://cricket.brpl.net" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 no-underline hover:opacity-90 transition-opacity">
                {/* Cricket Ball Icon (Simple SVG) */}
                <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-inner">
                  <div className="w-full h-[1px] bg-blue-900 rotate-45 transform"></div>
                  <div className="absolute w-[12px] h-[12px] border border-blue-900 rounded-full"></div>
                </div>
                <p className="text-white text-[10px] font-bold uppercase tracking-wider">
                  Register Now | <span className="underline decoration-white/50 underline-offset-2">cricket.brpl.net</span>
                </p>
              </a>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default BRPLShareCard;
