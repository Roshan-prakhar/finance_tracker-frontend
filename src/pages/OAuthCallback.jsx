import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { Shield, Sparkles, Loader2 } from "lucide-react";

const OAuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setUser } = useContext(AppContext);

    useEffect(() => {
        const token = searchParams.get("token");
        if (!token) {
            navigate("/login");
            return;
        }
        localStorage.setItem("token", token);
        axiosConfig.get(API_ENDPOINTS.GET_USER_INFO)
            .then((res) => {
                setUser(res.data);
                navigate("/dashboard");
            })
            .catch(() => {
                localStorage.removeItem("token");
                navigate("/login");
            });
    }, []);

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "#f0f4f0" }}>
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-15 -translate-x-1/2 -translate-y-1/2"
                style={{background: 'radial-gradient(circle, #16a34a, transparent)'}}></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 translate-x-1/3 translate-y-1/3"
                style={{background: 'radial-gradient(circle, #15803d, transparent)'}}></div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-600/20 mb-6">
                    <Shield size={32} className="text-white" />
                </div>

                <div className="relative mb-6">
                    <div className="w-12 h-12 border-3 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles size={16} className="text-emerald-500 animate-pulse" />
                    </div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2">Signing you in</h2>
                <p className="text-sm text-gray-400 font-medium">Authenticating with Google...</p>

                <div className="w-48 h-1 bg-gray-200 rounded-full mt-6 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full animate-pulse" style={{width: '60%'}}></div>
                </div>

                <p className="text-xs text-gray-300 mt-4">Please wait while we verify your credentials</p>
            </div>
        </div>
    );
};

export default OAuthCallback;