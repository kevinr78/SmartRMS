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
        email:user.email,
        _id:user._id,
        firstName:user.firstName,
        lastName:user.lastName,
        household:user.household,
        role:user.role,
      },
    };
  } catch (error) {
    throw new AppError(error.message || "Error while logging in", 400);
  }
};

const refreshAccessToken = function(request, res){
  if(!request.body.token){
    throw new AppError("No token present", 401);
  }
  const decodedToken = JwtService.verifyRefreshToken(request.body.token);

  const newAccessToken = JwtService.generateAccessToken({id:decodedToken.id,email:decodedToken.email });

  return res.json({accessToken:newAccessToken});
}
export {
  loginUser,
  registerUser,
  refreshAccessToken
}