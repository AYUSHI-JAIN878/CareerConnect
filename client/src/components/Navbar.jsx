import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="navbar">
      <Link className="brand" to="/">CareerConnect</Link>
      <nav>
        <Link to="/jobs">Jobs</Link>
        {user && <Link to="/dashboard">Dashboard</Link>}
        {user && <button className="link-btn" onClick={logout}>Logout</button>}
        {!user && <Link className="btn btn-small" to="/login">Login</Link>}
      </nav>
    </header>
  );
}
