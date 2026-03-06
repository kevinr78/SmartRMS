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

export const getExpenses = catchAsync(async (req, res, next) => {
  const expenses = await ExpenseService.getExpenses(req.user);
  res.status(200).json({
    ok: true,
    data: {
      expenses,
    },
  });
});

export const editExpense = catchAsync(async (req, res, next) => {
  const expense = await ExpenseService.updateExpense(req.params.id, req.body);
  res.status(201).json({
    ok: true,
    message: "Expense edited successfully!",
    data: {
      expense,
    },
  });
});

export const deleteExpense = catchAsync(async (req, res, next) => {
  const expenses = await ExpenseService.deleteExpense(req.params.id);
  res.status(201).json({
    ok: true,
    message: "Expense deleted successfully!",
    data: {
      expenses,
    },
  });
});
