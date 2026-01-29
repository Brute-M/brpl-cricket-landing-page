import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

interface RecentUser {
  _id?: string;
  fname?: string;
  lname?: string;
  state?: string;
  zone_id?: string;
  profileImage?: string;
  createdAt?: string;
}

const BASE_URL = import.meta.env.VITE_LANDING_PAGE_BASE_URL || "https://brpl.net/api";
// Ensure BASE_URL ends with /api for API calls, or add it if missing
const API_BASE_URL = BASE_URL.endsWith('/api') ? BASE_URL : BASE_URL + '/api';
// Remove /api suffix if present, then add /uploads
const UPLOADS_BASE = BASE_URL.replace(/\/api\/?$/, "") + "/uploads";

const STATIC_FALLBACK_USERS: RecentUser[] = [
  { fname: "Aman", lname: "Kumar", state: "Delhi" },
  { fname: "Rahul", lname: "Singh", state: "Uttar Pradesh" },
  { fname: "Sanjay", lname: "Verma", state: "Rajasthan" },
  { fname: "Vikas", lname: "Yadav", state: "Haryana" },
  { fname: "Arjun", lname: "Sharma", state: "Punjab" },
];

const RecentRegistrationsSection = () => {
  const [users, setUsers] = useState<RecentUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasFetchError, setHasFetchError] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    dragFree: true,
  });

  const fetchRecentUsers = async () => {
    try {
      setHasFetchError(false);
      const response = await fetch(`${API_BASE_URL}/users?page=1&limit=5`);
      const data = await response.json();

      if (response.ok && Array.isArray(data.items)) {
        setUsers(data.items);
        return;
      }
      setHasFetchError(true);
    } catch (error) {
      console.error("Failed to load recent users", error);
      setHasFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentUsers();
  }, []);

  // Listen for custom event when user uploads image or registers
  useEffect(() => {
    const handleUserUpdate = () => {
      // Wait a bit for backend to process, then refresh
      setTimeout(() => {
        fetchRecentUsers();
      }, 1000);
    };

    // Listen for custom events
    window.addEventListener('brpl:user-image-uploaded', handleUserUpdate);
    window.addEventListener('brpl:user-registered', handleUserUpdate);

    // Also poll every 10 seconds to catch any updates
    const pollInterval = setInterval(() => {
      fetchRecentUsers();
    }, 10000);

    return () => {
      window.removeEventListener('brpl:user-image-uploaded', handleUserUpdate);
      window.removeEventListener('brpl:user-registered', handleUserUpdate);
      clearInterval(pollInterval);
    };
  }, []);

  // Auto-advance every 3s
  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 3000);
    return () => clearInterval(id);
  }, [emblaApi]);

  const displayUsers = users.length > 0 ? users : STATIC_FALLBACK_USERS;
  const isFallback = users.length === 0 && (hasFetchError || !loading);

  return (
    <section className="py-16 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
            Latest <span className="text-[#FACC15]">BRPL Players</span>
          </h2>
          <p className="text-sm md:text-base text-white/70 mt-3 max-w-xl mx-auto">
            These players have just secured their spot in BRPL. Will you be next?
          </p>
          {/* {isFallback && (
            <p className="text-[11px] md:text-xs text-white/50 mt-2">
              Showing sample registrations (live feed will appear automatically).
            </p>
          )} */}
        </motion.div>

        <div className="relative">
          {/* Slider viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {displayUsers.slice(0, 5).map((user, index) => {
                const fullName = `${user.fname || ""} ${user.lname || ""}`.trim() || "New Player";
                // Prioritize state name over zone_id (which might be a number or ID)
                const location = user.state || (user.zone_id ? `Zone ${user.zone_id}` : "Location Not Set");
                const hasImage = !!user.profileImage;

                // Construct profile image URL
                let profileSrc: string | undefined = undefined;
                if (hasImage && user.profileImage) {
                  const imgPath = user.profileImage;
                  if (imgPath.startsWith("http")) {
                    // Full URL (e.g., S3 URL)
                    profileSrc = imgPath;
                  } else if (imgPath.startsWith("/uploads/")) {
                    // Path starting with /uploads/
                    profileSrc = `${BASE_URL.replace(/\/api\/?$/, "")}${imgPath}`;
                  } else if (imgPath.startsWith("uploads/")) {
                    // Path starting with uploads/ (no leading slash)
                    profileSrc = `${BASE_URL.replace(/\/api\/?$/, "")}/${imgPath}`;
                  } else {
                    // Just filename or relative path (e.g., "uploads/profile_123.jpg" or "profile_123.jpg")
                    const filename = imgPath.includes("/") ? imgPath.split("/").pop() : imgPath;
                    profileSrc = `${UPLOADS_BASE}/${filename}`;
                  }
                  // Debug logging (remove in production)
                  console.log(`Profile image for ${fullName}:`, { imgPath, profileSrc });
                }

                return (
                  <div
                    key={user._id || `${fullName}-${index}-${user.createdAt || Date.now()}`}
                    className="pl-4 flex-[0_0_80%] sm:flex-[0_0_48%] lg:flex-[0_0_20%]"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.2) }}
                      className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center shadow-lg backdrop-blur-md"
                    >
                      <div className="relative mb-3">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-[#FACC15] bg-slate-900 flex items-center justify-center">
                          {profileSrc && !failedImages.has(profileSrc) ? (
                            <img
                              src={profileSrc}
                              alt={fullName}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={() => {
                                // Track failed images
                                if (profileSrc) {
                                  console.error('Failed to load profile image:', profileSrc);
                                  setFailedImages(prev => new Set(prev).add(profileSrc));
                                }
                              }}
                            />
                          ) : (
                            <User className="w-8 h-8 text-white/40" />
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm md:text-base font-bold text-white uppercase tracking-tight line-clamp-2">
                          {fullName}
                        </p>
                        <p className="mt-1 text-xs text-[#FACC15] font-semibold uppercase flex items-center justify-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {location}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls (desktop) */}
          <div className="hidden md:flex items-center justify-between pointer-events-none absolute inset-y-0 -left-2 -right-2">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              className="pointer-events-auto h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center backdrop-blur-md"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              className="pointer-events-auto h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center backdrop-blur-md"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentRegistrationsSection;


