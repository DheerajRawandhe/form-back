// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },  
  
//     phone: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     college: {
//       type: String,
//       required: true,
//     },
  
//     yearOfStudy: {
//       type: String,
//     },

//     branch: {
//       type: String,
//     },

//     referralCode: {
//       type: String,
//       unique: true,
//     },

//     referralCount: {
//       type: Number,
//       default: 0,
//     },

//     rewardStatus: {
//       type: String,
//       enum: ["PENDING", "UNLOCKED"],
//       default: "PENDING",
//     },
//     answers: {
//   type: Map,
//   of: mongoose.Schema.Types.Mixed,
//   default: {},
// },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("User", userSchema);


// ==========================================



import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    phone: {
      type: String,
      unique: true,
      sparse: true,
      default: "",
    },

    college: {
      type: String,
      default: "",
    },

    branch: {
      type: String,
      default: "",
    },

    yearOfStudy: {
      type: String,
      default: "",
    },

    referralCode: {
      type: String,
      unique: true,
      sparse: true,
    },

    referredBy: {
      type: String,
      default: "",
    },

    referralCount: {
      type: Number,
      default: 0,
    },

    rewardStatus: {
      type: String,
      enum: ["PENDING", "UNLOCKED"],
      default: "PENDING",
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS"],
      default: "PENDING",
    },

    surveyCompleted: {
      type: Boolean,
      default: false,
    },

    answers: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
    
    

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);