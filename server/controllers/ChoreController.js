import * as choreService from "../services/ChoreService.js";
import AppError from "../utils/AppError.js";

export const createChore = async (req, res, next) => {
  try {
    // Household ID usually comes from the authenticated user's session/token
    const householdId = req.user.household;
    const chore = await choreService.createChore(
      req.body,
      householdId,
      req.user
    );

    res.status(201).json({
      status: "success",
      data: chore,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllChores = async (req, res, next) => {
  try {
    const chores = await choreService.getHouseholdChores(req.user.household);
    res.status(200).json({
      status: "success",
      results: chores.length,
      data: chores,
    });
  } catch (error) {
    next(error);
  }
};

export const updateChore = async (req, res, next) => {
  try {
    const chore = await choreService.updateChore(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      data: chore,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteChore = async (req, res, next) => {
  try {
    await choreService.deleteChore(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
