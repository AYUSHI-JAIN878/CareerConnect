import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function JobForm() {
  const { id } = useParams();
  const edit = Boolean(id);
  const nav = useNavigate();

  const [form, setForm] = useState({
    title: "",
    companyName: "",
    description: "",
    location: "",
    skills: "",
    experience: "0-2 years",
    jobType: "Full-time",
    salaryMin: "",
    salaryMax: "",
    openings: 1,
    deadline: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(edit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!edit) return;

    const loadJob = async () => {
      try {
        const response = await api.get(`/jobs/${id}`);
        const job = response.data.job;

        setForm({
          title: job.title || "",
          companyName: job.companyName || "",
          description: job.description || "",
          location: job.location || "",
          skills: job.skills ? job.skills.join(", ") : "",
          experience: job.experience || "0-2 years",
          jobType: job.jobType || "Full-time",
          salaryMin: job.salaryMin || "",
          salaryMax: job.salaryMax || "",
          openings: job.openings || 1,
          deadline: job.deadline
            ? job.deadline.slice(0, 10)
            : "",
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load job details."
        );
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id, edit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    setError("");
    setSaving(true);

    try {
      const payload = {
        ...form,
        skills: form.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),

        salaryMin: form.salaryMin
          ? Number(form.salaryMin)
          : undefined,

        salaryMax: form.salaryMax
          ? Number(form.salaryMax)
          : undefined,

        openings: Number(form.openings),
      };

      if (edit) {
        await api.put(`/jobs/${id}`, payload);
      } else {
        await api.post("/jobs", payload);
      }

      nav("/jobs");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to save job. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="job-form-loading card">
        <div className="loading-spinner"></div>

        <h3>Loading job details...</h3>

        <p>
          Please wait while we prepare the form.
        </p>
      </div>
    );
  }

  return (
    <section className="job-form-page">

      <div className="job-form-header">
        <span className="eyebrow">
          Recruiter workspace
        </span>

        <h1>
          {edit ? "Edit job posting" : "Create a new job"}
        </h1>

        <p>
          {edit
            ? "Update the details of your existing job posting."
            : "Add a new opportunity and connect with potential candidates."}
        </p>
      </div>

      <form
        className="card job-form-card"
        onSubmit={submit}
      >

        {error && (
          <div className="alert error job-form-alert">
            {error}
          </div>
        )}

        {/* Basic Information */}
        <div className="form-section">

          <div className="form-section-heading">
            <span className="form-section-number">
              01
            </span>

            <div>
              <h2>Basic Information</h2>

              <p>
                Add the basic details of the job.
              </p>
            </div>
          </div>

          <div className="form-grid">

            <div className="form-group">
              <label htmlFor="title">
                Job Title *
              </label>

              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="companyName">
                Company Name
              </label>

              <input
                id="companyName"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                placeholder="e.g. TechCorp"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">
                Location *
              </label>

              <input
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Delhi / Remote"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="jobType">
                Job Type
              </label>

              <select
                id="jobType"
                name="jobType"
                value={form.jobType}
                onChange={handleChange}
              >
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

          </div>
        </div>

        {/* Requirements */}
        <div className="form-section">

          <div className="form-section-heading">
            <span className="form-section-number">
              02
            </span>

            <div>
              <h2>Requirements</h2>

              <p>
                Specify the required skills and experience.
              </p>
            </div>
          </div>

          <div className="form-grid">

            <div className="form-group">
              <label htmlFor="skills">
                Required Skills *
              </label>

              <input
                id="skills"
                name="skills"
                value={form.skills}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
                required
              />

              <small className="form-hint">
                Separate skills with commas.
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="experience">
                Experience
              </label>

              <select
                id="experience"
                name="experience"
                value={form.experience}
                onChange={handleChange}
              >
                <option value="0-1 years">
                  0–1 years
                </option>

                <option value="0-2 years">
                  0–2 years
                </option>

                <option value="1-3 years">
                  1–3 years
                </option>

                <option value="2-5 years">
                  2–5 years
                </option>

                <option value="5+ years">
                  5+ years
                </option>
              </select>
            </div>

          </div>
        </div>

        {/* Salary */}
        <div className="form-section">

          <div className="form-section-heading">
            <span className="form-section-number">
              03
            </span>

            <div>
              <h2>Compensation & Hiring</h2>

              <p>
                Add salary, openings and deadline.
              </p>
            </div>
          </div>

          <div className="form-grid">

            <div className="form-group">
              <label htmlFor="salaryMin">
                Minimum Salary
              </label>

              <input
                id="salaryMin"
                name="salaryMin"
                type="number"
                min="0"
                value={form.salaryMin}
                onChange={handleChange}
                placeholder="e.g. 40000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="salaryMax">
                Maximum Salary
              </label>

              <input
                id="salaryMax"
                name="salaryMax"
                type="number"
                min="0"
                value={form.salaryMax}
                onChange={handleChange}
                placeholder="e.g. 70000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="openings">
                Number of Openings
              </label>

              <input
                id="openings"
                name="openings"
                type="number"
                min="1"
                value={form.openings}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="deadline">
                Application Deadline
              </label>

              <input
                id="deadline"
                name="deadline"
                type="date"
                value={form.deadline}
                onChange={handleChange}
              />
            </div>

          </div>
        </div>

        {/* Description */}
        <div className="form-section">

          <div className="form-section-heading">
            <span className="form-section-number">
              04
            </span>

            <div>
              <h2>Job Description</h2>

              <p>
                Describe the role and responsibilities.
              </p>
            </div>
          </div>

          <div className="form-group">

            <label htmlFor="description">
              Description *
            </label>

            <textarea
              id="description"
              name="description"
              rows="9"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the role, responsibilities and requirements..."
              required
            />

          </div>
        </div>

        {/* Buttons */}
        <div className="job-form-actions">

          <button
            type="button"
            className="secondary-btn"
            onClick={() => nav("/jobs")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : edit
              ? "Save Changes"
              : "Publish Job"}
          </button>

        </div>

      </form>
    </section>
  );
}