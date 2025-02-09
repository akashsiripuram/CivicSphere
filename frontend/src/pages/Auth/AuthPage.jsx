import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../components/redux/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import './AuthPage.css';
import { Mail, Lock, User } from "lucide-react";

const AuthPage = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "citizen",
    });

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            document.getElementById('container').classList.add('sign-in');
        }, 200);
        return () => clearTimeout(timer);
    }, []);

    const toggle = () => {
        const container = document.getElementById('container');
        container.classList.toggle('sign-in');
        container.classList.toggle('sign-up');
        setIsSignIn(!isSignIn);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(loginData))
            .unwrap() // Ensures we get actual response, not Redux action object
            .then((data) => {
                toast.success(data.message || "Login successful!");
                navigate("/");
            })
            .catch((error) => {
                toast.error(error.message || "Login failed. Please try again.");
            });
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData))
            .unwrap() // Ensures proper handling of success/error responses
            .then((data) => {
                toast.success(data.message || "Registration successful!");
                toggle();
            })
            .catch((error) => {
                toast.error(error.message || "Something went wrong.");
            });
    };


    return (
        <div id="container" className="container-auth">
            <div className="row">
                {/* Sign Up Form */}
                <div className="col align-items-center flex-col sign-up">
                    <div className="form-wrapper align-items-center">
                        <form onSubmit={handleRegisterSubmit} className="form sign-up">
                            <div className="input-group">
                                <User className="text-gray-500" size={20} />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <Mail className="text-gray-500" size={20} />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <Lock className="text-gray-500" size={20} />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full p-3 bg-gray-100 border-none rounded-lg text-gray-700"
                                >
                                    <option value="citizen">Citizen</option>
                                    <option value="community_leader">Community Leader</option>
                                    <option value="gov_official">Government Official</option>
                                </select>
                            </div>
                            <button type="submit" c className="signUp-btn">
                                Sign up
                            </button>
                            <p>
                                <span>Already have an account? </span>
                                <b onClick={toggle} className="pointer">
                                    Sign in here
                                </b>
                            </p>
                        </form>
                    </div>
                </div>

                {/* Sign In Form */}
                <div className="col align-items-center flex-col sign-in">
                    <div className="form-wrapper align-items-center">
                        <form onSubmit={handleLoginSubmit} className="form sign-in">
                            <div className="input-group">
                                <Mail className="text-gray-500" size={20} />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={loginData.email}
                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <Lock className="text-gray-500" size={20} />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="submit" className="signIn-btn">
                                Sign in
                            </button>
                            <p>
                                <b>Forgot password?</b>
                            </p>
                            <p>
                                <span>Don&apos;t have an account? </span>
                                <b onClick={toggle} className="pointer">
                                    Sign up here
                                </b>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="row content-row">
                {/* Sign In Content */}
                <div className="col align-items-center flex-col">
                    <div className="text sign-in">
                        <h2>Welcome Back!</h2>
                        <p>Your voice matters in our community</p>
                    </div>
                    <div className="img sign-in">
                        <img
                            // src="https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                            alt=""
                            className="w-96 h-auto rounded-lg shadow-xl"
                        />
                    </div>
                </div>
                {/* Sign Up Content */}
                <div className="col align-items-center flex-col">
                    <div className="img sign-up">
                        <img
                            // src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                            alt=""
                            className="w-96 h-auto rounded-lg shadow-xl"
                        />
                    </div>
                    <div className="text sign-up">
                        <h2>Join with Us</h2>
                        <p>Be part of positive change</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;