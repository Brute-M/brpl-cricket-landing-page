import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Upload, Download, X } from 'lucide-react';
import BRPLShareCard from '@/components/cricket/BRPLShareCard'; // Adjust path if needed
import html2canvas from 'html2canvas';
import { useToast } from '@/hooks/use-toast';

interface GeneratePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: any; // User object
}

const GeneratePostModal = ({ isOpen, onClose, user }: GeneratePostModalProps) => {
    const { toast } = useToast();
    const [userImage, setUserImage] = useState<string | null>(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Reset image when user changes or modal opens
    useEffect(() => {
        if (isOpen && user) {
            // If user has a profile image, meaningful default?
            // For now, let's start empty or with existing if available logic exists
            // The BRPLShareCard expects a URL string. 
            // If the user object has an image URL, we could use it.
            // But based on request "user pload our image", maybe admin always wants to upload?
            // We'll leave it null or use user's image if present in user object.
            // Let's assume user.profileImage or similar if it exists
            setUserImage(user.profilePicture || user.userImage || null);
        }
    }, [isOpen, user]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setUserImage(url);
        }
    };

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

            // Try to convert logo to base64 (logic from ThankYou.tsx)
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
                    logoImg.src = logoBase64;
                    await new Promise(resolve => setTimeout(resolve, 200));
                }
            }

            await new Promise(resolve => setTimeout(resolve, 500));

            const canvas = await html2canvas(cardRef.current, {
                useCORS: true,
                allowTaint: false,
                scale: 2,
                backgroundColor: null,
                logging: false,
                imageTimeout: 20000,
            });

            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            const fileNameName = (user.name || (user.fname + ' ' + user.lname)).replace(/\s+/g, '_');
            link.download = `BRPL_ShareCard_${fileNameName}.png`;
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
                description: "The share card has been saved successfully!",
            });

            // onImageUpload in BRPLShareCard is unused visually but maybe we want to keep it clean.
            // The modal handles the upload logic via state.

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

    if (!user) return null;

    const userName = user.name || (user.fname + ' ' + (user.lname || ''));
    const userCity = user.city || "India";

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-white text-black overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Generate Post for {userName}</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center gap-6 py-4">
                    {/* Hidden input for handling file upload from BRPLShareCard click if mapped or custom button */}
                    <input
                        type="file"
                        id="image-upload" // BRPLShareCard targets this ID
                        className="hidden"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleImageUpload}
                    />

                    {/* Preview Area */}
                    <div ref={cardRef} className="transform scale-90 md:scale-100">
                        <BRPLShareCard
                            userName={userName}
                            userRole={user.playerRole || "Cricketer"} // Or pass role
                            city={userCity}
                            userImage={userImage}
                            onImageUpload={() => {
                                // This callback might be called by BRPLShareCard if it had internal logic, 
                                // but we know it clicks #image-upload.
                                // We can also programmically click if needed, but the ID binding should work.
                            }}
                        />
                    </div>

                    <div className="flex gap-4 w-full justify-center">
                        <Button
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2"
                        >
                            <Upload className="w-4 h-4" />
                            Change Photo
                        </Button>

                        <Button
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className="bg-[#263574] text-white hover:bg-[#1f2d5f] flex items-center gap-2"
                        >
                            {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                            Download Post
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default GeneratePostModal;
