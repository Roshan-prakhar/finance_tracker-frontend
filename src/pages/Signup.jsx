import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {assets} from "../assets/assets.js";
import Input from "../components/Input.jsx";
import {validateEmail} from "../util/validation.js";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        let profileImageUrl = "";
        setIsLoading(true);

        //basic validation
        if (!fullName.trim()) {
            setError("Please enter your fullname");
            setIsLoading(false);
            return;
        }

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

        //signup api call
        try {

            //upload image if present
            if (profilePhoto) {
                const imageUrl = await uploadProfileImage(profilePhoto);
                profileImageUrl = imageUrl || "";
            }
            const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl
            })
            if (response.status === 201) {
                toast.success("Profile created successfully.");
                navigate("/login");
            }
        } catch(err) {
            console.error('Something went wrong', err);
            setError(err.message);
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
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
                    <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-purple-100/20 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 w-full max-w-lg px-6 animate-fade-in-up">
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-purple-500/5 border border-white/50 p-8 md:p-10 max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-50 mb-4">
                                <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">
                                Create Your Account
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Start your journey to better financial health
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="flex justify-center mb-2">
                                <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto} />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    label="Full Name"
                                    placeholder="John Doe"
                                    type="text"
                                />

                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    label="Email Address"
                                    placeholder="name@example.com"
                                    type="text"
                                />

                                <div className="col-span-1 sm:col-span-2">
                                    <Input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        label="Password"
                                        placeholder="Create a strong password"
                                        type="password"
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
                                className={`btn-primary w-full py-3.5 text-base font-semibold flex items-center justify-center gap-2 rounded-xl ${isLoading ? 'opacity-60 cursor-not-allowed': ''}`}
                                type="submit"
                            >
                                {isLoading ? (
                                    <>
                                        <LoaderCircle className="animate-spin w-5 h-5" />
                                        Creating Account...
                                    </>
                                ) : "Create Account"}
                            </button>

                            <p className="text-sm text-gray-500 text-center pt-2">
                                Already have an account?{' '}
                                <Link to="/login" className="font-semibold text-purple-600 hover:text-purple-700 transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;