import "dotenv/config";
import express from "express";
import connectDB from "./config/DB.js";
import globalErrorHandler from "./middleware/Error/errorHandler.js";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import helmet from "helmet";
import path from "path";
import JwtService from "./utils/jwt.js";

const jwtService = new JwtService();
export default jwtService;

import authRouter from "./routes/auth.js";
import householdRouter from "./routes/household.js";
import expenseRouter from "./routes/expense.js";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(
  morgan("combined", {
    stream: fs.createWriteStream(
      path.join(path.dirname(import.meta.filename), "access.log"),
      {
        flags: "a",
      }
    ),
  })
);

app.use(helmet());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/household", householdRouter);
app.use("/api/expense", expenseRouter);

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
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server started successfully on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server", error);
  }
};

startServer();
