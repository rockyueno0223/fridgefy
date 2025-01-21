import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173"
  })
);
app.use(clerkMiddleware());


//connecting mongo db 
const MONGO_URI = process.env.DATABASE_URI!

mongoose
  .connect(MONGO_URI, { dbName: 'fridgefy' })
  .then(() => {
    console.log('Connect to MONGODB database')

    const PORT = process.env.PORT
    app.listen(PORT, () => {
      console.log(`[server]: listening at PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MONGODB database')
  })