import Reward from "../models/Reward.js";
import User from "../models/User.js";


export const getRewardStatus = async (
  req,
  res
) => {
  try {
    const { userId } = req.params;  
                
    const reward = await Reward.findOne({  
      user: userId,
    }).populate(
      "user",
      "name email referralCode referralCount"
    );

    if (!reward) {
      return res.status(404).json({
        success: false,
        message: "Reward record not found",
      });
    }

    res.status(200).json({
      success: true,
      reward,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Unlock Reward
export const unlockReward = async (
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
          "3 referrals required to unlock rewards",
      });
    }

    let reward = await Reward.findOne({
      user: userId,
    });

    if (!reward) {
      reward = await Reward.create({
        user: userId,
        unlocked: true,
        unlockedAt: new Date(),
        rewardItems: [
          "AI Prompt Template Pack",
          "AI Tools Resource PDF",
          "AI Workshop Eligibility",
        ],
      });
    }

    reward.unlocked = true;
    reward.unlockedAt = new Date();

    await reward.save();

    res.status(200).json({
      success: true,
      message:
        "Reward unlocked successfully",
      reward,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};