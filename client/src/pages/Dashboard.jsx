import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import StatCard from "../components/StatCard";
import JobCard from "../components/JobCard";

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");

    if (user.role === "student") {
      Promise.all([
        api.get("/applications/my"),
        api.get("/jobs"),
      ])
        .then(([applicationsResponse, jobsResponse]) => {
          setData({
            applications: applicationsResponse.data.applications,
            jobs: jobsResponse.data.jobs,
          });
        })
        .catch(() => {
          setError("Unable to load dashboard data.");
        });
    } else if (user.role === "recruiter") {
      api
        .get("/applications/recruiter")
        .then((response) => {
          setData({
            applications: response.data.applications,
          });
        })
        .catch(() => {
          setError("Unable to load recruiter data.");
        });
    } else {
      api
        .get("/admin/statistics")
        .then((response) => {
          setData(response.data.statistics);
        })
        .catch(() => {
          setError("Unable to load admin statistics.");
        });
    }
  }, [user.role]);

  if (!data && !error) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert error">{error}</div>;
  }

  /* =========================
     STUDENT DASHBOARD
  ========================= */

  if (user.role === "student") {
    const applications = data.applications || [];
    const jobs = data.jobs || [];

    const shortlisted = applications.filter(
      (application) => application.status === "Shortlisted"
    ).length;

    const selected = applications.filter(
      (application) => application.status === "Selected"
    ).length;

    return (
      <div className="dashboard-page">

        {/* Welcome Header */}
        <div className="dashboard-hero">
          <div>
            <span className="eyebrow">Student Dashboard</span>

            <h1>
              Welcome back, {user.name?.split(" ")[0]} 👋
            </h1>

            <p>
              Keep track of your applications and discover your next
              career opportunity.
            </p>
          </div>

          <Link className="btn" to="/jobs">
            Explore Jobs
          </Link>
        </div>

        {/* Stats */}
        <div className="stats dashboard-stats">
          <StatCard
            label="Applications"
            value={applications.length}
          />

          <StatCard
            label="Shortlisted"
            value={shortlisted}
          />

          <StatCard
            label="Selected"
            value={selected}
          />
        </div>

        {/* Quick Actions */}
        <section className="dashboard-section">
          <div className="section-head">
            <div>
              <span className="eyebrow">Quick actions</span>
              <h2>Manage your career</h2>
            </div>
          </div>

          <div className="quick-actions">

            <Link to="/profile" className="quick-action-card">
              <div className="quick-icon">👤</div>
              <div>
                <h3>Complete Profile</h3>
                <p>
                  Add your skills, education, projects and experience.
                </p>
              </div>
              <span>→</span>
            </Link>

            <Link to="/jobs" className="quick-action-card">
              <div className="quick-icon">💼</div>
              <div>
                <h3>Find Jobs</h3>
                <p>
                  Explore available opportunities and apply.
                </p>
              </div>
              <span>→</span>
            </Link>

            <Link to="/applications" className="quick-action-card">
              <div className="quick-icon">📋</div>
              <div>
                <h3>My Applications</h3>
                <p>
                  Track the current status of your applications.
                </p>
              </div>
              <span>→</span>
            </Link>

          </div>
        </section>

        {/* Recommended Jobs */}
        <section className="dashboard-section">
          <div className="section-head">
            <div>
              <span className="eyebrow">Opportunities</span>
              <h2>Latest jobs</h2>
            </div>

            <Link to="/jobs">View all →</Link>
          </div>

          {jobs.length > 0 ? (
            <div className="grid">
              {jobs.slice(0, 3).map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <div className="empty dashboard-empty">
              <h3>No jobs available</h3>
              <p>New opportunities will appear here.</p>
            </div>
          )}
        </section>

      </div>
    );
  }

  /* =========================
     RECRUITER DASHBOARD
  ========================= */

  if (user.role === "recruiter") {
    const applications = data.applications || [];

    const shortlisted = applications.filter(
      (application) => application.status === "Shortlisted"
    ).length;

    const interviews = applications.filter(
      (application) => application.status === "Interview"
    ).length;

    return (
      <div className="dashboard-page">

        {/* Header */}
        <div className="dashboard-hero">
          <div>
            <span className="eyebrow">Recruiter Dashboard</span>

            <h1>Hiring overview</h1>

            <p>
              Manage applicants and find the right candidates for your
              organization.
            </p>
          </div>

          <Link className="btn" to="/jobs/create">
            + Post a Job
          </Link>
        </div>

        {/* Stats */}
        <div className="stats dashboard-stats">

          <StatCard
            label="Total Applicants"
            value={applications.length}
          />

          <StatCard
            label="Shortlisted"
            value={shortlisted}
          />

          <StatCard
            label="Interviews"
            value={interviews}
          />

        </div>

        {/* Recruiter Actions */}
        <section className="dashboard-section">

          <div className="section-head">
            <div>
              <span className="eyebrow">Recruitment tools</span>
              <h2>Manage hiring</h2>
            </div>
          </div>

          <div className="quick-actions">

            <Link to="/jobs/create" className="quick-action-card">
              <div className="quick-icon">➕</div>
              <div>
                <h3>Create Job Posting</h3>
                <p>
                  Publish a new opportunity for students.
                </p>
              </div>
              <span>→</span>
            </Link>

            <Link to="/applications/manage" className="quick-action-card">
              <div className="quick-icon">👥</div>
              <div>
                <h3>Manage Applications</h3>
                <p>
                  Review candidates and update application status.
                </p>
              </div>
              <span>→</span>
            </Link>

            <Link to="/recruiter/profile" className="quick-action-card">
              <div className="quick-icon">🏢</div>
              <div>
                <h3>Company Profile</h3>
                <p>
                  Keep your recruiter and company information updated.
                </p>
              </div>
              <span>→</span>
            </Link>

          </div>

        </section>

        {/* Applications Summary */}
        <section className="dashboard-section">

          <div className="section-head">
            <div>
              <span className="eyebrow">Candidate activity</span>
              <h2>Recent applications</h2>
            </div>

            <Link to="/applications/manage">
              View all →
            </Link>
          </div>

          {applications.length > 0 ? (
            <div className="application-preview">

              {applications.slice(0, 5).map((application) => (
                <div
                  className="application-preview-row"
                  key={application._id}
                >
                  <div>
                    <strong>
                      {application.student?.name || "Candidate"}
                    </strong>

                    <span>
                      {application.job?.title || "Job application"}
                    </span>
                  </div>

                  <span
                    className={`status-badge status-${application.status
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {application.status}
                  </span>
                </div>
              ))}

            </div>
          ) : (
            <div className="empty dashboard-empty">
              <h3>No applications yet</h3>
              <p>Candidate applications will appear here.</p>
            </div>
          )}

        </section>

      </div>
    );
  }

  /* =========================
     ADMIN DASHBOARD
  ========================= */

  return (
    <div className="dashboard-page">

      <div className="dashboard-hero">
        <div>
          <span className="eyebrow">Admin Dashboard</span>

          <h1>Portal overview</h1>

          <p>
            Monitor users, jobs and application activity across the
            placement portal.
          </p>
        </div>
      </div>

      <div className="stats dashboard-stats">

        <StatCard
          label="Students"
          value={data.students}
        />

        <StatCard
          label="Recruiters"
          value={data.recruiters}
        />

        <StatCard
          label="Jobs"
          value={data.jobs}
        />

        <StatCard
          label="Applications"
          value={data.applications}
        />

      </div>

      <section className="dashboard-section">

        <div className="section-head">
          <div>
            <span className="eyebrow">Administration</span>
            <h2>Portal management</h2>
          </div>
        </div>

        <div className="quick-actions">

          <Link to="/admin/users" className="quick-action-card">
            <div className="quick-icon">👥</div>
            <div>
              <h3>Manage Users</h3>
              <p>
                View and manage registered students and recruiters.
              </p>
            </div>
            <span>→</span>
          </Link>

          <Link to="/admin/jobs" className="quick-action-card">
            <div className="quick-icon">💼</div>
            <div>
              <h3>Manage Jobs</h3>
              <p>
                Review job postings across the platform.
              </p>
            </div>
            <span>→</span>
          </Link>

        </div>

      </section>

    </div>
  );
}