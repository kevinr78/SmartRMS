import Bill from "../models/Bills.js";
import Household from "../models/Household.js";
import AppError from "../utils/AppError.js";

export const createBill = async (billData, userId, householdId) => {
  const household = await Household.findById(householdId).populate(
    "members.userId"
  );

  // Custom Splitting Logic: Use selected members if provided, else use all members
  const targetMembers =
    billData.selectedMembers && billData.selectedMembers.length > 0
      ? household.members.filter((m) =>
          billData.selectedMembers.includes(m.userId._id.toString())
        )
      : household.members;

  const splitAmount = billData.totalAmount / targetMembers.length;

  const splits = targetMembers.map((member) => ({
    user: member.userId._id,
    amount: splitAmount,
    isPaid: member.userId._id.toString() === userId.toString(),
    paidAt:
      member.userId._id.toString() === userId.toString() ? new Date() : null,
  }));

  // Handle recurring group ID for tracking series
  const recurringGroupId = billData.isRecurring ? `rec_${Date.now()}` : null;

  return await Bill.create({
    ...billData,
    household: householdId,
    paidBy: userId,
    splits,
    recurringGroupId,
    status: "Unpaid",
  });
};

export const getBills = async (householdId) => {
  return await Bill.find({ household: householdId })
    // 1. Populate the creator of the bill
    .populate("paidBy", "firstName lastName")
    // 2. Populate the roommates in the splits array
    .populate({
      path: "splits.user",
      select: "firstName lastName fullName email",
    })
    .sort({ dueDate: 1 });
};

export const deleteBill = async (billId) => {
  const bill = await Bill.findByIdAndDelete(billId);
  if (!bill) throw new AppError("Bill not found", 404);
  return bill;
};

// server/services/BillService.js

export const updateBill = async (billId, updateData) => {
  // We exclude _id and splits from manual updates to prevent data corruption
  const { _id, splits, ...safeData } = updateData;
  if (!safeData.isRecurring) {
    safeData.frequency = "none";
  }
  const bill = await Bill.findByIdAndUpdate(billId, safeData, {
    new: true,
    runValidators: true,
  })
    .populate("paidBy", "firstName lastName")
    .populate("splits.user", "firstName lastName fullName");

  if (!bill) throw new AppError("Bill not found", 404);
  return bill;
};
