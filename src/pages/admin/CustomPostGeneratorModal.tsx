import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Upload, Download } from 'lucide-react';
import BRPLShareCard from '@/components/cricket/BRPLShareCard';
import html2canvas from 'html2canvas';
import { useToast } from '@/hooks/use-toast';

interface CustomPostGeneratorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CustomPostGeneratorModal = ({ isOpen, onClose }: CustomPostGeneratorModalProps) => {
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [userImage, setUserImage] = useState<string | null>(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setName('');
            setCity('');
            setUserImage(null);
        }
    }, [isOpen]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setUserImage(url);
        }
    };

    const handleDownload = async () => {
        if (!cardRef.current) return;
        if (!name) {
            toast({
                variant: "destructive",
                title: "Name Required",
                description: "Please enter a name for the post.",
            });
            return;
        }

        setIsDownloading(true);
        try {
            // Convert logo to base64 to avoid CORS issues with html2canvas (Reused from GeneratePostModal)
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
            const fileNameName = name.replace(/\s+/g, '_');
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

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl bg-white text-black overflow-y-auto max-h-[95vh]">
                <DialogHeader>
                    <DialogTitle>Create Custom Post</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                    {/* Input Side */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Player Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter player name"
                                className="bg-gray-50 border-gray-200"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="city">City / Location</Label>
                            <Input
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Enter city (e.g. Mumbai)"
                                className="bg-gray-50 border-gray-200"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Player Photo</Label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors h-48"
                            >
                                {userImage ? (
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <img src={userImage} alt="Preview" className="max-h-full object-contain" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                                            <p className="text-white font-medium">Click to Change</p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-500 font-medium">Click to upload photo</p>
                                        <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG</p>
                                    </>
                                )}
                            </div>
                            <input
                                type="file"
                                id="custom-image-upload"
                                className="hidden"
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </div>

                        <Button
                            onClick={handleDownload}
                            disabled={isDownloading || !name}
                            className="w-full bg-[#263574] text-white hover:bg-[#1f2d5f] mt-4"
                            size="lg"
                        >
                            {isDownloading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Post
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Preview Side */}
                    <div className="flex flex-col items-center justify-center bg-gray-100 rounded-xl p-4">
                        <div className="text-sm text-gray-500 mb-4 font-medium uppercase tracking-wide">Live Preview</div>
                        <div ref={cardRef} className="transform scale-75 md:scale-90 origin-top shadow-xl">
                            <BRPLShareCard
                                userName={name || "Player Name"}
                                userRole="Cricketer" // Default
                                city={city || "India"}
                                userImage={userImage}
                                onImageUpload={() => fileInputRef.current?.click()}
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CustomPostGeneratorModal;
