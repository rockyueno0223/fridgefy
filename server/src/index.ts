import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import "dotenv/config";
import express from "express";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173"
  })
);

app.use(clerkMiddleware());

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`[server]: listening at PORT ${PORT}`);
});