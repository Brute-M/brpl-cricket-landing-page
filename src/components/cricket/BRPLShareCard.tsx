import { Upload } from 'lucide-react';

interface BRPLShareCardProps {
  userName: string;
  userRole: string;
  userImage: string | null;
  onImageUpload?: (imageUrl: string) => void;
}

const BRPLShareCard = ({ userName, userRole, userImage, onImageUpload }: BRPLShareCardProps) => {
  // Get current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full flex justify-center">
      <div
        className="relative rounded-[24px] overflow-hidden shadow-2xl border-4 border-[#FACC15]"
        style={{ width: 360, height: 420 }} // Adjusted height to match aspect ratio better
      >
        <div className="relative w-full h-full flex flex-col items-center bg-[#050A18]">

          {/* Background Pattern - Vertical Stripes */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'repeating-linear-gradient(90deg, #050A18, #050A18 40px, #0A1226 40px, #0A1226 80px)'
          }}></div>

          {/* Top Right Corner Decoration - dark curve */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#0A1226] rounded-full opacity-50 blur-xl"></div>
          {/* A sharper curve if needed, but the image shows a subtle dark overlay or just the stripe pattern continuing. 
              Actually, top right has a golden/brownish glow or shape. 
              Let's add a subtle glow. 
          */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FACC15]/10 rounded-full blur-xl"></div>


          {/* Content */}
          <div className="relative z-10 flex flex-col items-center w-full h-full pt-8 pb-6 px-4 text-center">

            {/* Header */}
            <h3 className="text-white text-[10px] font-bold tracking-[0.1em] uppercase">
              BEYOND REACH PREMIER LEAGUE
            </h3>
            <p className="text-[#FACC15] text-[10px] font-bold mt-1">
              {currentYear} Season
            </p>
            <p className="text-white/30 text-[9px] tracking-[0.1em] uppercase mt-4 mb-6 font-medium">
              OFFICIAL PLAYER CARD
            </p>

            {/* Main Title */}
            <h1 className="text-[#FACC15] text-[22px] font-black uppercase leading-tight mb-2 tracking-wide font-sans">
              REGISTRATION SUCCESSFUL!
            </h1>
            <p className="text-white text-sm font-normal mb-8">
              Welcome to the BRPL Family
            </p>

            {/* Central Circle Image */}
            <div className="relative mb-auto group cursor-pointer">
              <div className="w-[100px] h-[100px] rounded-full border-2 border-[#FACC15] p-1 bg-[#050A18] flex items-center justify-center overflow-hidden relative mx-auto">
                {/* Inner yellow ring visual tweak if needed, usually just border is enough */}
                <div className="w-full h-full rounded-full overflow-hidden bg-black/40 flex items-center justify-center">
                  {userImage ? (
                    <img
                      src={userImage}
                      alt={userName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-[#FACC15]/80">
                      <Upload className="w-6 h-6 mb-1" />
                      <span className="text-[7px] uppercase font-bold">Upload</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Name Section */}
            <div className="mt-8 mb-2">
              <p className="text-white text-lg">
                Welcome, <span className="font-bold uppercase text-white">{userName}</span>
              </p>
              <p className="text-white/70 text-[11px] mt-1 font-light">
                Your BRPL Journey Begins Now
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BRPLShareCard;
