import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      await register(form);

      // Account created successfully.
      // Now send user to login page.
      nav("/login", {
        state: {
          message: "Account created successfully. Please sign in.",
        },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card register-card">

        {/* Header */}
        <div className="auth-header">
          <div className="auth-icon">CC</div>

          <h1>Create your account</h1>

          <p className="muted">
            Start your journey with CareerConnect.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="alert error">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={submit} className="auth-form">

          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

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
              placeholder="Minimum 8 characters"
              minLength="8"
              value={form.password}
              onChange={handleChange}
              required
            />

            <small className="form-hint">
              Use at least 8 characters for your password.
            </small>
          </div>

          {/* Account Type */}
          <div className="form-group">
            <label htmlFor="role">
              Account Type
            </label>

            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="student">
                Student
              </option>

              <option value="recruiter">
                Recruiter
              </option>
            </select>
          </div>

          {/* Role Information */}
          <div className="role-info">
            {form.role === "student" ? (
              <>
                <strong>🎓 Student Account</strong>

                <span>
                  Create your profile, explore jobs and
                  track applications.
                </span>
              </>
            ) : (
              <>
                <strong>🏢 Recruiter Account</strong>

                <span>
                  Create job postings and manage candidate
                  applications.
                </span>
              </>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn full"
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Create Account"}
          </button>
        </form>

        {/* Login */}
        <div className="auth-footer">
          <span className="muted">
            Already have an account?
          </span>{" "}

          <Link to="/login">
            Sign in
          </Link>
        </div>

      </div>
    </div>
  );
}