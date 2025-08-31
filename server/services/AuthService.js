import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import JwtService from "../utils/jwt.js";

const registerUser = async function (userData) {
  const { firstName, lastName, email, password } = userData;

  if(!userData){
    throw new AppError("Missing required fields", 400)
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

    const user = await userModel.save();
    if (!user) {
      throw new AppError("Error while creating user", 400);
    }

    return user;
  } catch (error) {
    throw new AppError(error.message || "Something went wrong while registering user", 400);
  }
};

const loginUser = async function (userData) {
    if(!userData){
    throw new AppError("Missing required fields", 400)
  }
  const user = await User.findOne({ email:userData.email }).select('+password');
  try {
    if (!user) {
      throw new AppError("No user with provided email", 400);
    }

    const isPasswordCorrect = await user.comparePassword(userData.password);
    if (!isPasswordCorrect) {
      throw new AppError("Incorrect Password", 400);
    }

    const accessToken = JwtService.generateAccessToken({
      email: user.email,
      id: user._id,
    });
    const refreshToken = JwtService.generateRefreshToken({
      email: user.email,
      id: user._id,
    });

    return {
      accessToken,
      refreshToken,
      user: {
         email: user.email,
      id: user._id,
      },
    };
  } catch (error) {
    throw new AppError(error.message || "Error while logging in", 400);
  }
};

const refreshAccessToken = function(refreshToken){
  if(!refreshToken){
    throw new AppError("No token present", 401);
  }

  const decodedToken = JwtService.verifyRefreshToken(refreshToken);
  const newRefreshToken = JwtService.generateAccessToken({id:decodedToken._id,email:decodedToken.email });

  return newRefreshToken;
}
export {
  loginUser,
  registerUser,
  refreshAccessToken
}