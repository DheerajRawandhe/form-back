import express from "express";

import {
  getReferralDetails,
} from "../controllers/referral.controller.js";

const router = express.Router();

router.get(
  "/:referralCode",
  getReferralDetails
);

export default router;