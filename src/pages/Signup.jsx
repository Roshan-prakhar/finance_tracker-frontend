import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {validateEmail} from "../util/validation.js";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS, BASE_URL} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import {LoaderCircle} from "lucide-react";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector.jsx";
import uploadProfileImage from "../util/uploadProfileImage.js";
import Header from "../components/Header.jsx";

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        window.location.href = `${BASE_URL}oauth2/authorization/google`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let profileImageUrl = "";
        setIsLoading(true);

        if (!fullName.trim()) { setError("Please enter your fullname"); setIsLoading(false); return; }
        if (!validateEmail(email)) { setError("Please enter valid email address"); setIsLoading(false); return; }
        if (!password.trim()) { setError("Please enter your password"); setIsLoading(false); return; }
        setError("");

        try {
            if (profilePhoto) {
                const imageUrl = await uploadProfileImage(profilePhoto);
                profileImageUrl = imageUrl || "";
            }
            const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, { fullName, email, password, profileImageUrl });
            if (response.status === 201) {
                toast.success("Profile created successfully.");
                navigate("/login");
            }
        } catch(err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col" style={{background: '#f0f4f0'}}>
            <Header />
            <div className="flex-grow flex items-center justify-center py-10 px-4 relative overflow-hidden">
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20 translate-x-1/2 -translate-y-1/2"
                    style={{background: 'radial-gradient(circle, #16a34a, transparent)'}}></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 -translate-x-1/2 translate-y-1/2"
                    style={{background: 'radial-gradient(circle, #15803d, transparent)'}}></div>

                <div className="relative z-10 w-full max-w-lg">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden" style={{boxShadow: '0 20px 60px rgba(22,163,74,0.12)'}}>
                        {/* Green top bar */}
                        <div className="h-1.5 w-full" style={{background: 'linear-gradient(90deg, #16a34a, #22c55e, #16a34a)'}}></div>

                        <div className="p-8 md:p-10 max-h-[85vh] overflow-y-auto">
                            {/* Logo mark */}
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: '#16a34a'}}>
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="text-lg font-bold text-gray-900 tracking-tight">FinTrack</span>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h2>
                            <p className="text-sm text-gray-400 mb-8">Start your journey to better financial health</p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Profile Photo */}
                                <div className="flex justify-center mb-2">
                                    <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto} />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                                        <input
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="John Doe"
                                            type="text"
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:border-green-500 focus:ring-2 focus:bg-white transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                                        <input
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="name@example.com"
                                            type="text"
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:border-green-500 focus:ring-2 focus:bg-white transition-all"
                                        />
                                    </div>
                                    <div className="col-span-1 sm:col-span-2">
                                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Password</label>
                                        <input
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Create a strong password"
                                            type="password"
                                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:border-green-500 focus:ring-2 focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="flex items-center gap-2 text-red-700 text-sm bg-red-50 border border-red-100 p-3 rounded-xl">
                                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        {error}
                                    </div>
                                )}

                                <button
                                    disabled={isLoading}
                                    className={`w-full py-3.5 text-sm font-semibold text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-200 ${isLoading ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90 active:scale-95'}`}
                                    style={{background: '#16a34a'}}
                                    type="submit"
                                >
                                    {isLoading ? (
                                        <><LoaderCircle className="animate-spin w-4 h-4" /> Creating Account...</>
                                    ) : "Create Account"}
                                </button>

                                <div className="flex items-center gap-3 py-1">
                                    <div className="flex-1 h-px bg-gray-100"></div>
                                    <span className="text-xs text-gray-300">or sign up with</span>
                                    <div className="flex-1 h-px bg-gray-100"></div>
                                </div>

                                {/* Google OAuth Button */}
                                <button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 active:scale-95 shadow-sm"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    Continue with Google
                                </button>

                                <p className="text-sm text-gray-500 text-center">
                                    Already have an account?{' '}
                                    <Link to="/login" className="font-semibold transition-colors" style={{color: '#16a34a'}}>
                                        Sign in
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-6">Your financial data is encrypted and secure.</p>
                </div>
            </div>
        </div>
    );
};

export default Signup;