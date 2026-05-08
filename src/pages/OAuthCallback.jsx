import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";

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
        <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "#f0f4f0" }}>
            <div className="w-12 h-12 border-2 border-green-100 border-t-green-500 rounded-full animate-spin mb-4"></div>
            <p className="text-sm text-gray-400 font-medium">Signing you in with Google…</p>
        </div>
    );
};

export default OAuthCallback;
