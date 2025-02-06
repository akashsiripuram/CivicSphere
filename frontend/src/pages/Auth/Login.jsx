import { useState } from "react";
import { loginUser } from "../../components/redux/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }))
        .then((data)=>{
           
            if(data.payload.success){
                toast.success(data.payload.message);
                navigate("/");
            }
        })
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
