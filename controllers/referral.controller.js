import User from "../models/User.js";

export const getReferralDetails = async (
  req,
  res
) => {
  try {
    const { referralCode } = req.params;

    const user = await User.findOne({
      referralCode,
    });



    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Referral code not found",
      });
    }

  

    res.status(200).json({
      success: true,
      referralCode: user.referralCode,
      referralCount: user.referralCount,
      rewardStatus: user.rewardStatus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};