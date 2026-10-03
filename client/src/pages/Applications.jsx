import { useEffect, useState } from "react";
import api from "../services/api";

const statuses = [
  "Applied",
  "Shortlisted",
  "Interview",
  "Selected",
  "Rejected",
];

export default function Applications({ manage = false }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await api.get(
        manage ? "/applications/recruiter" : "/applications/my"
      );

      setItems(data.applications || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load applications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [manage]);

  const updateStatus = async (id, value) => {
    setUpdating(id);
    setError("");

    try {
      await api.put(`/applications/${id}/status`, {
        status: value,
      });

      await load();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update application status."
      );
    } finally {
      setUpdating("");
    }
  };

  if (loading) {
    return (
      <div className="applications-loading card">
        <div className="loading-spinner"></div>
        <h3>Loading applications...</h3>
        <p>Please wait while we fetch the latest applications.</p>
      </div>
    );
  }

  return (
    <section className="applications-page">

      {/* Header */}
      <div className="applications-header">
        <div>
          <span className="eyebrow">
            {manage
              ? "Recruiter workspace"
              : "Your career activity"}
          </span>

          <h1>
            {manage
              ? "Manage Applications"
              : "My Applications"}
          </h1>

          <p>
            {manage
              ? "Review candidates and keep application statuses updated."
              : "Track the jobs you have applied for and their current status."}
          </p>
        </div>

        <div className="applications-count">
          <strong>{items.length}</strong>
          <span>
            {manage ? "Applications" : "Applied"}
          </span>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="alert error">
          {error}
        </div>
      )}

      {/* Applications */}
      {items.length > 0 ? (
        <div className="card applications-card">

          <div className="applications-card-header">
            <div>
              <h2>
                {manage
                  ? "Candidate Applications"
                  : "Application History"}
              </h2>

              <p>
                {items.length}{" "}
                {items.length === 1
                  ? "application"
                  : "applications"}{" "}
                found
              </p>
            </div>
          </div>

          <div className="table-wrap">
            <table className="applications-table">
              <thead>
                <tr>
                  <th>
                    {manage ? "Candidate" : "Job"}
                  </th>

                  <th>Company</th>
                  <th>Date</th>
                  <th>Status</th>

                  {manage && <th>Update</th>}
                </tr>
              </thead>

              <tbody>
                {items.map((application) => (
                  <tr key={application._id}>

                    {/* Candidate / Job */}
                    <td>
                      <div className="application-main">

                        <div className="application-avatar">
                          {manage
                            ? application.student?.name
                                ?.charAt(0)
                                ?.toUpperCase() || "S"
                            : application.job?.title
                                ?.charAt(0)
                                ?.toUpperCase() || "J"}
                        </div>

                        <div>
                          <b>
                            {manage
                              ? application.student?.name ||
                                "Unknown candidate"
                              : application.job?.title ||
                                "Unknown job"}
                          </b>

                          <small>
                            {manage
                              ? application.student?.email ||
                                "Email not available"
                              : application.job?.location ||
                                "Location not specified"}
                          </small>
                        </div>

                      </div>
                    </td>

                    {/* Company */}
                    <td>
                      {application.job?.companyName || "—"}
                    </td>

                    {/* Date */}
                    <td>
                      {application.createdAt
                        ? new Date(
                            application.createdAt
                          ).toLocaleDateString()
                        : "—"}
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`status-badge status-${application.status
                          ?.toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {application.status}
                      </span>
                    </td>

                    {/* Recruiter action */}
                    {manage && (
                      <td>
                        <select
                          value={application.status}
                          disabled={updating === application._id}
                          onChange={(e) =>
                            updateStatus(
                              application._id,
                              e.target.value
                            )
                          }
                        >
                          {statuses.map((status) => (
                            <option
                              key={status}
                              value={status}
                            >
                              {status}
                            </option>
                          ))}
                        </select>

                        {updating === application._id && (
                          <small className="updating-text">
                            Updating...
                          </small>
                        )}
                      </td>
                    )}

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="empty card applications-empty">

          <div className="empty-icon">
            {manage ? "👥" : "📄"}
          </div>

          <h3>
            {manage
              ? "No applications yet"
              : "No applications yet"}
          </h3>

          <p>
            {manage
              ? "Applications from candidates will appear here."
              : "Once you apply for a job, your applications will appear here."}
          </p>

        </div>
      )}
    </section>
  );
}