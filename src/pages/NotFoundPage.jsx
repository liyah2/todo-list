import { Link, useLocation } from "react-router";

export default function NotFoundPage() {
  const location = useLocation();

  return (
    <div>
      <h2>Page Not Found</h2>
      <p>No page exists for: {location.pathname}</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}
