
// import User from "../models/User.js";
// import generateReferralCode from "../utils/generateReferralCode.js";

// export const submitSurvey = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       phone,
//       college,
//       yearOfStudy,
//       branch,
//       referralCode,
//       ...answers  
//     } = req.body;

//     const existingEmail = await User.findOne({ email });
//     if (existingEmail) {
//       return res.status(400).json({
//         success: false,
//         message: "Email already registered",
//       });
//     }

//     const existingPhone = await User.findOne({ phone });
//     if (existingPhone) {
//       return res.status(400).json({
//         success: false,
//         message: "Phone already registered",
//       });
//     }

//     let referrer = null;

    
//     if (referralCode) {
//       referrer = await User.findOne({ referralCode });

//       if (!referrer) {
//         return res.status(400).json({
//           success: false,
//           message: "Invalid referral code",
//         });
//       }

      
//       if (referrer.email === email || referrer.phone === phone) {
//         return res.status(400).json({
//           success: false,
//           message: "Self-referral is not allowed",
//         });
//       }
//     }

//     const myReferralCode = await generateReferralCode();

//     const user = await User.create({
//       name,
//       email,
//       phone,
//       college,
//       yearOfStudy,
//       branch,
//       referralCode: myReferralCode,
//       answers,   
//     });

    
//     if (referrer) {
//       referrer.referralCount += 1;

//       if (referrer.referralCount >= 3) {
//         referrer.rewardStatus = "UNLOCKED";
//       }

//       await referrer.save();
//     }

//     res.status(201).json({
//       success: true,
//       message: "Survey submitted successfully",
//       referralCode: myReferralCode,
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// ==============================================




import User from "../models/User.js";
import SurveyResponse from "../models/SurveyResponse.js";

export const submitSurvey = async (req, res) => {
  try {
    const {
      name,
      phone,
      college,
      yearOfStudy,
      branch,
      referralCode,
      ...answers
    } = req.body;

    // Logged-in user (protect middleware se aayega)
    const userId = req.user.id;

    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Kya isne pehle hi survey submit kar rakhi hai?
    const existingResponse = await SurveyResponse.findOne({ user: userId });
    if (existingResponse) {
      return res.status(400).json({
        success: false,
        message: "Survey already submitted",
      });
    }

    // Phone kisi aur user ka to nahi (khud ko chhodke)
    if (phone) {
      const existingPhone = await User.findOne({
        phone,
        _id: { $ne: userId },
      });
      if (existingPhone) {
        return res.status(400).json({
          success: false,
          message: "Phone already registered",
        });
      }
    }

    // Referral code validate karo
    let referrer = null;
    if (referralCode) {
      referrer = await User.findOne({ referralCode });

      if (!referrer) {
        return res.status(400).json({
          success: false,
          message: "Invalid referral code",
        });
      }

      if (referrer._id.toString() === userId) {
        return res.status(400).json({
          success: false,
          message: "Self-referral is not allowed",
        });
      }
    }

    // 1) User document update karo (profile info + surveyCompleted flag)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        phone,
        college,
        yearOfStudy,
        branch,
        referredBy: referralCode || currentUser.referredBy,
        surveyCompleted: true,
      },
      { new: true, runValidators: false }
    );

    // 2) SurveyResponse document create karo (answers store karne ke liye)
    const surveyResponse = await SurveyResponse.create({
      user: userId,
      name,
      email: updatedUser.email,
      phone,
      college,
      yearOfStudy,
      branch,
      referralCodeUsed: referralCode || "",
      answers,
    });

    // 3) Referrer ka count badhao (sirf ek baar)
    if (referrer && !currentUser.referredBy) {
      referrer.referralCount += 1;

      if (referrer.referralCount >= 3) {
        referrer.rewardStatus = "UNLOCKED";
      }

      await referrer.save();
    }

    res.status(201).json({
      success: true,
      message: "Survey submitted successfully",
      referralCode: updatedUser.referralCode,
      user: updatedUser,
      surveyResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};