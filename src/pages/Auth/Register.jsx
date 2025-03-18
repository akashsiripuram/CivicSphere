import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../components/redux/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "citizen",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData))
      .then((data) => {
        if (data?.payload?.success) {
          toast.success(data.payload.message || "Registration successful!");
          navigate("/auth/login");
        } else {
          toast.error(data?.payload?.message || "Invalid username or password.");
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
      });
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "citizen",
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
        <h2 className="text-2xl font-semibold text-center mb-6 mt-12">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">👤</span>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 pl-10 bg-[#1F2430] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A3EA1]"
              required
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">✉️</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 pl-10 bg-[#1F2430] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A3EA1]"
              required
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">🔒</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 pl-10 bg-[#1F2430] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A3EA1]"
              required
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">🏛️</span>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 pl-10 bg-[#1F2430] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A3EA1]"
            >
              <option value="citizen">Citizen</option>
              <option value="community_leader">Community Leader</option>
              <option value="gov_official">Government Official</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#5A3EA1] to-[#8133C6] text-white py-3 rounded-md hover:opacity-90 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
