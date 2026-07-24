import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    unlocked: {
      type: Boolean,
      default: false,
    },

    unlockedAt: {
      type: Date,
    },

    rewardItems: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Reward",
  rewardSchema
);