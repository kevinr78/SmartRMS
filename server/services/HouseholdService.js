import Household from '../models/Household.js';
import User from '../models/User.js'; // Assuming you have a User model
import AppError from '../utils/AppError.js';
import mongoose from 'mongoose';



export const createHousehold = async (householdData, creatorId) => {
  // Start a transaction to ensure both household creation and user update succeed or fail together.
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const household = new Household({
      ...householdData,
      createdBy: creatorId,
    });

    await household.save({ session });

    // Update the user who created the household to link them to it.
    await User.findByIdAndUpdate(
      creatorId,
      { household: household._id, role: 'admin' }, // Assign admin role to the creator
      { session, new: true }
    );

    await session.commitTransaction();
    return household;
  } catch (error) {
    await session.abortTransaction();
    // Handle potential duplicate key errors for invitationCode if it's generated on creation
    if (error.code === 11000) {
        throw new AppError('A household with that identifier already exists.', 409);
    }
    throw error;
  } finally {
    session.endSession();
  }
};


export const getHouseholdById = async (householdId) => {
  const household = await Household.findById(householdId).populate({
      path: 'members',
      select: 'firstName lastName email profileImage',
      options: {virtuals:true}
  });

  if (!household) {
    throw new AppError('No household found with that ID', 404);
  }
  return household;
};


export const updateHousehold = async (householdId, updateData) => {
  const household = await Household.findByIdAndUpdate(householdId, updateData, {
    new: true, // Return the modified document rather than the original
    runValidators: true, // Ensure the update runs against the schema's validators
  });

  if (!household) {
    throw new AppError('No household found with that ID', 404);
  }
  return household;
};


export const deleteHousehold = async (householdId) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const household = await Household.findById(householdId).session(session);
        if (!household) {
            throw new AppError('No household found with that ID', 404);
        }

        // Find all users in the household and remove their household reference.
        await User.updateMany(
            { household: householdId },
            { $unset: { household: "" , role: ""} }, // Remove household and role fields
            { session }
        );

        // NOTE: In a real app, you would also delete associated chores, expenses, etc. here.
        
        await household.deleteOne({session});

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
    return user && user.role === 'admin';
};
