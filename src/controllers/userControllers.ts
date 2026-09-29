import * as db from "../db/userQuery"
import { Request, Response, NextFunction } from "express"

async function listUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const currentUserId = (req as any).user.id;
        const users = await db.getAllUsers(currentUserId);

        res.status(200).json({
            message: "Users listed",
            users
        });
    } catch (error) {
        next(error)
    }
}

async function getProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req as any).user.id;
        const user = await db.getUserById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            message: "Profile retrieved",
            user
        });
    } catch (error) {
        next(error);
    }
}

async function updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req as any).user.id;
        const { description } = req.body;
        let avatar: string | undefined = undefined;
        if (req.file) {
            avatar = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        }

        if (!description && !avatar) {
            res.status(400).json({
                error: "Please fill at least one of the empty spaces"
            })
            return
        }
        const updatedUser = await db.updateUserProfile(userId, { description, avatar })
        res.status(200).json({ message: "User updated", user: updatedUser })
    } catch (error) {
        next(error)
    }
}



export { listUsers, getProfile, updateProfile }