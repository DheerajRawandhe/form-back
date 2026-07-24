import User from "../models/User.js";

const generateReferralCode = async () => {
  try {
    const totalUsers = await User.countDocuments();

    const referralCode = `MS${String(
      totalUsers + 1
    ).padStart(3, "0")}`;

    return referralCode;
  } catch (error) {
    throw new Error("Failed to generate referral code");
  }
};

export default generateReferralCode;




