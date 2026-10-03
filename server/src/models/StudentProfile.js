import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    headline: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    education: [
      {
        degree: {
          type: String,
          default: "",
        },
        institution: {
          type: String,
          default: "",
        },
        field: {
          type: String,
          default: "",
        },
        startYear: Number,
        endYear: Number,
        grade: {
          type: String,
          default: "",
        },
      },
    ],

    skills: {
      type: [String],
      default: [],
    },

    experience: [
      {
        company: {
          type: String,
          default: "",
        },
        title: {
          type: String,
          default: "",
        },
        startDate: Date,
        endDate: Date,
        description: {
          type: String,
          default: "",
        },
      },
    ],

    projects: [
      {
        title: {
          type: String,
          default: "",
        },
        description: {
          type: String,
          default: "",
        },
        technologies: {
          type: [String],
          default: [],
        },
        link: {
          type: String,
          default: "",
        },
      },
    ],

    certifications: [
      {
        name: {
          type: String,
          default: "",
        },
        issuer: {
          type: String,
          default: "",
        },
        issueDate: Date,
        credentialUrl: {
          type: String,
          default: "",
        },
      },
    ],

    resumeUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("StudentProfile", schema);