import User from "../models/User.js";

export const getAllUsers = async (
  req,
  res
) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      totalUsers: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAnalytics = async (
  req,
  res
) => {
  try {
    const totalUsers =
      await User.countDocuments();

    const unlockedUsers =
      await User.countDocuments({
        rewardStatus: "UNLOCKED",
      });

    const totalReferrals =
      await User.aggregate([
        {
          $group: {
            _id: null,
            total: {
              $sum: "$referralCount",
            },
          },
        },
      ]);

    res.status(200).json({
      success: true,
      totalUsers,
      unlockedUsers,
      totalReferrals:
        totalReferrals[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



