// ProtectedRoute.jsx

import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!location.state?.fromHome) {
    return <Navigate to="/home" replace />;
  }

  return children;
}