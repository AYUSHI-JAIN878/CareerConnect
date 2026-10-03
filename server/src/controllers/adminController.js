import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

export async function statistics(req, res) {
  const [students, recruiters, jobs, applications] = await Promise.all([
    User.countDocuments({ role: "student" }),
    User.countDocuments({ role: "recruiter" }),
    Job.countDocuments(),
    Application.countDocuments()
  ]);
  const statusCounts = await Application.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]);
  res.json({ success: true, statistics: { students, recruiters, jobs, applications, statusCounts } });
}

export async function users(req, res) {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json({ success: true, users });
}

export async function jobs(req, res) {
  const jobs = await Job.find().populate("recruiter", "name email").sort({ createdAt: -1 });
  res.json({ success: true, jobs });
}
