import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    transactionId: {
      type: String,
    },

    amount: {
      type: Number,
      default: 29,
    },

    paymentStatus: {
      type: String,
      enum: [
        "NOT_ELIGIBLE",
        "ELIGIBLE",
        "PENDING",
        "COMPLETED",
        "FAILED",
      ],
      default: "NOT_ELIGIBLE",
    },

    paymentDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Payment",
  paymentSchema
);