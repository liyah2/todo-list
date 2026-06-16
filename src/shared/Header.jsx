import { useNavigate } from "react-router";
import { useAuth } from "../reducers/contexts/AuthContext";
import Navigation from "./Navigation";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header className="header">
      <h1 className="app-title">Todo List</h1>

      <Navigation />

      {isAuthenticated && (
        <button className="logout-btn" type="button" onClick={handleLogout}>
          Log Out
        </button>
      )}
    </header>
  );
}
