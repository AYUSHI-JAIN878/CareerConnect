import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const student = user.role === "student";

  useEffect(() => {
    api
      .get("/profile")
      .then((response) => {
        setProfile(response.data.profile);
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || "Unable to load profile."
        );
      });
  }, []);

  const updateField = (field, value) => {
    setProfile({
      ...profile,
      [field]: value,
    });
  };

  const save = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setSaving(true);

    try {
      const { data } = await api.put("/profile", profile);

      setProfile(data.profile);
      setMessage("Profile saved successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to save profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const upload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setMessage("");
    setError("");

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file only.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const { data } = await api.post(
        "/profile/resume",
        formData
      );

      setProfile(data.profile);
      setMessage("Resume uploaded successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Resume upload failed."
      );
    } finally {
      setUploading(false);
    }
  };

  if (!profile && !error) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error && !profile) {
    return <div className="alert error">{error}</div>;
  }

  return (
    <section className="profile-page">

      {/* =========================
          PROFILE HEADER
      ========================= */}

      <div className="profile-hero">

        <div className="profile-avatar">
          {user.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <div className="profile-hero-info">
          <span className="eyebrow">
            {student ? "Student Profile" : "Recruiter Profile"}
          </span>

          <h1>{user.name}</h1>

          <p>
            {student
              ? "Build your professional profile and showcase your skills."
              : "Manage your company information and recruitment presence."}
          </p>
        </div>

      </div>


      {/* =========================
          PROFILE FORM
      ========================= */}

      <form
        className="card profile-form"
        onSubmit={save}
      >

        <div className="profile-section-header">
          <div>
            <span className="eyebrow">Personal information</span>
            <h2>
              {student ? "About you" : "Company information"}
            </h2>
          </div>

          <span className="profile-status">
            Profile
          </span>
        </div>


        <div className="profile-form-grid">

          {/* Name */}
          <div className="form-group">
            <label>Name</label>

            <input
              value={profile.user?.name || user.name || ""}
              onChange={(e) =>
                updateField("name", e.target.value)
              }
              placeholder="Enter your name"
            />
          </div>


          {/* STUDENT FIELDS */}
          {student && (
            <>
              <div className="form-group">
                <label>Professional Headline</label>

                <input
                  value={profile.headline || ""}
                  onChange={(e) =>
                    updateField("headline", e.target.value)
                  }
                  placeholder="e.g. B.Tech CSE Student | Web Developer"
                />
              </div>

              <div className="form-group">
                <label>Location</label>

                <input
                  value={profile.location || ""}
                  onChange={(e) =>
                    updateField("location", e.target.value)
                  }
                  placeholder="e.g. Gwalior, Madhya Pradesh"
                />
              </div>

              <div className="form-group">
                <label>Phone</label>

                <input
                  type="tel"
                  value={profile.phone || ""}
                  onChange={(e) =>
                    updateField("phone", e.target.value)
                  }
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group span-2">
                <label>Skills</label>

                <input
                  value={(profile.skills || []).join(", ")}
                  onChange={(e) =>
                    updateField(
                      "skills",
                      e.target.value
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter(Boolean)
                    )
                  }
                  placeholder="React, JavaScript, Node.js, MongoDB"
                />

                <small className="form-hint">
                  Separate multiple skills using commas.
                </small>
              </div>

              <div className="form-group span-2">
                <label>Professional Bio</label>

                <textarea
                  rows="6"
                  value={profile.bio || ""}
                  onChange={(e) =>
                    updateField("bio", e.target.value)
                  }
                  placeholder="Write a short professional introduction..."
                />
              </div>
            </>
          )}

          {/* RECRUITER FIELDS */}
{!student && (
  <>
    <div className="form-group">
      <label>Company Name</label>

      <input
        value={profile.companyName || ""}
        onChange={(e) =>
          updateField("companyName", e.target.value)
        }
        placeholder="Enter company name"
      />
    </div>

    <div className="form-group">
      <label>Industry</label>

      <input
        value={profile.industry || ""}
        onChange={(e) =>
          updateField("industry", e.target.value)
        }
        placeholder="e.g. Information Technology"
      />
    </div>

    <div className="form-group">
      <label>Location</label>

      <input
        value={profile.location || ""}
        onChange={(e) =>
          updateField("location", e.target.value)
        }
        placeholder="Company location"
      />
    </div>

    {/* PHONE — NEW */}
    <div className="form-group">
      <label>Phone</label>

      <input
        type="tel"
        value={profile.phone || ""}
        onChange={(e) =>
          updateField("phone", e.target.value)
        }
        placeholder="Company contact number"
      />
    </div>

    <div className="form-group">
      <label>Website</label>

      <input
        type="url"
        value={profile.website || ""}
        onChange={(e) =>
          updateField("website", e.target.value)
        }
        placeholder="https://company.com"
      />
    </div>

    <div className="form-group span-2">
      <label>Company Description</label>

      <textarea
        rows="6"
        value={profile.description || ""}
        onChange={(e) =>
          updateField("description", e.target.value)
        }
        placeholder="Tell candidates about your organization..."
      />
    </div>
  </>
)}
        </div>

        {/* Messages */}

        {message && (
          <div className="alert success">
            {message}
          </div>
        )}

        {error && (
          <div className="alert error">
            {error}
          </div>
        )}


        {/* Save */}

        <div className="profile-form-actions">
          <button
            type="submit"
            className="btn"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>

      </form>


      {/* =========================
          RESUME
      ========================= */}

      {student && (
        <div className="card resume-card">

          <div className="resume-header">
            <div>
              <span className="eyebrow">Career document</span>
              <h2>Resume</h2>
              <p>
                Upload your latest resume in PDF format.
              </p>
            </div>

            <div className="resume-icon">
              PDF
            </div>
          </div>

          <div className="resume-upload">

            <label className="upload-box">

              <div className="upload-icon">
                ↑
              </div>

              <strong>
                {uploading
                  ? "Uploading resume..."
                  : "Choose your resume"}
              </strong>

              <span>
                PDF files only
              </span>

              <input
                type="file"
                accept="application/pdf,.pdf"
                onChange={upload}
                disabled={uploading}
              />

            </label>

            {profile.resumeUrl && (
              <div className="resume-success">
                ✓ Resume uploaded successfully
              </div>
            )}

          </div>

        </div>
      )}

    </section>
  );
}