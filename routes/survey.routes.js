// 


import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { submitSurvey } from "../controllers/survey.controller.js";

const router = express.Router();

router.post("/submit", protect, submitSurvey);

export default router;







