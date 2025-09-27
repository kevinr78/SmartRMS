import * as HouseholdService from '../services/HouseholdService.js';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';

// A wrapper to catch errors from async functions
const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export const createHousehold = catchAsync(async (req, res, next) => {
  const household = await HouseholdService.createHousehold(req.body, req.user.id);
  res.status(201).json({
    ok:true,
    message: "Houseolde created successfully!",
    data: {
      household,
    },
  });
});

export const getHousehold = catchAsync(async (req, res, next) => {
  const user =await User.findById(req.user.id);
  const household = await HouseholdService.getHouseholdById(user.household);
  res.status(200).json({
    ok:true,
    message:'Fetch details successfully',
    data: {
      household,
    },
  });
});

export const updateHousehold = catchAsync(async (req, res, next) => {
  const household = await HouseholdService.updateHousehold(req.params.id, req.body);
  res.status(200).json({
    ok:true,
    message:'Data updated successfully',
    data: {
      household,
    },
  });
});

export const deleteHousehold = catchAsync(async (req, res, next) => {
  await HouseholdService.deleteHousehold(req.params.id);
  res.status(204).json({
    ok:true,
    message:'Household deleted successfully',
    data: null,
  });
});

// Middleware to check for admin privileges before updating or deleting
export const protectAdminRoutes = catchAsync(async (req, res, next) => {
    const householdId = req.params.id;
    const userId = req.user.id;
    
    const isAdmin = await HouseholdService.isUserHouseholdAdmin(userId, householdId);
    if (!isAdmin) {
        return next(new AppError('You do not have permission to perform this action.', 403));
    }
    next();
});
