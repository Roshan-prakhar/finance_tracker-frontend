import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {assets} from "../assets/assets.js";
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
        //basic validation
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

        //LOGIN API call
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
                email,
                password,
            });
            const {token, user} = response.data;
            if (token) {
                localStorage.setItem("token", token);
                setUser(user);
                navigate("/dashboard");
            }
        }catch(error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                console.error('Something went wrong', error);
                setError(error.message);
            }
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div className="min-h-screen w-full flex flex-col bg-gray-50">
            <Header />
            <div className="flex-grow w-full relative flex items-center justify-center overflow-hidden py-8">
                {/* Background decorations */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-100/20 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 w-full max-w-md px-6 animate-fade-in-up">
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-purple-500/5 border border-white/50 p-8 md:p-10">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-50 mb-4">
                                <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">
                                Welcome Back
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Enter your credentials to access your account
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email Address"
                                placeholder="name@example.com"
                                type="text"
                            />

                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                            />

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
                                className={`btn-primary w-full py-3.5 text-base font-semibold flex items-center justify-center gap-2 rounded-xl ${isLoading ? 'opacity-60 cursor-not-allowed': ''}`}
                                type="submit"
                            >
                                {isLoading ? (
                                    <>
                                        <LoaderCircle className="animate-spin w-5 h-5" />
                                        Signing in...
                                    </>
                                ) : "Sign In"}
                            </button>

                            <p className="text-sm text-gray-500 text-center pt-2">
                                Don't have an account?{' '}
                                <Link to="/signup" className="font-semibold text-purple-600 hover:text-purple-700 transition-colors">
                                    Create one
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;