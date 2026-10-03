import "dotenv/config";
import bcrypt from "bcrypt";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import StudentProfile from "./models/StudentProfile.js";
import RecruiterProfile from "./models/RecruiterProfile.js";
import Job from "./models/Job.js";

await connectDB();

await Promise.all([
  User.deleteMany({}),
  StudentProfile.deleteMany({}),
  RecruiterProfile.deleteMany({}),
  Job.deleteMany({})
]);

const password = async p => bcrypt.hash(p, 12);

const [admin, recruiter, student] = await User.create([
  { name: "Portal Admin", email: "admin@placement.local", password: await password("Admin@123"), role: "admin" },
  { name: "TechCorp Recruiter", email: "recruiter@techcorp.local", password: await password("Recruiter@123"), role: "recruiter" },
  { name: "Demo Student", email: "student@college.local", password: await password("Student@123"), role: "student" }
]);

await RecruiterProfile.create({
  user: recruiter._id, companyName: "TechCorp Solutions", website: "https://example.com",
  industry: "Software", location: "Indore", description: "Product and software engineering company."
});

await StudentProfile.create({
  user: student._id, phone: "9999999999", headline: "B.Tech Computer Science Student",
  location: "Indore", skills: ["JavaScript", "React", "Node.js", "MongoDB"],
  education: [{ degree: "B.Tech", institution: "Madhav Institute of Technology", field: "Computer Science", startYear: 2023, endYear: 2027, grade: "8.2 CGPA" }]
});

await Job.create([
  {
    recruiter: recruiter._id, companyName: "TechCorp Solutions", title: "Frontend Developer Intern",
    description: "Build responsive React interfaces and collaborate with backend engineers.",
    location: "Indore", skills: ["React", "JavaScript", "CSS"], experience: "0-1 years",
    jobType: "Internship", salaryMin: 10000, salaryMax: 18000, openings: 3,
    deadline: new Date(Date.now() + 30 * 86400000)
  },
  {
    recruiter: recruiter._id, companyName: "TechCorp Solutions", title: "Junior Full Stack Developer",
    description: "Work on REST APIs, React applications, MongoDB data models and testing.",
    location: "Remote", skills: ["React", "Node.js", "MongoDB", "Express"], experience: "0-2 years",
    jobType: "Full-time", salaryMin: 400000, salaryMax: 700000, openings: 2,
    deadline: new Date(Date.now() + 45 * 86400000)
  }
]);

console.log("Seed complete.");
process.exit(0);
