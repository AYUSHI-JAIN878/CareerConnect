import { Link } from "react-router-dom";

export default function Landing() {
  const companies = [
    { name: "TCS", type: "IT Services" },
    { name: "Infosys", type: "Technology" },
    { name: "Accenture", type: "Consulting & Technology" },
    { name: "Wipro", type: "IT Services" },
    { name: "Deloitte", type: "Consulting" },
    { name: "Microsoft", type: "Technology" },
  ];

  const features = [
    {
      icon: "🎓",
      title: "Build Your Profile",
      text: "Create a complete professional profile with skills, education, projects and certifications.",
    },
    {
      icon: "💼",
      title: "Discover Jobs",
      text: "Search and explore opportunities based on your skills, role and career interests.",
    },
    {
      icon: "📄",
      title: "Apply Easily",
      text: "Apply for suitable positions and keep your applications organized in one place.",
    },
    {
      icon: "📊",
      title: "Track Applications",
      text: "Stay updated with application progress from Applied to Shortlisted, Interview and Selection.",
    },
  ];

  return (
    <div className="landing-page">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">CAMPUS PLACEMENT PLATFORM</span>

          <h1>
            Your career journey
            <br />
            starts <span>here.</span>
          </h1>

          <p>
            CareerConnect connects students with opportunities and helps
            recruiters discover talented candidates through one professional
            placement platform.
          </p>

          <div className="hero-actions">
            <Link className="btn" to="/jobs">
              Explore Jobs →
            </Link>

            <Link className="btn btn-outline" to="/register">
              Create Account
            </Link>
          </div>

          <div className="hero-trust">
            <span>✓ Student Profiles</span>
            <span>✓ Job Applications</span>
            <span>✓ Recruiter Portal</span>
          </div>
        </div>

        {/* HERO DASHBOARD CARD */}
        <div className="hero-visual">
          <div className="dashboard-preview">
            <div className="preview-top">
              <div>
                <small>PLACEMENT DASHBOARD</small>
                <h3>Career Overview</h3>
              </div>
              <span className="status-dot">●</span>
            </div>

            <div className="preview-stats">
              <div>
                <strong>24</strong>
                <span>Jobs Found</span>
              </div>

              <div>
                <strong>08</strong>
                <span>Applications</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Shortlisted</span>
              </div>
            </div>

            <div className="preview-job">
              <div className="company-icon">T</div>

              <div>
                <strong>Software Developer</strong>
                <small>TCS · Full Time</small>
              </div>

              <span className="badge">Open</span>
            </div>

            <div className="preview-job">
              <div className="company-icon">A</div>

              <div>
                <strong>Frontend Developer</strong>
                <small>Accenture · Full Time</small>
              </div>

              <span className="badge">Open</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="platform-stats">
        <div>
          <strong>500+</strong>
          <span>Student Profiles</span>
        </div>

        <div>
          <strong>50+</strong>
          <span>Hiring Companies</span>
        </div>

        <div>
          <strong>100+</strong>
          <span>Active Jobs</span>
        </div>

        <div>
          <strong>1,000+</strong>
          <span>Applications</span>
        </div>
      </section>

      {/* COMPANIES */}
      <section className="landing-section">
        <div className="section-heading">
          <span className="eyebrow">HIRING PARTNERS</span>
          <h2>Companies looking for talent</h2>
          <p>
            Explore opportunities from companies across technology,
            consulting and other industries.
          </p>
        </div>

        <div className="company-grid">
          {companies.map((company) => (
            <div className="company-card" key={company.name}>
              <div className="company-logo">
                {company.name.charAt(0)}
              </div>

              <div>
                <h3>{company.name}</h3>
                <p>{company.type}</p>
              </div>

              <span>→</span>
            </div>
          ))}
        </div>

        <p className="demo-note">
          * Company names shown here are sample/demo data for the portal.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="landing-section light-section">
        <div className="section-heading center">
          <span className="eyebrow">HOW IT WORKS</span>
          <h2>Everything you need for placement</h2>
          <p>
            A simple workflow for students and recruiters.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={feature.title}>
              <div className="feature-number">
                0{index + 1}
              </div>

              <div className="feature-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOR STUDENTS / RECRUITERS */}
      <section className="role-section">
        <div className="role-card student-role">
          <span className="eyebrow">FOR STUDENTS</span>
          <h2>Find opportunities that match your skills.</h2>
          <p>
            Build your profile, upload your resume, discover jobs and track
            every application from one dashboard.
          </p>

          <Link className="btn" to="/register">
            Join as Student →
          </Link>
        </div>

        <div className="role-card recruiter-role">
          <span className="eyebrow">FOR RECRUITERS</span>
          <h2>Find the right candidates faster.</h2>
          <p>
            Create your company profile, post jobs and manage candidates
            through a streamlined recruitment workflow.
          </p>

          <Link className="btn btn-outline" to="/register">
            Join as Recruiter →
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <span className="eyebrow">START YOUR JOURNEY</span>

        <h2>
          Ready to take the next step
          <br />
          in your career?
        </h2>

        <p>
          Create your account and start exploring opportunities today.
        </p>

        <Link className="btn" to="/register">
          Get Started →
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div>
          <strong>CareerConnect</strong>
          <p>
            A professional placement and job portal for students and
            recruiters.
          </p>
        </div>

        <div className="footer-links">
          <Link to="/jobs">Jobs</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        <small>© 2026 CareerConnect. All rights reserved.</small>
      </footer>

    </div>
  );
}