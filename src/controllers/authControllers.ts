import * as db from "../db/authQuery"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

async function newUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            res.status(400).json({
                error: "Please fill all the empty spaces"
            })
            return
        }

        if (await db.findUserByEmail(email)) {
            res.status(409).json({
                error: "Email already in use"
            })
            return
        }

        if (await db.findUserByUserName(userName)) {
            res.status(409).json({
                error: "Username already in use"
            })
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.createUser(userName, email, hashedPassword);

        res.status(201).json({
            message: "User successfully created",
        });

    } catch (error) {

        next(error)

    }
}

async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { identifier, password } = req.body;

        if (!identifier || !password) {
            res.status(400).json({
                error: "Please fill all the empty spaces"
            })
            return
        }

        const user = await db.findUserByIdentifier(identifier);

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, user: user.username }, process.env.JWT_SECRET!, { expiresIn: "1d" })
        const { password: _, ...userWithoutPassword } = user
        res.status(200).json({
            message: "Successfull login",
            token,
            user: userWithoutPassword
        })
    } catch (err) {
        next(err);
    }
}

export { newUser, login }