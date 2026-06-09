import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../reducers/contexts/AuthContext";
import Logon from "../features/Logon";

export default function LoginPage() {
  const { iseAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/todos";

  useEffect(() => {
    if (iseAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [iseAuthenticated, navigate, from]);
  return <Logon />;
}
