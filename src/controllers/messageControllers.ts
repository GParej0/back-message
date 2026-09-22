import * as db from "../db/messageQuery"
import { Request, Response, NextFunction } from "express"

async function sendMessage(req: Request, res: Response, next: NextFunction) {

    try {
        const { content } = req.body;
        const receiverId = Number(req.params.userId)
        const senderId = (req as any).user.id

        if (!content || typeof content !== "string" || content.trim() === "") {
            return res.status(400).json({
                error: "Non-empty text content is required"
            });
        }

        if (!receiverId || isNaN(receiverId)) {
            return res.status(400).json({
                error: "Invalid receiver ID"
            });
        }

        const message = await db.createMessage(content, senderId, receiverId)

        res.status(201).json({
            message: "Message sent successfully",
            data: message
        })

    } catch (error) {
        next(error);
    }
}

async function getMessagesWithUser(req: Request, res: Response, next: NextFunction) {
    try {
        const userA = (req as any).user.id;
        const userB = Number(req.params.userId);

        if (!userB || isNaN(userB)) {
            return res.status(400).json({ error: "Valid recipient userId is required" });
        }

        const messages = await db.getConversation(userA, userB)

        res.status(200).json({
            messages: "List of messages retrieved",
            data: messages
        })
    } catch (error) {
        next(error)
    }
}

export { sendMessage, getMessagesWithUser }
