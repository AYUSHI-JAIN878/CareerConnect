import mongoose from "mongoose";

const schema = new mongoose.Schema({
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  companyName: { type: String, required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  skills: [String],
  experience: { type: String, default: "0-2 years" },
  jobType: { type: String, enum: ["Full-time", "Part-time", "Internship", "Contract"], default: "Full-time" },
  salaryMin: Number,
  salaryMax: Number,
  openings: { type: Number, default: 1, min: 1 },
  deadline: Date,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Job", schema);
