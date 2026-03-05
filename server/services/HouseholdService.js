import Household from "../models/Household.js";
import User from "../models/User.js"; // Assuming you have a User model
import AppError from "../utils/AppError.js";
import mongoose from "mongoose";
import crypto from "crypto";
import Invitation from "../models/Invitation.js";
import { ok } from "assert";

export const createHousehold = async (householdData, creatorId) => {
  // Start a transaction to ensure both household creation and user update succeed or fail together.
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const household = new Household({
      ...householdData,
      createdBy: creatorId,
      members: [{ userId: creatorId }],
    });

    await household.save({ session });

    // Update the user who created the household to link them to it.
    await User.findByIdAndUpdate(
      creatorId,
      { household: household._id, role: "admin" }, // Assign admin role to the creator
      { session, new: true }
    );

    await session.commitTransaction();
    return household;
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

export const getHouseholdById = async (householdId) => {
  const household = await Household.findById(householdId).populate({
    path: "members.userId",
    select: "firstName lastName email",
  });

  if (!household) {
    throw new AppError("User is not part of any household!", 404);
  }
  return household;
};

export const updateHousehold = async (householdId, updateData) => {
  const { newRule, updateRule, deleteRuleId, ...otherUpdates } = updateData;

  const updateOperations = {};

  if (Object.keys(otherUpdates).length > 0) {
    updateOperations.$set = otherUpdates;
  }

  if (newRule) {
    updateOperations.$push = {
      houseRules: newRule,
    };
  }

  if (updateRule && updateRule.ruleId) {
    updateOperations.$set = {
      ...updateOperations.$set,
      "houseRules.$[elem].rule": updateRule.rule,
    };

    updateOperations.arrayFilters = [{ "elem._id": updateRule.ruleId }];
  }

  if (deleteRuleId) {
    updateOperations.$pull = {
      houseRules: { _id: deleteRuleId },
    };
  }

  const household = await Household.findByIdAndUpdate(
    householdId,
    updateOperations,
    {
      new: true,
      runValidators: true,
      arrayFilters: updateOperations.arrayFilters,
    }
  );

  if (!household) {
    throw new AppError("No household found with that ID", 404);
  }

  return household;
};
export const deleteHousehold = async (householdId) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const household = await Household.findById(householdId).session(session);
    if (!household) {
      throw new AppError("No household found with that ID", 404);
    }

    // Find all users in the household and remove their household reference.
    await User.updateMany(
      { household: householdId },
      { $unset: { household: "", role: "" } }, // Remove household and role fields
      { session }
    );

    // NOTE: In a real app, you would also delete associated chores, expenses, etc. here.

    await household.deleteOne({ session });

    await session.commitTransaction();
    return;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const isUserHouseholdAdmin = async (userId, householdId) => {
  const user = await User.findOne({ _id: userId, household: householdId });
  return user && user.role === "admin";
};

export const getHouseholdInviteLink = async (householdId, email) => {
  const household = await Household.findById(householdId);
  if (!household) {
    throw new AppError("No household found with that ID", 404);
  }

  const token = crypto.randomUUID();
  const invite = await Invitation.create({
    householdId,
    token,
    email,
    invitedBy: household.createdBy,
    url: `${process.env.FRONTEND_URL}/join-household/${token}`,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000,
  });
  return {
    inviteLink: `${process.env.FRONTEND_URL}/join-household/${invite.token}`,
    expiresAt: invite.expiresAt,
  };
};

export const acceptHouseholdInvite = async (token) => {
  try {
    const invite = await Invitation.findOne({
      token,
      expiresAt: { $gt: Date.now() },
    });

    if (!invite || invite.status !== "pending") {
      throw new AppError("Invalid or expired invitation link.", 400);
    }
    const userDoc = await User.findOne({ email: invite.email });
    if (!userDoc) {
      return {
        ok: false,
        message: "User not found. Please create an account first.",
      };
    }
    if (userDoc.household) {
      throw new AppError("You are already part of a household.", 400);
    }
    await Household.findByIdAndUpdate(invite.householdId, {
      $addToSet: {
        members: { userId: userDoc._id },
        role: "member",
      },
    });

    invite.status = "accepted";
    await invite.save();
    return {
      message:
        "Successfully joined the household. You will be redirected to create/login to your account.",
    };
  } catch (error) {
    throw error;
  }
};
