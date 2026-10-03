import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
  };

  return (
    <header className="navbar">
      <Link className="brand" to="/" onClick={closeMenu}>
        CareerConnect
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={menuOpen ? "nav-open" : ""}>
        <Link to="/jobs" onClick={closeMenu}>
          Jobs
        </Link>

        {user && (
          <Link to="/dashboard" onClick={closeMenu}>
            Dashboard
          </Link>
        )}

        {user && (
          <button className="link-btn" onClick={handleLogout}>
            Logout
          </button>
        )}

        {!user && (
          <Link
            className="btn btn-small"
            to="/login"
            onClick={closeMenu}
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
