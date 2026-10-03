import mongoose from "mongoose";

const schema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["Applied", "Shortlisted", "Interview", "Selected", "Rejected"],
    default: "Applied"
  },
  coverLetter: { type: String, default: "" }
}, { timestamps: true });

schema.index({ job: 1, student: 1 }, { unique: true });

export default mongoose.model("Application", schema);
