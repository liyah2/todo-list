import { useAuth } from "../reducers/contexts/AuthContext";
import Navigation from "./Navigation";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header>
      <h1>Todo List</h1>

      <Navigation />

      {isAuthenticated && (
        <button type="button" onClick={logout}>
          Log Out
        </button>
      )}
    </header>
  );
}
