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
      <div className="title-box">
        <h1 className="app-title">Todo List</h1>
      </div>

      <div className="header-actions">
        <Navigation />

        {isAuthenticated && (
          <button className="logout-btn" type="button" onClick={handleLogout}>
            Log Out
          </button>
        )}
      </div>
    </header>
  );
}
