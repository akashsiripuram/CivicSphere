import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { logoutUser } from "../redux/authSlice";

function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logoutUser())
      .then((data) => {
        if (data?.payload?.success) {
          toast.success(data.payload.message || "Logout successful!");
          navigate("/");
        } else {
          toast.error(
            data?.payload?.message || "Error."
          ); 
        }
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong. Please try again."
        ); // Handle unexpected errors
      });
  };
  return (
    <div className="bg-purple-300 p-4 flex flex-row justify-between">
      <h1>CivicSphere</h1>
      <ul className="flex flex-row justify-between space-x-3">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        {!isAuthenticated ? (
          <div className="flex flex-row space-x-3">
            <Link to={"/login"}>
              <li className="cursor-pointer">Login</li>
            </Link>
            <Link to={"/register"}>
              <li className="cursor-pointer">Register</li>
            </Link>
          </div>
        ) : (
          <li
            className="cursor-pointer"
            onClick={handleLogout}>
            Logout
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
