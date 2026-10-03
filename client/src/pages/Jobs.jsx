
import { useEffect, useState } from "react";
import api from "../services/api";
import JobCard from "../components/JobCard";

/* =========================
   DEMO JOBS
========================= */

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
    description:
      "Work on scalable software applications and contribute to modern technology projects.",
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
    description:
      "Build, test and maintain enterprise software solutions while working with technology teams.",
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
    description:
      "Develop digital solutions and collaborate with teams to deliver client-focused applications.",
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
    description:
      "Design and develop reliable software services used by millions of customers.",
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
    description:
      "Build innovative software products and work with engineering teams on large-scale systems.",
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
    description:
      "Solve complex engineering problems and develop reliable products at scale.",
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
    description:
      "Work on technology consulting projects and develop solutions for business requirements.",
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
    description:
      "Develop enterprise applications and contribute to modern cloud-based technology solutions.",
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
    description:
      "Support software development projects and work with cross-functional technology teams.",
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
    description:
      "Develop software applications and participate in analysis, development and testing activities.",
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
    description:
      "Build web applications and work with modern full-stack technologies.",
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
    description:
      "Contribute to software development projects and solve technical problems using modern tools.",
  },
];

/* =========================
   FILTER FUNCTION
========================= */

const filterJobs = (jobList, filters) => {
  const search = filters.search.toLowerCase().trim();
  const location = filters.location.toLowerCase().trim();
  const skills = filters.skills.toLowerCase().trim();

  return jobList.filter((job) => {
    const jobTitle = (job.title || "").toLowerCase();
    const company = (job.company || "").toLowerCase();
    const jobLocation = (job.location || "").toLowerCase();

    const jobSkills = Array.isArray(job.skills)
      ? job.skills.map((skill) => skill.toLowerCase())
      : [];

    const jobExperience = (job.experience || "").toLowerCase();
    const jobType = job.jobType || "";

    /* Search */
    const matchesSearch =
      !search ||
      jobTitle.includes(search) ||
      company.includes(search);

    /* Location */
    const matchesLocation =
      !location || jobLocation.includes(location);

    /* Skills */
    const matchesSkills =
      !skills ||
      jobSkills.some((skill) => skill.includes(skills));

    /* Experience */
    let matchesExperience = true;

    if (filters.experience) {
      const selectedStart = Number(
        filters.experience.split("-")[0]
      );

      const jobStart = Number(
        jobExperience.match(/\d+/)?.[0] || 0
      );

      matchesExperience = jobStart <= selectedStart;
    }

    /* Job Type */
    const matchesJobType =
      !filters.jobType || jobType === filters.jobType;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesSkills &&
      matchesExperience &&
      matchesJobType
    );
  });
};

