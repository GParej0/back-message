import { Router } from "express";
import * as message from "../controllers/messageControllers"
import verifyToken from "../middleware/middleware";

const messageRouter = Router();

messageRouter.use(verifyToken)

messageRouter.get("/:userId", message.getMessagesWithUser);
messageRouter.post("/:userId/send", message.sendMessage);

export default messageRouter