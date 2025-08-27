import AppError from "../../utils/AppError.js";

function sendError(err, res){
  res.status(err.statusCode).json({
    message: err.message,
    status: err.status,
    error:err,
  });
}


function globalErrorHandler(err, req,res,next){
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";

  sendError(err,res);
}


export default globalErrorHandler;