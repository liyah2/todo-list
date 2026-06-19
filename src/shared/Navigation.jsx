import { NavLink } from "react-router";
import { useAuth } from "../reducers/contexts/AuthContext";
import styles from "../App.module.css";

export default function Navigation() {
  const { isAuthenticated } = useAuth();

  const navLinkStyle = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: isActive ? "underline" : "none",
  });

  return (
    <nav>
      <ul className={styles["nav-list"]}>
        <li>
          <NavLink to="/about" style={navLinkStyle}>
            About
          </NavLink>
        </li>

        {isAuthenticated ? (
          <>
            <li>
              <NavLink to="/todos" style={navLinkStyle}>
                Todos
              </NavLink>
            </li>

            <li>
              <NavLink to="/profile" style={navLinkStyle}>
                Profile
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login" style={navLinkStyle}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
