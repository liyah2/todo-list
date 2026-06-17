import { useNavigate } from "react-router";
import { useAuth } from "../reducers/contexts/AuthContext";
import Navigation from "./Navigation";
import styles from "../App.module.css";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header className={styles.header}>
      <div className={styles.titleBox}>
        <h1 className={styles.appTitle}>Todo List</h1>
      </div>

      <div className={styles.headerActions}>
        <Navigation />

        {isAuthenticated && (
          <button
            className={styles.logoutBtn}
            type="button"
            onClick={handleLogout}
          >
            Log Out
          </button>
        )}
      </div>
    </header>
  );
}
