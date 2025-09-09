import AppError from "../utils/AppError.js";
import JwtService from '../utils/jwt.js';

const verifyUser = function(req,res,next){
  const jwt = req.headers["authorization"].split(" ")[1];
  try {
    if(!jwt){
      throw new AppError("Unauthorized access", 401);
    }
    const verifiedToken = JwtService.verifyAccessToken(jwt);
    
    if(!verifiedToken){
      throw new AppError("Invalid/Expired token. PLease login aain", 401);
    }

    
    req.user = verifiedToken;
    next();
  } catch (error) {
    next(error)
  }
}

export default verifyUser