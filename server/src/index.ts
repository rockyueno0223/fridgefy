import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import "dotenv/config";
import express from "express";
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
app.use(clerkMiddleware());

//routes
app.use("/api/v1", v1router);

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
