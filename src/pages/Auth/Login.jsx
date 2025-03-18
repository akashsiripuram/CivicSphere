import { useState } from "react";
import { loginUser } from "../../components/redux/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password })).then((data) => {
            if (data.payload.success) {
                toast.success(data.payload.message);
                navigate("/");
            }
        });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#2E1A47] to-[#18202D]">
            <div className="bg-[#272D40] p-8 rounded-2xl shadow-lg w-96 text-white relative">
                <div className="absolute top-[-50px] left-1/2 transform -translate-x-1/2">
                    <div className="w-20 h-20 bg-gray-500 rounded-full flex items-center justify-center">
                        <span className="text-4xl">👤</span>
                    </div>
                </div>
                <h1 className="text-2xl font-semibold text-center mb-6 mt-12">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-400">✉️</span>
                        <input
                            type="email"
                            placeholder="Email ID"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 pl-10 bg-[#1F2430] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A3EA1]"
                        />
                    </div>
                    <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-400">🔒</span>
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 pl-10 bg-[#1F2430] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A3EA1]"
                        />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" /> Remember me
                        </label>
                        <a href="#" className="text-[#A783E1] hover:underline">Forgot Password?</a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#5A3EA1] to-[#8133C6] text-white py-3 rounded-md hover:opacity-90 transition duration-300"
                    >
                        LOGIN
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
