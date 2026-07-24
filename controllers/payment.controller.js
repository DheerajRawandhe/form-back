import Payment from "../models/Payment.js";     
import User from "../models/User.js";

export const createPayment = async (
  req,
  res
) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(
      userId
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.referralCount < 3) {
      return res.status(400).json({
        success: false,
        message:
          "Complete 3 referrals first",
      });
    }


    
    const payment =
      await Payment.create({
        user: userId,
        paymentStatus: "PENDING",
      });

    res.status(201).json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyPayment = async (
  req,
  res
) => {
  try {
    const { paymentId } = req.params;

    const payment =
      await Payment.findById(
        paymentId
      );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    payment.paymentStatus =
      "COMPLETED";
    payment.transactionId =
      "TXN" + Date.now();
    payment.paymentDate = new Date();

    await payment.save();

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};