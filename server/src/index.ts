import { AuthObject, clerkMiddleware } from "@clerk/express";
import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { v1router } from "./routes";
import { UserModel } from "./models/user.model";

declare global {
    namespace Express {
        interface Request {
            auth: AuthObject;
        }
    }
}

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

// middleware
app.get("/current-user", async (req, res) => {
    // @ts-ignore
    const currentUser = await clerkClient.users.getUser(req.auth.userId);

    res.json(currentUser);
});

// 1 - validate user is authenticated
app.use(async (req, res, next) => {
    const userId = req.auth.userId;

    if (!userId) {
        res.status(401).json({ message: "Unauthenticated!!" });
        return;
    }
    next();
});
// 2 - check if the user is already existing, if not, create user in your db
app.use(async (req, res, next) => {
    const user = await UserModel.findOne({ userId: req.auth.userId });

    if (!user) {
        const newUser = new UserModel({ userId: req.auth.userId });
        await newUser.save();
    }

    next();
});

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
