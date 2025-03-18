import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

// eslint-disable-next-line react/prop-types
function CheckAuth({ isAuthenticated, isLoading, children }) {
  const location = useLocation();

  // Wait until loading is complete
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  // Publicly accessible routes (e.g., homepage)
  if (location.pathname === "/") {
    return children;
  }

  // Authentication-related routes (e.g., login, register)
  if (location.pathname.startsWith("/auth")) {
    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return children;
  }

  // Protected routes (e.g., dashboard)
  if (location.pathname.startsWith("/user")) {
    if (isAuthenticated) {
      return children;
    } else {
      toast.error("You are not authenticated");
      return <Navigate to="/auth/login" replace />;
    }
  }

  // Default fallback for undefined routes
  return <Navigate to="/" replace />;
}

export default CheckAuth;