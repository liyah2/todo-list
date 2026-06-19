import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../reducers/contexts/AuthContext";
import { useEffect } from "react";

export default function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: location },
        replace: true,
      });
    }
  }, [isAuthenticated, location, navigate]);

  if (!isAuthenticated) {
    return <p>Redirecting to login...</p>;
  }
  return children;
}
