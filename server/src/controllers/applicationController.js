import Application from "../models/Application.js";
import StudentProfile from "../models/StudentProfile.js";
import RecruiterProfile from "../models/RecruiterProfile.js";

export async function myApplications(req, res) {
  const applications = await Application.find({ student: req.user._id })
    .populate("job")
    .sort({ createdAt: -1 });
  res.json({ success: true, applications });
}

export async function recruiterApplications(req, res) {
  const applications = await Application.find({ recruiter: req.user._id })
    .populate("job")
    .populate("student", "name email")
    .sort({ createdAt: -1 });
  res.json({ success: true, applications });
}

export async function updateStatus(req, res) {
  const allowed = ["Applied", "Shortlisted", "Interview", "Selected", "Rejected"];
  if (!allowed.includes(req.body.status)) return res.status(400).json({ success: false, message: "Invalid status" });

  const application = await Application.findOne({ _id: req.params.id, recruiter: req.user._id });
  if (!application) return res.status(404).json({ success: false, message: "Application not found" });
  application.status = req.body.status;
  await application.save();
  res.json({ success: true, application });
}

export async function candidateProfile(req, res) {
  const profile = await StudentProfile.findOne({ user: req.params.userId }).populate("user", "name email");
  if (!profile) return res.status(404).json({ success: false, message: "Student profile not found" });
  res.json({ success: true, profile });
}
