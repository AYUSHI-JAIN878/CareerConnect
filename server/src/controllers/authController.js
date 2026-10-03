import bcrypt from "bcrypt";
import User from "../models/User.js";
import StudentProfile from "../models/StudentProfile.js";
import RecruiterProfile from "../models/RecruiterProfile.js";
import { signToken } from "../utils/jwt.js";

const publicUser = (u) => ({
  id: u._id,
  name: u.name,
  email: u.email,
  role: u.role
});

export async function register(req, res) {
  const { name, email, password, role = "student" } = req.body;
  if (!name || !email || !password) return res.status(400).json({ success: false, message: "Name, email and password are required" });
  if (!["student", "recruiter"].includes(role)) return res.status(400).json({ success: false, message: "Invalid registration role" });
  if (password.length < 8) return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });

  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) return res.status(409).json({ success: false, message: "Email is already registered" });

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email: email.toLowerCase(), password: passwordHash, role });

  if (role === "student") await StudentProfile.create({ user: user._id });
  if (role === "recruiter") await RecruiterProfile.create({ user: user._id, companyName: name });

  res.status(201).json({ success: true, token: signToken(user), user: publicUser(user) });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email: (email || "").toLowerCase() }).select("+password");
  if (!user || !(await bcrypt.compare(password || "", user.password))) {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }
  res.json({ success: true, token: signToken(user), user: publicUser(user) });
}

export async function me(req, res) {
  res.json({ success: true, user: publicUser(req.user) });
}
