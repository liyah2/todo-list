import { useAuth } from "../reducers/contexts/AuthContext";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header>
      <h1>Todo List</h1>

      {isAuthenticated && (
        <button type="button" onClick={logout}>
          Log Out
        </button>
      )}
    </header>
  );
}
