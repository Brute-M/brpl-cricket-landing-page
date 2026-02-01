import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Calendar, Target, Send, CheckCircle, CreditCard, Upload, ArrowRight, ArrowLeft, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { toast as sonnerToast } from '@/components/ui/sonner';
import { MapPin, Building2, Square, Swords, CircleDot, Shield, Zap, CloudUpload } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { RECENT_RAZORPAY_RESPONSE_KEY } from '@/lib/constants';

interface RegistrationFormProps {
  isEmbedded?: boolean;
}

const RegistrationForm = ({ isEmbedded = false }: RegistrationFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    role: '',
    name: '',
    phone: '',
    state: '',
    city: '',
    email: '',
    password: '',
    referralCodeUsed: '',
    couponCode: '',
    otp: '',
    termsAccepted: false,
    paymentAmount: 0,
    paymentId: '',
    isFromLandingPage: true
  });

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isAlreadyPaid, setIsAlreadyPaid] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  // const BASE_URL = "http://localhost:5000";
  const BASE_URL = import.meta.env.VITE_LANDING_PAGE_BASE_URL || " http://192.168.1.4:5000";


  const roles = ['Batsman', 'Bowler', 'Wicket Keeper', 'All-Rounder'];
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];

  useEffect(() => {
    const ref = localStorage.getItem('brpl_ref_code');
    if (ref) {
      setFormData(prev => ({ ...prev, referralCodeUsed: ref }));
    }
  }, []);

  /*
  useEffect(() => {
    const c = localStorage.getItem('brpl_coupon_code');
    if (c) {
      setFormData(prev => ({ ...prev, couponCode: c }));
    }
  }, []);
  */

  const handleNext = () => {
    if (step === 1) {
      // Validate step 1
      if (!formData.role || !formData.name || !formData.phone || !formData.state || !formData.city) {
        toast({
          title: "Missing Information",
          description: "Please fill in all fields to proceed.",
          variant: "destructive",
        });
        return;
      }
      if (!formData.termsAccepted) {
        toast({
          title: "Terms Required",
          description: "Please agree to the terms and conditions.",
          variant: "destructive",
        });
        return;
      }
      if (!isOtpVerified) {
        toast({
          title: "OTP Verification Required",
          description: "Please verify your mobile number with OTP.",
          variant: "destructive",
        });
        return;
      }
      setStep(isAlreadyPaid ? 3 : step + 1);
    } else if (step === 2) {
      setStep(step + 1);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSendOtp = async () => {
    if (!formData.phone || formData.phone.length !== 10) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number.",
        variant: "destructive",
      });
      return;
    }

    setIsSendingOtp(true);
    try {
      const response = await fetch(`${BASE_URL}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: formData.phone, checkExisting: true }),
      });
      const data = await response.json();

      if (response.ok) {
        setIsOtpSent(true);
        toast({
          title: "OTP Sent",
          description: "Please check your mobile for the OTP.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to Send OTP",
          description: data.message || "Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to connect to server.",
      });
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!formData.otp) {
      toast({
        title: "OTP Required",
        description: "Please enter the OTP sent to your mobile.",
        variant: "destructive",
      });
      return;
    }

    setIsVerifyingOtp(true);
    try {
      const response = await fetch(`${BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: formData.phone, otp: formData.otp }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setIsOtpVerified(true);
        setIsAlreadyPaid(data.isPaid || false);
        toast({
          title: "OTP Verified",
          description: data.isPaid ? "You have already paid. Skipping payment step." : "Mobile number verified successfully.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Invalid OTP",
          description: data.message || "Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to connect to server.",
      });
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File Too Large",
        description: "Please upload an image smaller than 5MB.",
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "Invalid File Type",
        description: "Please upload an image file (JPEG, PNG, GIF).",
      });
      return;
    }

    setProfileImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setIsProcessingPayment(true);
    const res = await loadRazorpay();

    if (!res) {
      toast({
        variant: "destructive",
        title: "Razorpay SDK Failed",
        description: "Failed to load Razorpay SDK. Check your internet connection.",
      });
      setIsProcessingPayment(false);
      return;
    }

    try {
      // 1. Create Order
      const orderResponse = await fetch(`${BASE_URL}/api/payment/order-landing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1499 }), // Amount in INR
      });
      const orderData = await orderResponse.json();

      if (!orderData.id) {
        throw new Error("Failed to create order");
      }

      // 2. Open Razorpay Options
      const options = {
        key: "rzp_live_RsBsR05m5SGbtT",
        // key: "rzp_test_h7fC45pYvbeKRH", // Should ideally come from backend or env
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Beyond Reach Premier League",
        description: "Registration Fee",
        order_id: orderData.id,
        handler: async function (response: any) {
          // 3. Verify Payment
          try {
            const verifyResponse = await fetch(`${BASE_URL}/api/payment/verify-landing`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              toast({
                title: "Payment Successful",
                description: "Proceeding to next step.",
              });
              setFormData((prev) => ({
                ...prev,
                paymentId: response.razorpay_payment_id,
                paymentAmount: verifyData.amount || 1499 // Fallback to 1499 if not returned
              }));
              setStep(3); // Move to Step 3

              // storing for later user
              sessionStorage.setItem(RECENT_RAZORPAY_RESPONSE_KEY, JSON.stringify(response));
            } else {
              toast({
                variant: "destructive",
                title: "Payment Verification Failed",
                description: "Please contact support.",
              });
            }
          } catch (err) {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Payment verification failed.",
            });
          } finally {
            setIsProcessingPayment(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessingPayment(false);
          }
        },
        prefill: {
          name: formData.name,
          contact: formData.phone,
          email: formData.email, // Might be empty at step 2, but okay
        },
        theme: {
          color: "#263574",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: "Failed to initiate payment.",
      });
      setIsProcessingPayment(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing Credentials",
        description: "Please enter email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fname: formData.name,
        mobile: formData.phone,
        state: formData.state,
        city: formData.city,
        playerRole: formData.role,
        email: formData.email,
        password: formData.password,
        couponCode: formData.couponCode,
        isFromLandingPage: true,
        paymentAmount: formData.paymentAmount,
        paymentId: formData.paymentId,
        referralCodeUsed: formData.referralCodeUsed,
        trackingId: localStorage.getItem('brpl_tracking_id'),
        fbclid: localStorage.getItem('brpl_fbclid')
      };

      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        // Store token for authenticated requests (e.g., image upload)
        if (result.data?.token) {
          localStorage.setItem('token', result.data.token);

          // Upload image if selected
          if (profileImage) {
            try {
              setIsUploadingImage(true);
              const formDataImage = new FormData();
              formDataImage.append('profileImage', profileImage);

              const imageUploadResponse = await fetch(`${BASE_URL}/auth/upload-profile-image`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${result.data.token}`,
                },
                body: formDataImage,
              });

              if (imageUploadResponse.ok) {
                window.dispatchEvent(new CustomEvent('brpl:user-image-uploaded'));
              }
            } catch (imgError) {
              console.error("Failed to upload image silently", imgError);
            } finally {
              setIsUploadingImage(false);
            }
          }
        }

        // Dispatch custom event to refresh recent registrations
        window.dispatchEvent(new CustomEvent('brpl:user-registered', {
          detail: { name: formData.name, role: formData.role }
        }));

        // shadcn toast (default position)
        toast({
          title: "Registration Successful",
          description: `${formData.name} has registered successfully.`,
          duration: 3000,
        });





        setShowSuccessModal(true);

      } else {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: result.data?.message || "Something went wrong.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Failed to connect to server.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Removed early return to allow modal overlay

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/thank-you', {
      state: {
        name: formData.name,
        role: formData.role,
        city: formData.city,
        userImage: previewImage
      }
    });
  };


  return (
    <>
      <section id="registration" className={`relative overflow-hidden ${isEmbedded ? 'py-0' : 'py-20'}`}>

        <div className={`container mx-auto px-4 relative z-10 ${isEmbedded ? '' : 'grid lg:grid-cols-2 gap-12 items-center'}`}>
          {/* Left Content */}
          {!isEmbedded && (
            <motion.div
              className="text-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold tracking-wider uppercase bg-white/10 border border-white/20 rounded-full text-white">
                Join The Elite
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white">
                Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Journey</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Take the first step towards your professional cricket career. Our comprehensive registration process ensures we understand your skills and potential.
              </p>

              <div className="space-y-6">
                {[
                  { step: 1, title: 'Personal Details', desc: 'Tell us about yourself and your cricketing role.' },
                  { step: 2, title: 'Secure Payment', desc: 'Complete the registration fee payment securely.' },
                  { step: 3, title: 'Create Account', desc: 'Secure your account with a username and password.' }
                ].map((item) => (
                  <div key={item.step} className={`flex items-start gap-4 p-4 rounded-lg transition-colors ${step === item.step ? 'bg-white/10 border border-white/20' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${step >= item.step ? 'bg-[#263574] text-white border border-white/20' : 'bg-white/5 text-gray-500 border border-white/10'}`}>
                      {step > item.step ? <CheckCircle className="w-5 h-5" /> : item.step}
                    </div>
                    <div>
                      <h4 className={`font-bold ${step === item.step ? 'text-white' : 'text-gray-400'}`}>{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Right Form */}
          <motion.div
            className={`bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-2xl relative ${isEmbedded ? 'w-full' : ''}`}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-8">
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#FACC15]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm font-medium text-white/70">
                <span className={step >= 1 ? 'text-white font-bold underline underline-offset-4 decoration-[#FACC15]' : ''}>Details</span>
                <span className={step >= 2 ? 'text-white font-bold underline underline-offset-4 decoration-[#FACC15]' : ''}>Payment</span>
                <span className={step >= 3 ? 'text-white font-bold underline underline-offset-4 decoration-[#FACC15]' : ''}>Account</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      {/* Step 1 Fields */}
                      <div className="group relative z-50">
                        <label className="block text-sm font-semibold mb-3 text-white">Select Your Role</label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                            className={`w-full p-2.5 bg-gray-50 border rounded-xl flex items-center justify-between transition-all duration-300 ${isRoleDropdownOpen ? 'border-[#263574] ring-2 ring-[#263574]/20' : 'border-gray-200 hover:border-[#263574]/50'}`}
                          >
                            <div className="flex items-center gap-2.5">
                              {formData.role ? (
                                <>
                                  <div className="p-2 bg-[#263574] text-white rounded-full">
                                    {formData.role === 'Batsman' && <Swords className="w-5 h-5" />}
                                    {formData.role === 'Bowler' && <CircleDot className="w-5 h-5" />}
                                    {formData.role === 'Wicket Keeper' && <Shield className="w-5 h-5" />}
                                    {formData.role === 'All-Rounder' && <Zap className="w-5 h-5" />}
                                  </div>
                                  <span className="font-semibold text-[#263574]">{formData.role}</span>
                                </>
                              ) : (
                                <>
                                  <div className="p-2 bg-gray-200 text-gray-500 rounded-full">
                                    <Target className="w-5 h-5" />
                                  </div>
                                  <span className="text-gray-600">Choose your playing role</span>
                                </>
                              )}
                            </div>
                            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isRoleDropdownOpen ? 'rotate-180 text-[#263574]' : ''}`} />
                          </button>

                          <AnimatePresence>
                            {isRoleDropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                              >
                                {roles.map((role) => (
                                  <div
                                    key={role}
                                    onClick={() => {
                                      setFormData(prev => ({ ...prev, role }));
                                      setIsRoleDropdownOpen(false);
                                    }}
                                    className={`p-2.5 flex items-center gap-2.5 cursor-pointer transition-colors ${formData.role === role ? 'bg-[#263574]/5' : 'hover:bg-gray-50'}`}
                                  >
                                    <div className={`p-2 rounded-full ${formData.role === role ? 'bg-[#263574] text-white' : 'bg-gray-100 text-gray-500'}`}>
                                      {role === 'Batsman' && <Swords className="w-5 h-5" />}
                                      {role === 'Bowler' && <CircleDot className="w-5 h-5" />}
                                      {role === 'Wicket Keeper' && <Shield className="w-5 h-5" />}
                                      {role === 'All-Rounder' && <Zap className="w-5 h-5" />}
                                    </div>
                                    <span className={`font-semibold ${formData.role === role ? 'text-[#263574]' : 'text-gray-800'}`}>
                                      {role}
                                    </span>
                                    {formData.role === role && <CheckCircle className="w-4 h-4 text-[#263574] ml-auto" />}
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>



                      <div className="group">
                        <label className="block text-sm font-semibold mb-2 text-white">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#263574] transition-colors" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                            className="w-full pl-12 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#263574] focus:ring-2 focus:ring-[#263574]/20 transition-all text-gray-900"
                          />
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold mb-2 text-white">Mobile Number</label>
                        <div className="flex gap-2">
                          <div className="relative flex-grow flex">

                            {/* Country Code */}
                            <div className="text-gray-600 flex items-center px-4 bg-gray-100 border border-r-0 border-gray-200 rounded-l-lg font-medium select-none">
                              +91
                            </div>

                            {/* Phone Input */}
                            <div className="relative flex-grow">
                              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#263574] transition-colors" />

                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={isOtpVerified}
                                required
                                placeholder="Enter your mobile number"
                                className="w-full pl-12 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-r-lg focus:outline-none focus:border-[#263574] focus:ring-2 focus:ring-[#263574]/20 transition-all text-gray-900"
                              />

                              {isOtpVerified && (
                                <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                              )}
                            </div>

                          </div>
                          {!isOtpVerified && (
                            <button
                              type="button"
                              onClick={handleSendOtp}
                              disabled={isSendingOtp || isOtpSent}
                              className="px-4 py-2 bg-[#263574] text-white rounded-lg disabled:opacity-70 whitespace-nowrap"
                            >
                              {isSendingOtp ? "Sending..." : isOtpSent ? "Sent" : "Send OTP"}
                            </button>
                          )}
                        </div>
                        {isOtpSent && !isOtpVerified && (
                          <div className="mt-2 flex gap-2">
                            <input
                              type="text"
                              name="otp"
                              value={formData.otp}
                              onChange={handleChange}
                              placeholder="Enter OTP"
                              className="flex-grow pl-4 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#263574] text-gray-900"
                            />
                            <button
                              type="button"
                              onClick={handleVerifyOtp}
                              disabled={isVerifyingOtp}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-70"
                            >
                              {isVerifyingOtp ? "Verifying..." : "Verify"}
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="group relative">
                          <label className="block text-sm font-semibold mb-2 text-white">State</label>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
                              className={`w-full pl-12 pr-10 py-2 bg-gray-50 border rounded-lg flex items-center justify-between transition-all duration-300 ${isStateDropdownOpen ? 'border-[#263574] ring-2 ring-[#263574]/20' : 'border-gray-200 hover:border-[#263574]/50'}`}
                            >
                              <div className="flex items-center gap-2">
                                <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isStateDropdownOpen ? 'text-[#263574]' : 'text-gray-400'}`} />
                                <span className={formData.state ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                                  {formData.state || 'Select State'}
                                </span>
                              </div>
                              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isStateDropdownOpen ? 'rotate-180 text-[#263574]' : ''}`} />
                            </button>

                            <AnimatePresence>
                              {isStateDropdownOpen && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-y-auto max-h-60 z-[60] scrollbar-thin scrollbar-thumb-gray-200"
                                >
                                  {indianStates.map((state) => (
                                    <div
                                      key={state}
                                      onClick={() => {
                                        setFormData(prev => ({ ...prev, state }));
                                        setIsStateDropdownOpen(false);
                                      }}
                                      className={`p-2.5 flex items-center gap-2.5 cursor-pointer transition-colors ${formData.state === state ? 'bg-[#263574]/5' : 'hover:bg-gray-50'}`}
                                    >
                                      <span className={`text-sm font-semibold ${formData.state === state ? 'text-[#263574]' : 'text-gray-800'}`}>
                                        {state}
                                      </span>
                                      {formData.state === state && <CheckCircle className="w-4 h-4 text-[#263574] ml-auto" />}
                                    </div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                        <div className="group">
                          <label className="block text-sm font-semibold mb-2 text-white">Trial City</label>
                          <div className="relative">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#263574] transition-colors" />
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              required
                              placeholder="Preferred City"
                              className="w-full pl-12 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#263574] focus:ring-2 focus:ring-[#263574]/20 transition-all text-gray-900"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 pt-2">
                        <input
                          type="checkbox"
                          name="termsAccepted"
                          id="termsAccepted"
                          checked={formData.termsAccepted}
                          onChange={handleChange}
                          className="w-5 h-5 rounded border-gray-300 text-[#263574] focus:ring-[#263574]"
                        />
                        <label htmlFor="termsAccepted" className="text-sm text-gray-300 cursor-pointer select-none">
                          I agree to the <a href="#" className="text-[#FACC15] hover:underline font-semibold">Terms and Conditions</a>
                        </label>
                      </div>


                    </div>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full py-2 bg-[#263574] text-white font-display font-bold text-lg rounded-lg relative overflow-hidden group border-2 border-white/20 hover:bg-[#1f2b5e] shadow-lg flex items-center justify-center gap-2"
                    >
                      <span className="relative z-10">Next Step</span>
                      <ArrowRight className="w-5 h-5 relative z-10" />
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </button>
                  </motion.div>

                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CreditCard className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">Registration Fee</h3>
                      <p className="text-3xl font-bold text-[#FACC15] mb-1">₹1,499</p>
                      <p className="text-sm text-gray-300">One-time registration fee</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="font-medium text-white block">
                          UPI / Net Banking
                        </span>
                        <p className="text-sm text-white/80 mt-1">
                          100% secure payments powered by <span className="font-bold text-[#FACC15]">Razorpay</span>.
                          Supports UPI, Net Banking, Debit & Credit Cards.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="w-1/3 py-2 bg-white/10 text-white hover:bg-white/20 border-white/30 rounded-lg"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handlePayment}
                        disabled={isProcessingPayment}
                        className="w-2/3 py-2 bg-[#263574] text-white font-display font-bold text-lg rounded-lg relative overflow-hidden group border-2 border-white/20 hover:bg-[#1f2b5e] shadow-lg flex items-center justify-center gap-2"
                      >
                        <span className="relative z-10">{isProcessingPayment ? "Processing..." : "Pay & Proceed"}</span>
                        <ArrowRight className="w-5 h-5 relative z-10" />
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">Create Your Account</h3>
                      <p className="text-sm text-gray-300">Set up your login credentials to access the dashboard</p>
                    </div>

                    <div className="space-y-4">
                      <div className="group">
                        <label className="block text-sm font-semibold mb-2 text-white">Profile Photo</label>
                        <div className="relative">
                          <label className={`
                            relative flex flex-col items-center justify-center w-full min-h-[200px] 
                            rounded-xl border-2 border-dashed transition-all cursor-pointer overflow-hidden
                            ${previewImage ? 'border-[#263574] bg-white/5' : 'border-gray-300 bg-white hover:bg-gray-50'}
                          `}>
                            {previewImage ? (
                              <div className="w-full h-full p-4 flex flex-col items-center">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#263574] mb-4 shadow-lg">
                                  <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <p className="text-[#263574] font-semibold">Click to change photo</p>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center p-6">
                                <div className="w-16 h-16 mb-4 rounded-full bg-[#263574]/5 flex items-center justify-center">
                                  <CloudUpload className="w-8 h-8 text-[#263574]" />
                                </div>
                                <p className="mb-2 text-lg font-semibold text-gray-700">
                                  Click to upload
                                </p>
                                <p className="mb-2 text-sm text-gray-500">
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-400 mt-2">
                                  PNG, JPG up to 5MB
                                </p>
                              </div>
                            )}
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>
                      </div>
                      {/* <div className="group">
                        <label className="block text-sm font-semibold mb-2 text-white">Coupon Code (Optional)</label>
                        <div className="relative">
                          <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#263574] transition-colors" />
                          <input
                            type="text"
                            name="couponCode"
                            value={formData.couponCode}
                            onChange={handleChange}
                            placeholder="Paste coupon code"
                            className="w-full pl-12 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#263574] focus:ring-2 focus:ring-[#263574]/20 transition-all text-gray-900"
                          />
                        </div>
                      </div> */}

                      <div className="group">
                        <label className="block text-sm font-semibold mb-2 text-white">Referral Code (Optional)</label>
                        <div className="relative">
                          <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#263574] transition-colors" />
                          <input
                            type="text"
                            name="referralCodeUsed"
                            value={formData.referralCodeUsed}
                            onChange={handleChange}
                            placeholder="Enter referral code if you have"
                            className="w-full pl-12 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#263574] focus:ring-2 focus:ring-[#263574]/20 transition-all text-gray-900"
                          />
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold mb-2 text-white">Email Address (Username)</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#263574] transition-colors" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="you@example.com"
                            className="w-full pl-12 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#263574] focus:ring-2 focus:ring-[#263574]/20 transition-all text-gray-900"
                          />
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold mb-2 text-white">Password</label>
                        <div className="relative">
                          {/* Reusing Shield icon or similar for password if Lock icon not imported, assuming Shield is available from imports */}
                          <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#263574] transition-colors" />
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Create a strong password"
                            className="w-full pl-12 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#263574] focus:ring-2 focus:ring-[#263574]/20 transition-all text-gray-900"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="w-1/3 py-2 bg-white/10 text-white hover:bg-white/20 border-white/30"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-2/3 py-2 bg-[#263574] text-white font-display font-bold text-lg rounded-lg relative overflow-hidden group disabled:opacity-70 border-2 border-white/20 hover:bg-[#1f2b5e] shadow-lg flex items-center justify-center gap-2"
                      >
                        <span className="relative z-10">
                          {isSubmitting ? 'Registering...' : 'Complete Registration'}
                        </span>
                        {!isSubmitting && <CheckCircle className="w-5 h-5 relative z-10" />}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </section >

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={(open) => !open && handleCloseModal()}>
        <DialogContent className="sm:max-w-md bg-white text-black border-2 border-[#263574]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-[#263574]">Registration Successful!</DialogTitle>
            <DialogDescription className="text-center text-gray-600 text-base">
              Welcome to the league, <span className="font-semibold text-[#263574]">{formData.name}</span>!
              <br />
              Your registration is complete.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-6">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <button
              onClick={handleCloseModal}
              className="w-full sm:w-auto px-8 py-2.5 bg-[#263574] text-white rounded-lg hover:bg-[#1f2b5e] transition-colors font-bold tracking-wide shadow-lg"
            >
              CONTINUE
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegistrationForm;
