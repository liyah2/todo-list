import { useState } from "react";
import { useAuth } from "../reducers/contexts/AuthContext";

export default function Logon() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);
  const { login } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoggingOn(true);
    setAuthError("");

    try {
      const result = await login(email, password);

      if (!result.success) {
        setAuthError(result.error);
      }
    } catch (error) {
      setAuthError(`Error: ${error.name} | ${error.message}`);
    } finally {
      setIsLoggingOn(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {authError && <p>{authError}</p>}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <button type="submit" disabled={isLoggingOn}>
        {isLoggingOn ? "Logging in..." : "Log On"}
      </button>
    </form>
  );
}
