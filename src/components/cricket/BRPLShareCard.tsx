import { Upload } from 'lucide-react';

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
            <div className="bg-[#B91C1C] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider skew-x-[-10deg] shadow-lg border-l-4 border-[#FACC15]">
              <span className="skew-x-[10deg] block">Officially Registered</span>
            </div>
          </div>

          {/* Top Text */}
          <div className="absolute top-4 left-0 w-full text-center mt-6 z-20">
            <h2 className="text-[#FACC15] text-lg font-bold font-sans tracking-tight leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              Maine Register <br />
              <span className="text-white">Kar Liya... Tum Kab Karoge? 👀</span>
            </h2>
          </div>

          {/* User Image (Middle-Bottom) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[75%] flex items-end justify-center overflow-hidden pointer-events-none">
            {userImage ? (
              <img
                src={userImage}
                alt={userName}
                className="h-full w-auto object-cover object-bottom"
                style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
              />
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
          <div className="mt-auto w-full flex flex-col items-center pb-0">

            {/* Strip: Next Match Stadium Me */}
            <div className="w-full bg-gradient-to-r from-transparent via-black/80 to-transparent py-1 backdrop-blur-sm mb-1">
              <h1 className="text-white text-xl font-black italic uppercase text-center tracking-wide leading-none drop-shadow-lg">
                NEXT MATCH <span className="text-[#FACC15]">STADIUM ME. 🔥</span>
              </h1>
            </div>

            {/* City */}
            <div className="flex items-center justify-center gap-1.5 bg-black/60 px-4 py-0.5 rounded-full backdrop-blur-md border border-white/10 mb-1">
              <div className="text-[#FACC15]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-white text-xs font-bold uppercase tracking-wide">
                From: <span className="text-white">{city}</span>
              </p>
            </div>


            {/* Officially registered text */}
            <p className="text-white text-[10px] font-medium tracking-wider uppercase mb-2 drop-shadow-md bg-black/40 px-2 rounded-sm">
              Officially registered for BRPL-2026
            </p>

            {/* Bottom Red Footer Strip */}
            <div className="w-full bg-[#B91C1C] py-1.5 flex justify-center items-center shadow-[0_-4px_10px_rgba(0,0,0,0.5)] z-20 border-t border-[#FACC15]/50">
              <div className="flex items-center gap-2">
                {/* Cricket Ball Icon (Simple SVG) */}
                <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-inner">
                  <div className="w-full h-[1px] bg-red-600 rotate-45 transform"></div>
                  <div className="absolute w-[12px] h-[12px] border border-red-600 rounded-full"></div>
                </div>
                <p className="text-white text-[10px] font-bold uppercase tracking-wider">
                  Register Now | <span className="font-normal opacity-90">cricket.brpl.net</span>
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default BRPLShareCard;
