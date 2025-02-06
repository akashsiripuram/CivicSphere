import { useState } from "react";
import {useDispatch} from "react-redux";
import { registerUser } from "../../components/redux/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Register= () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "citizen",
  });
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(registerUser(formData))
    .then((data) => {
        if (data?.payload?.success) {
        
          toast.success(data.payload.message || "Registration successful!");
          navigate("/auth/login");
        } else {
            console.log(data);
          toast.error(
            data?.payload?.message || "Invalid username or password."
          );
        }
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      })
    setFormData({
        name: "",
        email: "",
        password: "",
        role: "citizen",
      })
     
    };
  
  

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4">User Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={formData.name} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
          required 
        />
        
        {/* Email */}
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
          required 
        />

        {/* Password */}
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
          required 
        />

        {/* Role Selection */}
        <select 
          name="role" 
          value={formData.role} 
          onChange={handleChange} 
          className="w-full p-2 border rounded"
        >
          <option value="citizen">Citizen</option>
          <option value="community_leader">Community Leader</option>
          <option value="gov_official">Government Official</option>
        </select>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
