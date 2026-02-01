import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Upload, Download, Share2, Loader2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { useToast } from '@/hooks/use-toast';
import BRPLShareCard from '@/components/cricket/BRPLShareCard';
import { RECENT_RAZORPAY_RESPONSE_KEY } from '@/lib/constants';

const ThankYou = () => {
    const { state } = useLocation();
    const { toast } = useToast();
    const [userImage, setUserImage] = useState<string | null>(state?.userImage || null);
    const [isUploading, setIsUploading] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const name = state?.name || "Player";
    const role = state?.role || "Cricketer";
    // const BASE_URL = "http://localhost:5000";
    const BASE_URL = import.meta.env.VITE_LANDING_PAGE_BASE_URL || " http://192.168.1.4:5000";

    useEffect(() => {
        // Meta Pixel Event Code
        if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'CompleteRegistration', {
                value: 1499,
                currency: 'INR',
            });
        }

        // Google Tag Event Code
        if (typeof window !== 'undefined' && (window as any).gtag) {
            const recentRazorpayResponse = sessionStorage.getItem(RECENT_RAZORPAY_RESPONSE_KEY);
            const recentRazorpayResponseData = recentRazorpayResponse ? JSON.parse(recentRazorpayResponse) : null;

            (window as any).gtag('event', 'conversion', {
                'send_to': 'AW-17833167035/AYJgCLXYvuwbELuRwrdC',
                'value': 1499.0,
                'currency': 'INR',
                'transaction_id': recentRazorpayResponseData?.razorpay_payment_id || '',
            });

            // cleanup for nextpayment in-case user do
            sessionStorage.removeItem(RECENT_RAZORPAY_RESPONSE_KEY);
        }
    }, []);



    const handleDownload = async () => {
        if (!cardRef.current) return;

        setIsDownloading(true);
        try {
            // Convert logo to base64 to avoid CORS issues with html2canvas
            const convertImageToBase64 = (url: string): Promise<string> => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.crossOrigin = 'anonymous';
                    img.onload = () => {
                        try {
                            const canvas = document.createElement('canvas');
                            canvas.width = img.width;
                            canvas.height = img.height;
                            const ctx = canvas.getContext('2d');
                            if (ctx) {
                                ctx.drawImage(img, 0, 0);
                                resolve(canvas.toDataURL('image/png'));
                            } else {
                                reject(new Error('Could not get canvas context'));
                            }
                        } catch (error) {
                            reject(error);
                        }
                    };
                    img.onerror = () => reject(new Error('Failed to load image'));
                    img.src = url;
                });
            };

            // Try to convert logo to base64
            let logoBase64: string | null = null;
            try {
                logoBase64 = await convertImageToBase64('https://brpl.net/logo.png');
            } catch (error) {
                try {
                    // Fallback to S3 logo
                    logoBase64 = await convertImageToBase64('https://brpl-public-uploads.s3.ap-south-1.amazonaws.com/logo.png');
                } catch (fallbackError) {
                    console.warn('Could not convert logo to base64, proceeding without it');
                }
            }

            // Replace logo src with base64 if we got it
            if (logoBase64 && cardRef.current) {
                const logoImg = cardRef.current.querySelector('img[alt="BRPL Logo"]') as HTMLImageElement;
                if (logoImg) {
                    const originalSrc = logoImg.src;
                    logoImg.src = logoBase64;
                    // Wait a bit for the image to update
                    await new Promise(resolve => setTimeout(resolve, 200));
                }
            }

            // Wait for all images to be ready
            await new Promise(resolve => setTimeout(resolve, 500));

            const canvas = await html2canvas(cardRef.current, {
                useCORS: true,
                allowTaint: false, // Can be false now since logo is base64
                scale: 2, // Better quality
                backgroundColor: null, // Transparent background - card has its own background
                logging: false,
                imageTimeout: 20000, // Wait longer for images to load
            });

            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `BRPL_ShareCard_${name.replace(/\s+/g, '_')}.png`;
            link.href = url;
            link.click();

            // Restore original logo src if we changed it
            if (cardRef.current) {
                const logoImg = cardRef.current.querySelector('img[alt="BRPL Logo"]') as HTMLImageElement;
                if (logoImg && logoImg.src.startsWith('data:')) {
                    logoImg.src = 'https://brpl.net/logo.png';
                }
            }

            toast({
                title: "Card Downloaded",
                description: "Your BRPL share card has been saved successfully!",
            });
        } catch (error) {
            console.error("Download failed:", error);
            toast({
                variant: "destructive",
                title: "Download Failed",
                description: "Could not generate image. Please try again.",
            });
        } finally {
            setIsDownloading(false);
        }
    };

    const handleShare = async () => {
        if (!cardRef.current) return;

        try {
            // Convert logo to base64 to avoid CORS issues with html2canvas
            const convertImageToBase64 = (url: string): Promise<string> => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.crossOrigin = 'anonymous';
                    img.onload = () => {
                        try {
                            const canvas = document.createElement('canvas');
                            canvas.width = img.width;
                            canvas.height = img.height;
                            const ctx = canvas.getContext('2d');
                            if (ctx) {
                                ctx.drawImage(img, 0, 0);
                                resolve(canvas.toDataURL('image/png'));
                            } else {
                                reject(new Error('Could not get canvas context'));
                            }
                        } catch (error) {
                            reject(error);
                        }
                    };
                    img.onerror = () => reject(new Error('Failed to load image'));
                    img.src = url;
                });
            };

            // Try to convert logo to base64
            let logoBase64: string | null = null;
            try {
                logoBase64 = await convertImageToBase64('https://brpl.net/logo.png');
            } catch (error) {
                try {
                    // Fallback to S3 logo
                    logoBase64 = await convertImageToBase64('https://brpl-public-uploads.s3.ap-south-1.amazonaws.com/logo.png');
                } catch (fallbackError) {
                    console.warn('Could not convert logo to base64, proceeding without it');
                }
            }

            // Replace logo src with base64 if we got it
            if (logoBase64 && cardRef.current) {
                const logoImg = cardRef.current.querySelector('img[alt="BRPL Logo"]') as HTMLImageElement;
                if (logoImg) {
                    const originalSrc = logoImg.src;
                    logoImg.src = logoBase64;
                    // Wait a bit for the image to update
                    await new Promise(resolve => setTimeout(resolve, 200));
                }
            }

            // Wait for all images to be ready
            await new Promise(resolve => setTimeout(resolve, 500));

            const canvas = await html2canvas(cardRef.current, {
                useCORS: true,
                allowTaint: false, // Can be false now since logo is base64
                scale: 2,
                backgroundColor: null, // Transparent background - card has its own background
                logging: false,
                imageTimeout: 20000, // Wait longer for images to load
            });

            // Restore original logo src if we changed it
            if (cardRef.current) {
                const logoImg = cardRef.current.querySelector('img[alt="BRPL Logo"]') as HTMLImageElement;
                if (logoImg && logoImg.src.startsWith('data:')) {
                    logoImg.src = 'https://brpl.net/logo.png';
                }
            }

            canvas.toBlob(async (blob) => {
                if (blob && navigator.share) {
                    const file = new File([blob], `BRPL_ShareCard_${name.replace(/\s+/g, '_')}.png`, { type: 'image/png' });
                    try {
                        await navigator.share({
                            title: 'My BRPL Share Card',
                            text: `I just joined Beyond Reach Premier League! Check out my share card!`,
                            files: [file],
                        });
                        toast({
                            title: "Shared Successfully",
                            description: "Your share card has been shared!",
                        });
                    } catch (error) {
                        console.error("Share failed:", error);
                        // Fallback to download
                        handleDownload();
                    }
                } else {
                    // Fallback to download if share API not available
                    handleDownload();
                }
            }, 'image/png');
        } catch (error) {
            console.error("Share generation failed:", error);
            toast({
                variant: "destructive",
                title: "Share Failed",
                description: "Could not generate share card. Please try downloading instead.",
            });
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 overflow-y-auto">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full fixed">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img
                    src="/stats.png"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            <div className="relative z-20 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 py-12 px-4">

                {/* Success Message Card (Left Side) */}
                <motion.div
                    className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl p-8 text-center shadow-2xl overflow-hidden"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                    >
                        <CheckCircle className="w-24 h-24 text-[#263574] mx-auto mb-6" />
                    </motion.div>

                    <h1 className="font-display text-4xl font-bold mb-4 text-gray-900">
                        Welcome, {name}!
                    </h1>

                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                        Your registration for <span className="font-bold text-[#263574]">Beyond Reach Premier League</span> is complete.
                    </p>

                    <div className="space-y-4">
                        <a
                            href="https://brpl.net/auth"
                            className="block w-full py-4 bg-[#263574] text-white font-display font-bold text-lg rounded-lg relative overflow-hidden group border-2 border-white/20 hover:bg-[#1f2b5e] shadow-lg flex items-center justify-center gap-2"
                        >
                            <span className="relative z-10">Login to Dashboard</span>
                            <ArrowRight className="w-5 h-5 relative z-10" />
                        </a>
                        <Link
                            to="/"
                            className="block w-full py-3 text-gray-500 font-medium hover:text-[#263574] transition-colors"
                        >
                            Return to Home
                        </Link>
                    </div>
                </motion.div>

                {/* Animated Arrow (Center - Desktop Only) */}
                <motion.div
                    className="hidden lg:flex flex-col items-center justify-center text-white"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <p className="text-lg font-bold mb-2 uppercase tracking-widest text-[#FACC15] animate-pulse">Now</p>
                    <motion.div
                        animate={{ x: [0, 20, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                        <ArrowRight className="w-16 h-16 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                    </motion.div>
                    <p className="text-lg font-bold mt-2 uppercase tracking-widest text-[#FACC15] animate-pulse">Create Card</p>
                </motion.div>

                {/* Animated Arrow (Center - Mobile Only - Down) */}
                <motion.div
                    className="lg:hidden flex flex-col items-center justify-center text-white my-4"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                        {/* Down arrow icon (using ArrowRight rotated 90deg for simplicity or could import ArrowDown) */}
                        <ArrowRight className="w-10 h-10 text-white rotate-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                    </motion.div>
                    <p className="text-sm font-bold mt-1 uppercase tracking-widest text-[#FACC15]">Create Card</p>
                </motion.div>


                {/* BRPL Share Card Section (Right Side) */}
                <motion.div
                    className="w-full max-w-[400px]"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 md:p-8">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-black text-white uppercase italic mb-1">
                                Create Your <span className="text-[#FACC15]">Share Card</span>
                            </h2>
                            <p className="text-gray-300 text-sm">Upload photo & share!</p>
                        </div>

                        <div className="flex flex-col gap-6">
                            {/* Share Card Preview */}
                            <div className="flex justify-center">
                                <div className="w-full flex justify-center transform scale-95 hover:scale-100 transition-transform duration-300">
                                    <div ref={cardRef}>
                                        <BRPLShareCard
                                            userName={name}
                                            userRole={role}
                                            city={state?.city || "Patna"}
                                            userImage={userImage}
                                            onImageUpload={() => { }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="flex flex-col gap-3 justify-center items-center w-full">


                                <div className="flex gap-2 w-full">
                                    <button
                                        onClick={handleDownload}
                                        disabled={!userImage || isDownloading}
                                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#FACC15] hover:bg-[#ffe066] text-black font-black uppercase tracking-wide rounded-xl shadow-lg transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                    >
                                        {isDownloading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Download className="w-4 h-4" />
                                        )}
                                        <span>Download</span>
                                    </button>

                                    {navigator.share && (
                                        <button
                                            onClick={handleShare}
                                            disabled={!userImage}
                                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                        >
                                            <Share2 className="w-4 h-4" />
                                            <span>Share</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ThankYou;
