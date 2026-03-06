import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import mongoose from "mongoose";
import Expense from "../models/Expense.js";
import Household from "../models/Household.js";

export const createExpense = async (expenseData, user) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      title,
      amount,
      date: expenseDate,
      category,
      splitMethod,
      splitDetails: expenseSplit,
    } = expenseData;
    if (amount <= 0) {
      throw new AppError("Amount must be greater than 0", 400);
    }
    const splitDetails = {};
    if (splitMethod === "percentages" || splitMethod === "exact") {
      if (!expenseSplit || !Array.isArray(expenseSplit)) {
        throw new AppError(
          "Split details must be provided for custom split",
          400
        );
      }
      if (splitMethod === "exact") {
        const totalSplit = expenseSplit.reduce(
          (sum, detail) => sum + detail.amount,
          0
        );
        if (totalSplit !== amount) {
          throw new AppError(
            "Total percentage for custom split must equal 100",
            400
          );
        }
      } else if (splitMethod === "percentages") {
        const totalPercentage = expenseSplit.reduce(
          (sum, detail) => sum + detail.amount,
          0
        );
        if (totalPercentage !== 100) {
          throw new AppError(
            "Total percentage for custom split must equal 100",
            400
          );
        }
        expenseSplit.forEach((detail) => {
          detail.amount = (detail.amount / 100) * amount;
        });
      }

      splitDetails.amounts = expenseSplit;
    } else if (splitMethod === "equal") {
      const household = await Household.findById(user.household).populate(
        "members"
      );
      const memberCount = household.members.length;
      splitDetails.amounts = household.members.map((member) => ({
        user: member.userId,
        amount: amount / memberCount,
      }));
    }
    const expense = new Expense({
      title,
      amount,
      expenseDate,
      category,
      splitMethod,
      splitDetails,
      household: user.household,
      paidBy: user._id,
      date: expenseDate || Date.now(),
    });

    await expense.save({ session });

    await session.commitTransaction();
    return expense;
  } catch (error) {
    await session.abortTransaction();
    // Handle potential duplicate key errors for invitationCode if it's generated on creation
    if (error.code === 11000) {
      throw new AppError(
        "A household with that identifier already exists.",
        409
      );
    }
    throw error;
  } finally {
    session.endSession();
  }
};

export const getExpenses = async (user) => {
  try {
    const expenses = await Expense.find({ household: user.household })
      .sort({
        date: -1,
      })
      .populate("paidBy", "firstName lastName email")
      .populate("household", "name");
    if (!expenses) {
      throw new AppError("No expenses found for this household", 404);
    }

    return expenses;
  } catch (error) {
    throw new AppError("Error fetching expenses", 500);
  }
};

export const updateExpense = async (expenseId, updateData) => {
  const expense = await Expense.findByIdAndUpdate(expenseId, updateData, {
    new: true,
    runValidators: true,
  }).populate("paidBy", "firstName lastName fullName");

  if (!expense) {
    throw new AppError("No expense found with that ID", 404);
  }
  return expense;
};

export const deleteExpense = async (expenseId) => {
  const expense = await Expense.findByIdAndDelete(expenseId);
  if (!expense) {
    throw new AppError("No expense found with that ID", 404);
  }
  return expense;
};
