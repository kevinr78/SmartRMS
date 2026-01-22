import * as ExpenseService from "../services/ExpenseService.js";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export const createExpense = catchAsync(async (req, res, next) => {
  const expense = await ExpenseService.createExpense(req.body, req.user);
  res.status(201).json({
    ok: true,
    message: "Expense created successfully!",
    data: {
      expense,
    },
  });
});
