import { Router } from "express"; 3
import * as user from "../controllers/userControllers"
import verifyToken from "../middleware/middleware";

const userRouter = Router();

userRouter.use(verifyToken);

userRouter.get("/", user.listUsers);
userRouter.get("/me", user.getProfile);
userRouter.put("/me", user.updateProfile)

export default userRouter