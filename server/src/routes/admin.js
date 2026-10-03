import { Router } from "express";
import { statistics, users, jobs } from "../controllers/adminController.js";
import { auth, allowRoles } from "../middleware/auth.js";

const router = Router();
router.get("/statistics", auth, allowRoles("admin"), statistics);
router.get("/users", auth, allowRoles("admin"), users);
router.get("/jobs", auth, allowRoles("admin"), jobs);
export default router;
