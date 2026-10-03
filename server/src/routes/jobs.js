import { Router } from "express";
import { listJobs, getJob, createJob, updateJob, deleteJob, applyJob } from "../controllers/jobController.js";
import { auth, allowRoles } from "../middleware/auth.js";

const router = Router();
router.get("/", listJobs);
router.get("/:id", getJob);
router.post("/", auth, allowRoles("recruiter"), createJob);
router.put("/:id", auth, allowRoles("recruiter", "admin"), updateJob);
router.delete("/:id", auth, allowRoles("recruiter", "admin"), deleteJob);
router.post("/:id/apply", auth, allowRoles("student"), applyJob);
export default router;
