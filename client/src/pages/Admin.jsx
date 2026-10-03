import { useEffect, useState } from "react";
import api from "../services/api";

export function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await api.get("/admin/users");
        setUsers(response.data.users || []);
      } catch (err) {
        setError(
          err.response?.data?.message || "Unable to load users."
        );
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <section className="admin-page">
      <div className="admin-header">
        <div>
          <span className="eyebrow">Administration</span>
          <h1>Manage Users</h1>
          <p className="muted">
            View and monitor registered students and recruiters.
          </p>
        </div>

        <div className="admin-count-card">
          <strong>{users.length}</strong>
          <span>Total Users</span>
        </div>
      </div>

      {error && <div className="alert error">{error}</div>}

      <div className="card table-wrap admin-table-card">
        {loading ? (
          <div className="empty">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="empty">No users found.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="admin-user">
                      <div className="admin-avatar">
                        {(user.name || "U").charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <strong>{user.name || "Unnamed User"}</strong>
                        <small>{user.email}</small>
                      </div>
                    </div>
                  </td>

                  <td>{user.email}</td>

                  <td>
                    <span className={`badge role-${user.role}`}>
                      {user.role}
                    </span>
                  </td>

                  <td>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState("");

  const loadJobs = async () => {
    try {
      setError("");

      const response = await api.get("/admin/jobs");
      setJobs(response.data.jobs || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load jobs."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const del = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    try {
      setDeleting(id);
      setError("");

      await api.delete(`/jobs/${id}`);

      setJobs((previousJobs) =>
        previousJobs.filter((job) => job._id !== id)
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to delete job."
      );
    } finally {
      setDeleting("");
    }
  };

  return (
    <section className="admin-page">
      <div className="admin-header">
        <div>
          <span className="eyebrow">Administration</span>
          <h1>Manage Jobs</h1>
          <p className="muted">
            Review and manage job postings on the platform.
          </p>
        </div>

        <div className="admin-count-card">
          <strong>{jobs.length}</strong>
          <span>Total Jobs</span>
        </div>
      </div>

      {error && <div className="alert error">{error}</div>}

      <div className="card table-wrap admin-table-card">
        {loading ? (
          <div className="empty">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="empty">No jobs found.</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Job</th>
                <th>Company</th>
                <th>Recruiter</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td>
                    <div className="admin-job">
                      <div className="admin-job-icon">
                        {(job.title || "J").charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <strong>{job.title}</strong>
                        <small>{job.location || "Location not specified"}</small>
                      </div>
                    </div>
                  </td>

                  <td>{job.companyName || "—"}</td>

                  <td>
                    {job.recruiter?.email || "—"}
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-small"
                      onClick={() => del(job._id)}
                      disabled={deleting === job._id}
                    >
                      {deleting === job._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}