export default function Jobs() {
  const [allJobs, setAllJobs] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    location: "",
    skills: "",
    experience: "",
    jobType: "",
  });

  /* =========================
     LOAD JOBS
  ========================= */

  const loadJobs = async () => {
    setLoading(true);
    setError("");

    try {
      /*
       * Get real jobs from backend.
       * Demo jobs are added along with backend jobs.
       */
      const { data } = await api.get("/jobs");

      const apiJobs = data.jobs || [];

      /*
       * Combine backend jobs + demo jobs
       */
      const combinedJobs = [...apiJobs, ...demoJobs];

      setAllJobs(combinedJobs);
      setJobs(filterJobs(combinedJobs, filters));
    } catch (err) {
      /*
       * If backend is unavailable,
       * still show demo jobs.
       */
      setAllJobs(demoJobs);
      setJobs(filterJobs(demoJobs, filters));
      setError("");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     INITIAL LOAD
  ========================= */

  useEffect(() => {
    loadJobs();
  }, []);

  /* =========================
     HANDLE INPUT
  ========================= */

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
     SEARCH
  ========================= */

  const handleSearch = (e) => {
    e.preventDefault();

    const filteredJobs = filterJobs(
      allJobs,
      filters
    );

    setJobs(filteredJobs);
  };

  /* =========================
     CLEAR FILTERS
  ========================= */

  const clearFilters = () => {
    const emptyFilters = {
      search: "",
      location: "",
      skills: "",
      experience: "",
      jobType: "",
    };

    setFilters(emptyFilters);
    setJobs(allJobs);
  };

  const hasFilters = Object.values(filters).some(
    (value) => value !== ""
  );

  /* =========================
     UI
  ========================= */

  return (
    <section className="jobs-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="jobs-header">

        <div>

          <span className="eyebrow">
            Career opportunities
          </span>

          <h1>
            Find your next opportunity
          </h1>

          <p>
            Explore jobs, internships and career opportunities
            that match your skills.
          </p>

        </div>

        <div className="jobs-count">

          <strong>
            {jobs.length}
          </strong>

          <span>
            Jobs found
          </span>

        </div>

      </div>


      {/* =========================
          SEARCH / FILTERS
      ========================= */}

      <form
        className="card jobs-filter-card"
        onSubmit={handleSearch}
      >

        <div className="filter-heading">

          <div>

            <h2>
              Search & Filter
            </h2>

            <p>
              Narrow down opportunities based on your preferences.
            </p>

          </div>

          {hasFilters && (
            <button
              type="button"
              className="clear-filter-btn"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          )}

        </div>


        <div className="jobs-filters">

          {/* SEARCH */}

          <div className="filter-field search-field">

            <label>
              Search
            </label>

            <input
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="Job title or company"
            />

          </div>


          {/* LOCATION */}

          <div className="filter-field">

            <label>
              Location
            </label>

            <input
              name="location"
              value={filters.location}
              onChange={handleChange}
              placeholder="e.g. Bengaluru"
            />

          </div>


          {/* SKILLS */}

          <div className="filter-field">

            <label>
              Skills
            </label>

            <input
              name="skills"
              value={filters.skills}
              onChange={handleChange}
              placeholder="React, Node.js"
            />

          </div>


          {/* EXPERIENCE */}

          <div className="filter-field">

            <label>
              Experience
            </label>

            <select
              name="experience"
              value={filters.experience}
              onChange={handleChange}
            >

              <option value="">
                Any experience
              </option>

              <option value="0-1">
                0–1 years
              </option>

              <option value="0-2">
                0–2 years
              </option>

              <option value="1-3">
                1–3 years
              </option>

            </select>

          </div>


          {/* JOB TYPE */}

          <div className="filter-field">

            <label>
              Job Type
            </label>

            <select
              name="jobType"
              value={filters.jobType}
              onChange={handleChange}
            >

              <option value="">
                All types
              </option>

              <option value="Full-time">
                Full-time
              </option>

              <option value="Part-time">
                Part-time
              </option>

              <option value="Internship">
                Internship
              </option>

              <option value="Contract">
                Contract
              </option>

            </select>

          </div>


          {/* SEARCH BUTTON */}

          <button
            type="submit"
            className="btn jobs-search-btn"
            disabled={loading}
          >
            {loading
              ? "Searching..."
              : "Search Jobs"}
          </button>

        </div>

      </form>


      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="alert error">
          {error}
        </div>
      )}


      {/* =========================
          RESULTS HEADER
      ========================= */}

      <div className="jobs-results-header">

        <div>

          <h2>
            Available opportunities
          </h2>

          {!loading && (
            <p>
              {jobs.length === 0
                ? "No opportunities found."
                : `Showing ${jobs.length} available ${
                    jobs.length === 1
                      ? "opportunity"
                      : "opportunities"
                  }`}
            </p>
          )}

        </div>

      </div>


      {/* =========================
          JOB RESULTS
      ========================= */}

      {loading ? (

        <div className="jobs-loading card">

          <div className="loading-spinner"></div>

          <h3>
            Finding opportunities...
          </h3>

          <p>
            Please wait while we load the latest jobs.
          </p>

        </div>

      ) : jobs.length > 0 ? (

        <div className="grid jobs-grid">

          {jobs.map((job) => (

            <JobCard
              key={job._id}
              job={job}
            />

          ))}

        </div>

      ) : (

        <div className="empty card jobs-empty">

          <div className="empty-icon">
            🔎
          </div>

          <h3>
            No jobs found
          </h3>

          <p>
            Try changing your search terms or
            clearing some filters.
          </p>

          {hasFilters && (
            <button
              className="btn"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          )}

        </div>

      )}

    </section>
  );
}

