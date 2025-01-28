
import cors from "cors";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import mongoose from "mongoose";
import { v1router } from "./routes";

const app = express();

//middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

//routes
app.use("/api/v1", v1router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message })
})

//connecting mongo db
const MONGO_URI = process.env.DATABASE_URI!;

mongoose
  .connect(MONGO_URI, { dbName: "fridgefy" })
  .then(() => {
    console.log("Connect to MONGODB database");

    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`[server]: listening at PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MONGODB database");
  });
