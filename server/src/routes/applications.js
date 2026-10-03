import { Router } from "express";
import { myApplications, recruiterApplications, updateStatus, candidateProfile } from "../controllers/applicationController.js";
import { auth, allowRoles } from "../middleware/auth.js";

const router = Router();
router.get("/my", auth, allowRoles("student"), myApplications);
router.get("/recruiter", auth, allowRoles("recruiter"), recruiterApplications);
router.put("/:id/status", auth, allowRoles("recruiter"), updateStatus);
router.get("/candidate/:userId", auth, allowRoles("recruiter", "admin"), candidateProfile);
export default router;
