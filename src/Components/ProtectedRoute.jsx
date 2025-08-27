// src/Components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Get your auth state (adjust if your slice name is different)
  const authState = useSelector((state) => state.auth);

  console.log("🔎 Auth state:", authState); // Debug what’s inside

  // Case 1: If your slice has isLoggedIn
  if (authState && authState.isLoggedIn === false) {
    return <Navigate to="/login_Signup" replace />;
  }

  // Case 2: If your slice has a token
  if (authState && !authState.token) {
    return <Navigate to="/login_Signup" replace />;
  }

  return children;
};

export default ProtectedRoute;
