

// // models/SurveyResponse.js
// import mongoose from "mongoose";

// const surveyResponseSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // agar personal info se link karna hai
//   name: String,
//   email: String,
//   phone: String,
//   college: String,
//   yearOfStudy: String,
//   branch: String,
//   referralCodeUsed: String,

  
// answers: {
//   q1_primaryGoal: String,
//   q2_restartCount: String,
//   q3_answer: String,
//   q4_answer: String,
//   q5_answer: String,
//   q6_answer: String,
//   q7_answer: String,
//   q8_answer: String,
//   q9_answer: String,
//   q10_answer: String,
//   q11_answer: [String],   // multi-select
//   q12_answer: String,
//   q13_answer: String,
//   q14_answer: [String],   // multi-select
//   q15_answer: String,
//   q16_answer: String,
//   q17_answer: String,
//   q18_answer: String,
//   q19_answer: String,
//   q20_answer: String,
//   q21_answer: String,
// },

//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model("SurveyResponse", surveyResponseSchema);



// =================================


// // models/SurveyResponse.js
// import mongoose from "mongoose";

// const surveyResponseSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       unique: true, // ek user sirf ek hi survey submit kare
//     },
//     name: String,
//     email: String,
//     phone: String,
//     college: String,
//     yearOfStudy: String,
//     branch: String,
//     referralCodeUsed: String,

//     answers: {
//       q1_primaryGoal: String,
//       q2_restartCount: String,
//       q3_answer: String,
//       q4_answer: String,
//       q5_answer: String,
//       q6_answer: String,
//       q7_answer: String,
//       q8_answer: String,
//       q9_answer: String,
//       q10_answer: String,
//       q11_answer: [String], // multi-select
//       q12_answer: String,
//       q13_answer: String,
//       q14_answer: [String], // multi-select
//       q15_answer: String,
//       q16_answer: String,
//       q17_answer: String,
//       q18_answer: String,
//       q19_answer: String,
//       q20_answer: String,
//       q21_answer: String,
//     },
//   },
//   {
//     timestamps: true, 
//   }
// );

// export default mongoose.model("SurveyResponse", surveyResponseSchema);




////////////////////////////////////////////////



import mongoose from "mongoose";

const surveyResponseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: String,
    email: String,
    phone: String,
    college: String,
    yearOfStudy: String,
    branch: String,
    referralCodeUsed: String,

    answers: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SurveyResponse", surveyResponseSchema);