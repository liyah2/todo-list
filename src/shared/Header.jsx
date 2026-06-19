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
      <div className={styles["title-box"]}>
        <h1 className={styles["app-title"]}>Todo List</h1>
      </div>

      <div className={styles["header-actions"]}>
        <Navigation />

        {isAuthenticated && (
          <button
            className={styles["logout-btn"]}
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
