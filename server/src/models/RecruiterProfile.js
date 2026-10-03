import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true },
  companyName: { type: String, default: "" },
  website: String,
  industry: String,
  location: String,
  description: String,
  phone: String
}, { timestamps: true });

export default mongoose.model("RecruiterProfile", schema);
