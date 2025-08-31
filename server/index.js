import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/DB.js';
import globalErrorHandler from './middleware/Error/errorHandler.js';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import helmet from 'helmet';
import path from 'path';
import authRouter from './routes/auth.js';

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
app.use('/auth', authRouter);

// Handle undefined routes
/* app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
}); */

app.use(globalErrorHandler);

const startServer = async () => {
  try {
    // 1. Connect to the database
    await connectDB();

    // 2. Start the server only after the DB is connected
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server started successfully on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start the server", error);
  }
};

startServer();