import { Router } from "express";
import { getProfile, updateProfile, uploadResume } from "../controllers/profileController.js";
import { auth, allowRoles } from "../middleware/auth.js";
import { resumeUpload } from "../middleware/upload.js";

const router = Router();
router.get("/", auth, allowRoles("student", "recruiter"), getProfile);
router.put("/", auth, allowRoles("student", "recruiter"), updateProfile);
router.post("/resume", auth, allowRoles("student"), resumeUpload, uploadResume);
export default router;
