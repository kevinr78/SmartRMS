import dotenv from 'dotenv';
import express from 'express';
import run from './config/DB.js';
import globalErrorHandler from './middleware/Error/errorHandler.js';
import AppError from './utils/AppError.js';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import helmet from 'helmet';
import path from 'path';

const app = express();

dotenv.config();
cors();
app.use(morgan('combined',{
  stream:fs.createWriteStream(path.join(path.dirname(import.meta.filename),'access.log'),{
    flags:'a'
  })
}));

app.use(helmet());
app.use(express.json());

run();

// Handle undefined routes
/* app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
}); */

app.use(globalErrorHandler);

app.listen(process.env.PORT || 3000, ()=>{
  console.log("Server started succesfully")
})