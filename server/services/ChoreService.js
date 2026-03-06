import Chore from "../models/Chores.js";
import ChoreAssignment from "../models/ChoreAssignment.js";
import AppError from "../utils/AppError.js";

export const createChore = async (choreData, householdId, createdBy) => {
  const chore = await Chore.create({
    ...choreData,
    createdBy,
    household: householdId,
  });
  return chore;
};

export const getHouseholdChores = async (householdId) => {
  return await Chore.find({ household: householdId }).populate(
    "assignedTo",
    "firstName lastName fullName"
  );
};

export const updateChore = async (choreId, updateData) => {
  const chore = await Chore.findByIdAndUpdate(choreId, updateData, {
    new: true,
    runValidators: true,
  });
  if (!chore) throw new AppError("Chore not found", 404);
  return chore;
};

export const deleteChore = async (choreId) => {
  const chore = await Chore.findByIdAndDelete(choreId);
  if (!chore) throw new AppError("Chore not found", 404);
  // Also delete associated assignments
  await ChoreAssignment.deleteMany({ chore: choreId });
  return chore;
};
