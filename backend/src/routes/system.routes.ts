import { Router } from "express";
import { healthCheck } from "../controllers/system/health.controller.js";

const router = Router();

router.get("/", healthCheck);

export default router;