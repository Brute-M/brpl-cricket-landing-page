import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Copy, CheckCircle, Loader2, RefreshCw } from "lucide-react";

interface CreateCoachFormProps {
    token: string;
}

const CreateCoachForm = ({ token }: CreateCoachFormProps) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        academyName: '',
        address: ''
    });
    const [createdCoach, setCreatedCoach] = useState<{ name: string, referralCode: string, url: string } | null>(null);
    const [coaches, setCoaches] = useState<any[]>([]);
    const [loadingCoaches, setLoadingCoaches] = useState(false);

    const BASE_URL = import.meta.env.VITE_LANDING_PAGE_BASE_URL || "https://brpl.net/api";

    const fetchCoaches = async () => {
        setLoadingCoaches(true);
        try {
            const response = await fetch(`${BASE_URL}/admin/records?type=coaches&page=1&limit=50`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await response.json();
            if (response.ok) {
                setCoaches(result?.data?.items || []);
            }
        } catch (error) {
            console.error("Failed to fetch coaches", error);
        } finally {
            setLoadingCoaches(false);
        }
    };

    useEffect(() => {
        fetchCoaches();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/admin/coaches`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                setCreatedCoach(result.data);
                toast({
                    title: "Coach Created",
                    description: `Referral Code: ${result.data.referralCode}`,
                });
                setFormData({ name: '', email: '', mobile: '', academyName: '', address: '' }); // Reset form
                fetchCoaches(); // Refresh list
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: result.message || "Failed to create coach",
                });
            }

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Network error",
            });
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: "Copied!", description: "Referral link copied to clipboard." });
    };

    return (
        <div className="space-y-8">
            {/* Create Coach Form */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-[#263574] mb-4">Create New Coach</h3>

                {createdCoach ? (
                    <div className="bg-green-50 p-6 rounded-xl border border-green-100 mb-6 relative">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 text-green-700 hover:bg-green-100"
                            onClick={() => setCreatedCoach(null)}
                        >
                            Close
                        </Button>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-green-800">Coach Created Successfully!</h4>
                                <p className="text-green-700 text-sm">Referral Code: <span className="font-mono font-bold">{createdCoach.referralCode}</span></p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <code className="flex-1 bg-white p-2 rounded border border-green-200 text-xs font-mono text-gray-700 break-all">
                                {createdCoach.url}
                            </code>
                            <Button size="sm" variant="outline" onClick={() => copyToClipboard(createdCoach.url)} className="bg-white hover:bg-green-100 border-green-200 text-green-700">
                                <Copy className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ) : null}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-900">Coach Name *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="e.g. Rahul Dravid"
                            required
                            className="bg-gray-50 border-gray-200 text-gray-900"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-900">Email Address *</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="coach@example.com"
                            required
                            className="bg-gray-50 border-gray-200 text-gray-900"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="mobile" className="text-gray-900">Mobile Number</Label>
                        <Input
                            id="mobile"
                            value={formData.mobile}
                            onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                            placeholder="e.g. 9876543210"
                            className="bg-gray-50 border-gray-200 text-gray-900"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="academyName" className="text-gray-900">Academy Name</Label>
                        <Input
                            id="academyName"
                            value={formData.academyName}
                            onChange={(e) => setFormData(prev => ({ ...prev, academyName: e.target.value }))}
                            placeholder="e.g. Rising Stars Academy"
                            className="bg-gray-50 border-gray-200 text-gray-900"
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address" className="text-gray-900">Address</Label>
                        <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                            placeholder="Full address"
                            className="bg-gray-50 border-gray-200 text-gray-900"
                        />
                    </div>

                    <div className="md:col-span-2 pt-2">
                        <Button type="submit" className="w-full bg-[#263574] text-white hover:bg-[#1f2d5f]" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {loading ? 'Creating...' : 'Create Coach'}
                        </Button>
                    </div>
                </form>
            </div>

            {/* Coach List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                    <h3 className="font-bold text-gray-800">Existing Coaches</h3>
                    <Button variant="ghost" size="sm" onClick={fetchCoaches} disabled={loadingCoaches}>
                        <RefreshCw className={`w-4 h-4 text-gray-500 ${loadingCoaches ? 'animate-spin' : ''}`} />
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Referral Code</th>
                                <th className="p-3">Academy</th>
                                <th className="p-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loadingCoaches ? (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading coaches...</td></tr>
                            ) : coaches.length === 0 ? (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-500">No coaches found.</td></tr>
                            ) : (
                                coaches.map((coach: any) => (
                                    <tr key={coach._id} className="hover:bg-gray-50">
                                        <td className="p-3 font-medium text-gray-900">{coach.name}</td>
                                        <td className="p-3 text-gray-600">{coach.email}</td>
                                        <td className="p-3">
                                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded font-mono text-xs font-bold border border-blue-100">
                                                {coach.referralCode}
                                            </span>
                                        </td>
                                        <td className="p-3 text-gray-600">{coach.academyName || '-'}</td>
                                        <td className="p-3 text-right">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-7 text-xs"
                                                onClick={() => copyToClipboard(`${window.location.origin}/?ref=${coach.referralCode}`)}
                                            >
                                                Copy Link
                                            </Button >
                                        </td >
                                    </tr >
                                ))
                            )}
                        </tbody >
                    </table >
                </div >
            </div >
        </div >
    );
};

export default CreateCoachForm;
