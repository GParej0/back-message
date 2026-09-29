import express from "express";
import cors from "cors"
import path from "node:path"
import authRouter from "./routes/authRouter";
import messageRouter from "./routes/messageRouter";
import userRouter from "./routes/userRouter";
import { Request, Response, NextFunction } from "express"

const app = express();

app.use(express.json());
app.use(cors())

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/auth", authRouter);
app.use("/messages", messageRouter);
app.use("/users", userRouter)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message || "Internal Server Error" });
});

app.listen(process.env.PORT || 3000, () => { console.log("El puerto 3000 se está escuchando") })