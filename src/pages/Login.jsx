import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Input from "../components/Input.jsx";
import {validateEmail} from "../util/validation.js";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import {AppContext} from "../context/AppContext.jsx";
import {LoaderCircle} from "lucide-react";
import Header from "../components/Header.jsx";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {setUser} = useContext(AppContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!validateEmail(email)) {
            setError("Please enter valid email address");
            setIsLoading(false);
            return;
        }
        if (!password.trim()) {
            setError("Please enter your password");
            setIsLoading(false);
            return;
        }
        setError("");
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, { email, password });
            const {token, user} = response.data;
            if (token) {
                localStorage.setItem("token", token);
                setUser(user);
                navigate("/dashboard");
            }
        } catch(error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col" style={{background: '#f0f4f0'}}>
            <Header />
            <div className="flex-grow flex items-center justify-center py-10 px-4 relative overflow-hidden">
                {/* Decorative blobs */}
                <div className="absolute top-0 left-0 w-80 h-80 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"
                    style={{background: 'radial-gradient(circle, #16a34a, transparent)'}}></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 translate-x-1/2 translate-y-1/2"
                    style={{background: 'radial-gradient(circle, #15803d, transparent)'}}></div>

                <div className="relative z-10 w-full max-w-md">
                    {/* Card */}
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden" style={{boxShadow: '0 20px 60px rgba(22,163,74,0.12)'}}>
                        {/* Green top bar */}
                        <div className="h-1.5 w-full" style={{background: 'linear-gradient(90deg, #16a34a, #22c55e, #16a34a)'}}></div>

                        <div className="p-8 md:p-10">
                            {/* Logo mark */}
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background: '#16a34a'}}>
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="text-lg font-bold text-gray-900 tracking-tight">FinTrack</span>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h2>
                            <p className="text-sm text-gray-400 mb-8">Sign in to manage your finances</p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        type="text"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:border-green-500 focus:ring-2 focus:bg-white transition-all"
                                        style={{'--tw-ring-color': 'rgba(22,163,74,0.1)'}}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Password</label>
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        type="password"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:border-green-500 focus:ring-2 focus:bg-white transition-all"
                                    />
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
                                        <><LoaderCircle className="animate-spin w-4 h-4" /> Signing in...</>
                                    ) : "Sign In"}
                                </button>

                                {/* Divider */}
                                <div className="flex items-center gap-3 py-1">
                                    <div className="flex-1 h-px bg-gray-100"></div>
                                    <span className="text-xs text-gray-300">or</span>
                                    <div className="flex-1 h-px bg-gray-100"></div>
                                </div>

                                <p className="text-sm text-gray-500 text-center">
                                    Don't have an account?{' '}
                                    <Link to="/signup" className="font-semibold transition-colors" style={{color: '#16a34a'}}>
                                        Create one
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Bottom note */}
                    <p className="text-center text-xs text-gray-400 mt-6">
                        Your financial data is encrypted and secure.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;