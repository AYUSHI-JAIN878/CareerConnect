import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const demoJobs = [
  {
    _id: "demo-tcs-001",
    title: "Software Engineer",
    company: "TCS",
    location: "Bengaluru, India",
    skills: ["Java", "React", "SQL"],
    experience: "0-2 years",
    jobType: "Full-time",
    salary: "₹4 - 7 LPA",
    openings: 12,
    description:
      "Work on scalable software applications and contribute to modern technology projects. You will collaborate with development teams to design, build, test and maintain reliable software solutions.",
  },
  {
    _id: "demo-infosys-002",
    title: "Systems Engineer",
    company: "Infosys",
    location: "Pune, India",
    skills: ["Java", "Python", "SQL"],
    experience: "0-2 years",
    jobType: "Full-time",
    salary: "₹4 - 6.5 LPA",
    openings: 15,
    description:
      "Build, test and maintain enterprise software solutions while working with technology teams. The role provides opportunities to work on different technologies and business applications.",
  },
  {
    _id: "demo-accenture-003",
    title: "Associate Software Engineer",
    company: "Accenture",
    location: "Hyderabad, India",
    skills: ["JavaScript", "React", "Node.js"],
    experience: "0-2 years",
    jobType: "Full-time",
    salary: "₹4.5 - 8 LPA",
    openings: 10,
    description:
      "Develop digital solutions and collaborate with teams to deliver client-focused applications. You will work with modern development tools and contribute to application development projects.",
  },
  {
    _id: "demo-amazon-004",
    title: "Software Development Engineer",
    company: "Amazon",
    location: "Bengaluru, India",
    skills: ["C++", "Java", "AWS"],
    experience: "0-2 years",
    jobType: "Full-time",
    salary: "₹8 - 15 LPA",
    openings: 8,
    description:
      "Design and develop reliable software services used by customers. Work with engineers to solve technical problems and build scalable systems.",
  },
  {
    _id: "demo-microsoft-005",
    title: "Software Engineer",
    company: "Microsoft",
    location: "Hyderabad, India",
    skills: ["C++", "Azure", "React"],
    experience: "0-2 years",
    jobType: "Full-time",
    salary: "₹10 - 18 LPA",
    openings: 6,
    description:
      "Build innovative software products and work with engineering teams on large-scale systems. Contribute to product development, testing and continuous improvement.",
  },
  {
    _id: "demo-google-006",
    title: "Software Engineer",
    company: "Google",
    location: "Bengaluru, India",
    skills: ["C++", "Python", "Data Structures"],
    experience: "0-2 years",
    jobType: "Full-time",
    salary: "₹12 - 22 LPA",
    openings: 5,
    description:
      "Solve complex engineering problems and develop reliable products at scale. Work with engineers across teams to create efficient and user-focused software.",
  },
  {
    _id: "demo-deloitte-007",
    title: "Technology Analyst",
    company: "Deloitte",
    location: "Gurugram, India",
    skills: ["Python", "SQL", "Cloud"],
    experience: "0-2 years",
    jobType: "Full-time",
    salary: "₹5 - 9 LPA",
    openings: 9,
    description:
      "Work on technology consulting projects and develop solutions for business requirements. Collaborate with teams to analyze problems and deliver technology solutions.",
  },
  {
    _id: "demo-ibm-008",
    title: "Application Developer",
    company: "IBM",
    location: "Noida, India",
    skills: ["Java", "Spring Boot", "SQL"],
    experience: "0-2 years",
    jobType: "Full-time",
    salary: "₹5 - 9 LPA",
    openings: 7,
    description:
      "Develop enterprise applications and contribute to modern cloud-based technology solutions. Participate in development, testing and application improvement activities.",
  },
  {
    _id: "demo-wipro-009",
    title: "Project Engineer",
    company: "Wipro",
    location: "Bengaluru, India",
    skills: ["Java", "Python", "MySQL"],
    experience: "0-1 years",
    jobType: "Full-time",
    salary: "₹3.5 - 6 LPA",
    openings: 18,
    description:
      "Support software development projects and work with cross-functional technology teams. Assist in building, testing and maintaining software applications.",
  },
  {
    _id: "demo-cognizant-010",
    title: "Programmer Analyst",
    company: "Cognizant",
    location: "Chennai, India",
    skills: ["JavaScript", "SQL", "React"],
    experience: "0-2 years",
    jobType: "Full-time",
    salary: "₹4 - 7 LPA",
    openings: 14,
    description:
      "Develop software applications and participate in analysis, development and testing activities. Work with team members to deliver reliable technology solutions.",
  },
  {
    _id: "demo-capgemini-011",
    title: "Software Engineer",
    company: "Capgemini",
    location: "Mumbai, India",
    skills: ["React", "Node.js", "MongoDB"],
    experience: "0-2 years",
    jobType: "Full-time",
    salary: "₹4.5 - 8 LPA",
    openings: 11,
    description:
      "Build web applications and work with modern full-stack technologies. Collaborate with development teams to create maintainable and scalable applications.",
  },
  {
    _id: "demo-techmahindra-012",
    title: "Associate Software Engineer",
    company: "Tech Mahindra",
    location: "Pune, India",
    skills: ["C++", "Java", "SQL"],
    experience: "0-1 years",
    jobType: "Full-time",
    salary: "₹3.5 - 6 LPA",
    openings: 13,
    description:
      "Contribute to software development projects and solve technical problems using modern tools. Work with teams to develop and maintain software solutions.",
  },
];

