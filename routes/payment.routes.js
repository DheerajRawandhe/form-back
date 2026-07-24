import express from "express";

import {
  createPayment,
  verifyPayment,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post(
  "/create/:userId",
  createPayment
);



router.put(
  "/verify/:paymentId",
  verifyPayment
);

export default router;


