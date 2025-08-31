import AppError from "../utils/AppError.js";
import { loginUser, registerUser } from "../services/AuthService.js";

const register = async function (req, res, next) {
  const { firstName, lastName, email, password } = req.body;
  try {
    const registering = await registerUser(req.body);
    if (!registering) {
      throw new AppError("Error while registering user", 400);
    }
    return res.status(201).json({
      message: "User Registered Successfully",
      user: {
        id: registering._id,
        email: registering.email,
        name: registering.fullName,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async function (req, res, next) {
  try {
    const loggingIn = await loginUser(req.body);
    if (!loggingIn) {
      throw new AppError("Error while logging in user", 400);
    }

    return res.status(201).json({
      message: "User logged in Successfully",
      accessToken: loggingIn.accessToken,
      refreshToken:loggingIn.refreshToken,
      user:loggingIn.user
    });
  } catch (error) {
    next(error);
  }
};

export { login, register };
