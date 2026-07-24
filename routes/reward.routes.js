import express from "express";

import {
  getRewardStatus,
  unlockReward,
} from "../controllers/reward.controller.js";

const router = express.Router();

router.get(
  "/:userId",
  getRewardStatus
);

router.put(
  "/unlock/:userId",
  unlockReward
);

export default router;