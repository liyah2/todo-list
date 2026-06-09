import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../reducers/contexts/AuthContext";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/todos", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  } [isAuthenticated, navigate]);

  return <p>Redirecting...</p>
}
