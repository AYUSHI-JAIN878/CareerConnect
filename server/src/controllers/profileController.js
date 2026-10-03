import StudentProfile from "../models/StudentProfile.js";
import RecruiterProfile from "../models/RecruiterProfile.js";
import User from "../models/User.js";

export async function getProfile(req, res) {
  const Model =
    req.user.role === "student"
      ? StudentProfile
      : RecruiterProfile;

  const profile = await Model.findOne({
    user: req.user._id,
  }).populate("user", "name email role");

  res.json({
    success: true,
    profile,
  });
}

export async function updateProfile(req, res) {
  const isStudent = req.user.role === "student";

  const Model = isStudent
    ? StudentProfile
    : RecruiterProfile;

  let updateData;

  if (isStudent) {
    updateData = {
      phone: req.body.phone,
      headline: req.body.headline,
      location: req.body.location,
      bio: req.body.bio,
      education: req.body.education,
      skills: req.body.skills,
      experience: req.body.experience,
      projects: req.body.projects,
      certifications: req.body.certifications,
    };
  } else {
    updateData = {
      companyName: req.body.companyName,
      industry: req.body.industry,
      location: req.body.location,
      website: req.body.website,
      description: req.body.description,
      phone: req.body.phone,
    };
  }

  const profile = await Model.findOneAndUpdate(
    {
      user: req.user._id,
    },
    {
      $set: updateData,
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  ).populate("user", "name email role");

  if (req.body.name) {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
      }
    );
  }

  res.json({
    success: true,
    profile,
  });
}

export async function uploadResume(req, res) {
  if (req.user.role !== "student") {
    return res.status(403).json({
      success: false,
      message: "Students only",
    });
  }

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Resume PDF is required",
    });
  }

  const url = `/uploads/resumes/${req.file.filename}`;

  const profile = await StudentProfile.findOneAndUpdate(
    {
      user: req.user._id,
    },
    {
      $set: {
        resumeUrl: url,
      },
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  ).populate("user", "name email role");

  res.json({
    success: true,
    resumeUrl: url,
    profile,
  });
}