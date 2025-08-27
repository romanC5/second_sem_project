// src/Components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user); // 👈 adjust if your state is different

  if (!user) {
    return <Navigate to="/login_Signup" replace />;
  }

  return children;
};

export default ProtectedRoute;
