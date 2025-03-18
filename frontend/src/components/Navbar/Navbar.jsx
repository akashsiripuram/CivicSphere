import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { logoutUser } from "../redux/authSlice";
import { Building2, TreePine,Siren,Locate,Users2, Lightbulb, LogIn, UserPlus, LogOut } from "lucide-react";
import React from "react";

function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProjectsOpen, setIsProjectsOpen] = React.useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logoutUser())
      .then((data) => {
        if (data?.payload?.success) {
          toast.success(data.payload.message || "Logout successful!");
          navigate("/");
        } else {
          toast.error(data?.payload?.message || "Error.");
        }
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ||
          "Something went wrong. Please try again."
        );
      });
  };

  return (
    <div className=" bg-gradient-to-r from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to={'/'} className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              CivicSphere
            </span>
          </Link>

          <nav className="flex items-center">
            <ul className="flex space-x-2">
              <li className="relative">
                <Link to={'/projects'}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-emerald-50 transition-colors"
                  
                >
                  
                  <TreePine className="h-4 w-4" />
                  <span>Projects</span>
                  </Link>
           
                
              </li>
              <li>
                <Link
                  to="/issues"
                  className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-emerald-50 transition-colors"
                >
                  <Users2 className="h-4 w-4" />
                  <span>Issues</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-emerald-50 transition-colors"
                >
                  <Lightbulb className="h-4 w-4" />
                  <span>Resources</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/emergency"
                  className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-emerald-50 transition-colors"
                >
                  <Siren className="h-4 w-4" />
                  <span>Emergencies</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/regional-planning"
                  className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-emerald-50 transition-colors"
                >
                  <Locate className="h-4 w-4" />
                  <span>Regional Planning</span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/auth/login"
                  className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-emerald-50 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/auth/register"
                  className="flex items-center space-x-2 px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </>
            ) : (
              <div className="flex flex-row">
                <Link to={'/dashboard'}
                 
                  className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-emerald-50 transition-colors"
                >
                  
                  <span className="rounded-full h-[35px] w-[35px] bg-white flex flex-row items-center justify-center">P</span>
                </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
