import express from "express";

import {
  getAllUsers,
  getAnalytics,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/analytics", getAnalytics);

export default router;