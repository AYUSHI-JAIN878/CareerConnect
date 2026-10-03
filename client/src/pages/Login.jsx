import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Success message from Register page
  const successMessage = loc.state?.message || "";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(form);

      // Redirect after successful login
      nav(loc.state?.from?.pathname || "/dashboard", {
        replace: true,
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card login-card">

        {/* Header */}
        <div className="auth-header">
          <div className="auth-icon">CC</div>

          <h1>Welcome back</h1>

          <p className="muted">
            Sign in to continue to CareerConnect.
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="alert success">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="alert error">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={submit} className="auth-form">

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="btn full"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Register */}
        <div className="auth-footer">
          <span className="muted">
            New to CareerConnect?
          </span>{" "}

          <Link to="/register">
            Create an account
          </Link>
        </div>

      </div>
    </div>
  );
}