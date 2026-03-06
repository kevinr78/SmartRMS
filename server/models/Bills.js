import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    household: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Household",
      required: true,
    },
    title: { type: String, required: true }, // e.g., "Electricity - March"
    category: {
      type: String,
      enum: ["Electricity", "Water", "Internet", "Rent", "Gas", "Other"],
      default: "Other",
    },
    totalAmount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Tracking individual roommate contributions
    splits: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        amount: { type: Number },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
      },
    ],

    attachment: { type: String }, // URL to PDF/Image of the bill
    status: {
      type: String,
      enum: ["Unpaid", "Partially Paid", "Fully Paid"],
      default: "Unpaid",
    },
    isRecurring: { type: Boolean, default: false },
    frequency: {
      type: String,
      enum: ["none", "daily", "weekly", "bi-weekly", "monthly", "yearly"],
      default: "none",
    },
    // This helps track the "parent" of a recurring series
    recurringGroupId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Bill", billSchema);
