// import User from "../models/User.js";
// import generateToken from "../utils/generateToken.js";



// // Register User
// export const registerUser = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       phone,
//       college,
//       yearOfStudy,
//       branch,
//     } = req.body;

  

//     const existingUser = await User.findOne({
//       $or: [{ email }, { phone }],
//     });

//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "User already exists with this email or phone",
//       });
//     }

//     const user = await User.create({
//       name,
//       email,
//       phone,
//       college,
//       yearOfStudy,
//       branch,
//     });

//     const token = generateToken(user._id);

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       token,
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



// // Login User
// export const loginUser = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({
//       email,
//     });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const token = generateToken(user._id);

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Get Profile
// export const getProfile = async (
//   req,
//   res
// ) => {
//   try {
//     const user = await User.findById(
//       req.user.id
//     );

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// ===================================================


import User from "../models/User.js";
import jwt from "jsonwebtoken";
import generateReferralCode from "../utils/generateReferralCode.js";

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Required Fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Existing User
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    // Generate own referral code
    let myReferralCode = await generateReferralCode();

    while (await User.findOne({ referralCode: myReferralCode })) {
      myReferralCode = await generateReferralCode();
    }

    // Create User
    const user = await User.create({
      username,
      email,
      password,
      referralCode: myReferralCode,
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: "Signup Successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        referralCode: user.referralCode,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password required.",
      });
    }

    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = generateToken(user._id, user.role);

    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({
      email,
      role: "admin",
    }).select("+password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = generateToken(admin._id, admin.role);

    admin.password = undefined;

    res.status(200).json({
      success: true,
      message: "Admin Login Successful",
      token,
      user: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};