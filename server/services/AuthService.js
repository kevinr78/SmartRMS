import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import jwtService from "../index.js";
import Invitation from "../models/Invitation.js";
import Household from "../models/Household.js";
const registerUser = async function (userData) {
  const { firstName, lastName, email, password, token } = userData;

  if (!userData) {
    throw new AppError("Missing required fields", 400);
  }

  try {
    const doesUserExist = await User.findOne({ email });
    if (doesUserExist) {
      throw new AppError("User already exists", 400);
    }

    const userModel = new User({
      firstName,
      lastName,
      email,
      password,
    });

    if (token) {
      const doesInviteExist = await Invitation.findOne({
        token,
        status: "pending",
      });
      if (!doesInviteExist) {
        throw new AppError(
          "Invalid or expired invitation link. Please ask admin to send invite again and login again",
          400
        );
      }
      const household = await Household.findById(doesInviteExist.householdId);
      if (!household) {
        throw new AppError("No household found with that ID", 404);
      }
      household.members.push({ userId: userModel._id, role: "member" });
      userModel.household = doesInviteExist.householdId;
      await household.save();
    }
    const user = await userModel.save();
    if (!user) {
      throw new AppError("Error while creating user", 400);
    }

    return user;
  } catch (error) {
    throw new AppError(
      error.message || "Something went wrong while registering user",
      400
    );
  }
};

const loginUser = async function (userData) {
  if (!userData) {
    throw new AppError("Missing required fields", 400);
  }
  const user = await User.findOne({ email: userData.email }).select(
    "+password"
  );
  try {
    if (!user) {
      throw new AppError("No user with provided email", 400);
    }

    const isPasswordCorrect = await user.comparePassword(userData.password);
    if (!isPasswordCorrect) {
      throw new AppError("Incorrect Password", 400);
    }

    const accessToken = jwtService.generateAccessToken({
      email: user.email,
      id: user._id,
    });
    const refreshToken = jwtService.generateRefreshToken({
      email: user.email,
      id: user._id,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        email: user.email,
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        household: user.household,
        role: user.role,
      },
    };
  } catch (error) {
    throw new AppError(error.message || "Error while logging in", 400);
  }
};

const refreshAccessToken = function (request, res) {
  if (!request.body.token) {
    throw new AppError("No token present", 401);
  }
  const decodedToken = jwtService.verifyRefreshToken(request.body.token);

  const newAccessToken = jwtService.generateAccessToken({
    id: decodedToken.id,
    email: decodedToken.email,
  });

  return res.json({ accessToken: newAccessToken });
};
export { loginUser, registerUser, refreshAccessToken };
