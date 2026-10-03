import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  const companyName =
    job.companyName || job.company || "Company";

  const companyInitial = companyName
    .charAt(0)
    .toUpperCase();

  return (
    <article className="card job-card">

      {/* Top Section */}
      <div className="job-top">

        <div className="job-company-info">

          {/* Company Logo */}
          <div className="company-logo">
            {companyInitial}
          </div>

          <div className="job-title-area">
            <h3>{job.title || "Software Engineer"}</h3>

            <p className="muted">
              {companyName}
            </p>

            <p className="job-location">
              📍 {job.location || "Location not specified"}
            </p>
          </div>

        </div>

        {/* Job Type */}
        <span className="badge">
          {job.jobType || "Full-time"}
        </span>

      </div>


      {/* Salary */}
      {job.salary && (
        <div className="job-salary">
          <span>💰</span>
          <strong>{job.salary}</strong>
        </div>
      )}


      {/* Description */}
      <p className="job-description">
        {job.description?.slice(0, 150) ||
          "No job description available."}

        {job.description?.length > 150
          ? "..."
          : ""}
      </p>


      {/* Skills */}
      {job.skills?.length > 0 && (
        <div className="tags">

          {job.skills
            .slice(0, 4)
            .map((skill, index) => (
              <span key={`${skill}-${index}`}>
                {skill}
              </span>
            ))}

          {job.skills.length > 4 && (
            <span>
              +{job.skills.length - 4} more
            </span>
          )}

        </div>
      )}


      {/* Bottom Section */}
      <div className="job-bottom">

        <div className="job-meta">

          <span>
            💼 {job.experience || "Any experience"}
          </span>

        </div>

        <Link
          className="btn btn-small"
          to={`/jobs/${job._id}`}
        >
          View Details →
        </Link>

      </div>

    </article>
  );
}