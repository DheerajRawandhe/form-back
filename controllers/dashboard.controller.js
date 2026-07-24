import User from "../models/User.js";
import Reward from "../models/Reward.js";
import Payment from "../models/Payment.js";



export const getDashboard = async (
  req,
  res
) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const reward = await Reward.findOne({
      user: userId,
    });

    const payment = await Payment.findOne({
      user: userId,
    });

    res.status(200).json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        referralCode: user.referralCode,
        referralCount: user.referralCount,
        rewardStatus: user.rewardStatus,
        reward,
        payment,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



