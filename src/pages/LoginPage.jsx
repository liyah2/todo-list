import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../reducers/contexts/AuthContext";
import Logon from "../features/Logon";

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/todos";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);
  return <Logon />;
}
