import AppError from "../utils/AppError.js";
import jwtService from "../index.js";
import User from "../models/User.js";

const verifyUser = function (req, res, next) {
  const jwt = req.headers["authorization"].split(" ")[1];
  try {
    if (!jwt) {
      throw new AppError("Unauthorized access", 401);
    }
    const verifiedToken = jwtService.verifyAccessToken(jwt);
    if (!verifiedToken) {
      throw new AppError("Invalid/Expired token. PLease login aain", 401);
    }
    User.findById(verifiedToken.id)
      .select("household email _id role")
      .then((user) => {
        if (!user) {
          throw new AppError("User associated with token not found", 401);
        }
        req.user = user;
        next();
      });
  } catch (error) {
    next(error);
  }
};

export default verifyUser;
