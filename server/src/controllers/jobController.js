import Job from "../models/Job.js";
import Application from "../models/Application.js";
import RecruiterProfile from "../models/RecruiterProfile.js";

export async function listJobs(req, res) {
  const { search, location, skills, experience, jobType } = req.query;
  const filter = { isActive: true };
  if (search) filter.$or = [
    { title: { $regex: search, $options: "i" } },
    { companyName: { $regex: search, $options: "i" } },
    { description: { $regex: search, $options: "i" } }
  ];
  if (location) filter.location = { $regex: location, $options: "i" };
  if (skills) filter.skills = { $in: skills.split(",").map(s => new RegExp(s.trim(), "i")) };
  if (experience) filter.experience = { $regex: experience, $options: "i" };
  if (jobType) filter.jobType = jobType;

  const jobs = await Job.find(filter).populate("recruiter", "name email").sort({ createdAt: -1 });
  res.json({ success: true, jobs });
}

export async function getJob(req, res) {
  const job = await Job.findById(req.params.id).populate("recruiter", "name email");
  if (!job) return res.status(404).json({ success: false, message: "Job not found" });
  res.json({ success: true, job });
}

export async function createJob(req, res) {
  const profile = await RecruiterProfile.findOne({ user: req.user._id });
  const job = await Job.create({
    ...req.body,
    recruiter: req.user._id,
    companyName: req.body.companyName || profile?.companyName || req.user.name,
    skills: Array.isArray(req.body.skills) ? req.body.skills : String(req.body.skills || "").split(",").map(s => s.trim()).filter(Boolean)
  });
  res.status(201).json({ success: true, job });
}

export async function updateJob(req, res) {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ success: false, message: "Job not found" });
  if (req.user.role !== "admin" && job.recruiter.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: "Access denied" });

  const data = { ...req.body };
  if (typeof data.skills === "string") data.skills = data.skills.split(",").map(s => s.trim()).filter(Boolean);
  Object.assign(job, data);
  await job.save();
  res.json({ success: true, job });
}

export async function deleteJob(req, res) {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ success: false, message: "Job not found" });
  if (req.user.role !== "admin" && job.recruiter.toString() !== req.user._id.toString()) return res.status(403).json({ success: false, message: "Access denied" });
  await Application.deleteMany({ job: job._id });
  await job.deleteOne();
  res.json({ success: true, message: "Job deleted" });
}

export async function applyJob(req, res) {
  const job = await Job.findOne({ _id: req.params.id, isActive: true });
  if (!job) return res.status(404).json({ success: false, message: "Job is not available" });
  if (job.deadline && new Date(job.deadline) < new Date()) return res.status(400).json({ success: false, message: "Application deadline has passed" });

  try {
    const application = await Application.create({
      job: job._id,
      student: req.user._id,
      recruiter: job.recruiter,
      coverLetter: req.body.coverLetter || ""
    });
    res.status(201).json({ success: true, application });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ success: false, message: "You have already applied for this job" });
    throw err;
  }
}