export default function JobDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [job, setJob] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [cover, setCover] = useState("");
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      setLoading(true);
      setMessage("");

      // Demo job
      if (id.startsWith("demo-")) {
        const demoJob = demoJobs.find(
          (item) => item._id === id
        );

        if (demoJob) {
          setJob(demoJob);
        } else {
          setMessage("Job not found.");
        }

        setLoading(false);
        return;
      }

      // Real backend job
      try {
        const { data } = await api.get(`/jobs/${id}`);
        setJob(data.job);
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
            "Job not found."
        );
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  const apply = async () => {
    // Demo jobs don't exist in backend
    if (id.startsWith("demo-")) {
      setMessageType("success");
      setMessage(
        "This is a demo job listing. Application submission will be available for live jobs."
      );
      return;
    }

    setApplying(true);
    setMessage("");
    setMessageType("success");

    try {
      await api.post(`/jobs/${id}/apply`, {
        coverLetter: cover,
      });

      setMessage(
        "Application submitted successfully!"
      );

      setCover("");
    } catch (error) {
      setMessageType("error");

      setMessage(
        error.response?.data?.message ||
          "Application failed. Please try again."
      );
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="job-details-loading card">
        <div className="loading-spinner"></div>

        <h3>
          Loading job details...
        </h3>

        <p>
          Please wait while we fetch the opportunity.
        </p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="empty card job-not-found">
        <div className="empty-icon">
          🔎
        </div>

        <h3>
          Job not found
        </h3>

        <p>
          {message ||
            "This job may have been removed."}
        </p>

        <Link
          className="btn"
          to="/jobs"
        >
          Browse Jobs
        </Link>
      </div>
    );
  }

  const companyName =
    job.companyName ||
    job.company ||
    "Company";

  const companyInitial =
    companyName
      .charAt(0)
      .toUpperCase();

  return (
    <section className="job-details-page">

      {/* Back */}
      <Link
        to="/jobs"
        className="back-link"
      >
        ← Back to Jobs
      </Link>


      {/* Job Header */}
      <div className="card job-detail-header">

        <div className="job-detail-company">

          <div className="detail-company-logo">
            {companyInitial}
          </div>

          <div>
            <p className="detail-company-name">
              {companyName}
            </p>

            <p className="muted">
              {job.location ||
                "Location not specified"}
            </p>
          </div>

        </div>

        <span className="badge">
          {job.jobType ||
            "Full-time"}
        </span>

        <h1>
          {job.title}
        </h1>

        <div className="job-detail-meta">

          <span>
            📍 {job.location ||
              "Not specified"}
          </span>

          <span>
            💼 {job.experience ||
              "Any experience"}
          </span>

          <span>
            👥 {job.openings ||
              "Multiple"} openings
          </span>

        </div>

      </div>


      <div className="job-detail-layout">

        {/* =========================
            MAIN CONTENT
        ========================= */}

        <div className="job-detail-main">

          {/* About */}
          <div className="card detail-section">

            <h2>
              About the role
            </h2>

            <p className="pre">
              {job.description ||
                "No description provided."}
            </p>

          </div>


          {/* Skills */}
          {job.skills?.length > 0 && (
            <div className="card detail-section">

              <h2>
                Skills required
              </h2>

              <div className="tags detail-tags">

                {job.skills.map(
                  (skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                    >
                      {skill}
                    </span>
                  )
                )}

              </div>

            </div>
          )}


          {/* Job Information */}
          <div className="card detail-section">

            <h2>
              Job information
            </h2>

            <div className="detail-grid">

              <div className="detail-info-box">
                <span>
                  Salary
                </span>

                <strong>
                  {job.salary ||
                    (job.salaryMin ||
                    job.salaryMax
                      ? `${job.salaryMin || "—"} - ${
                          job.salaryMax || "—"
                        }`
                      : "Not specified")}
                </strong>
              </div>


              <div className="detail-info-box">
                <span>
                  Job type
                </span>

                <strong>
                  {job.jobType ||
                    "Full-time"}
                </strong>
              </div>


              <div className="detail-info-box">
                <span>
                  Experience
                </span>

                <strong>
                  {job.experience ||
                    "Any experience"}
                </strong>
              </div>


              <div className="detail-info-box">
                <span>
                  Openings
                </span>

                <strong>
                  {job.openings ||
                    "Multiple"}
                </strong>
              </div>

            </div>

          </div>

        </div>


        {/* =========================
            APPLY SIDEBAR
        ========================= */}

        <aside className="job-apply-sidebar">

          {/* Student */}
          {user?.role === "student" && (
            <div className="card apply-card">

              <span className="eyebrow">
                Application
              </span>

              <h2>
                Interested in this role?
              </h2>

              <p className="muted">
                Submit your application and
                take the next step in your
                career journey.
              </p>

              <label htmlFor="coverLetter">
                Cover Letter
              </label>

              <textarea
                id="coverLetter"
                placeholder="Write an optional cover letter..."
                value={cover}
                onChange={(e) =>
                  setCover(e.target.value)
                }
                rows="7"
              />


              {message && (
                <div
                  className={`alert ${
                    messageType === "error"
                      ? "error"
                      : "success"
                  }`}
                >
                  {message}
                </div>
              )}


              <button
                className="btn full"
                onClick={apply}
                disabled={applying}
              >
                {applying
                  ? "Submitting..."
                  : "Apply Now"}
              </button>

            </div>
          )}


          {/* Not logged in */}
          {!user && (
            <div className="card apply-card">

              <span className="eyebrow">
                Ready to apply?
              </span>

              <h2>
                Sign in to continue
              </h2>

              <p className="muted">
                Create an account or sign in
                as a student to apply for
                this opportunity.
              </p>

              <Link
                className="btn full"
                to="/login"
              >
                Sign In
              </Link>

              <Link
                className="secondary-action"
                to="/register"
              >
                Create an account →
              </Link>

            </div>
          )}


          {/* Recruiter */}
          {user?.role === "recruiter" && (
            <div className="card apply-card">

              <span className="eyebrow">
                Recruiter
              </span>

              <h2>
                Job opportunity
              </h2>

              <p className="muted">
                Recruiter accounts cannot
                apply to jobs.
              </p>

              <Link
                className="btn full"
                to="/dashboard"
              >
                Go to Dashboard
              </Link>

            </div>
          )}


          {/* Admin */}
          {user?.role === "admin" && (
            <div className="card apply-card">

              <span className="eyebrow">
                Admin
              </span>

              <h2>
                Job listing
              </h2>

              <p className="muted">
                Admin accounts can manage
                jobs from the admin dashboard.
              </p>

              <Link
                className="btn full"
                to="/dashboard"
              >
                Go to Dashboard
              </Link>

            </div>
          )}

        </aside>

      </div>

    </section>
  );
}