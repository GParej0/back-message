import { Router } from "express"; 3
import * as user from "../controllers/userControllers"
import verifyToken from "../middleware/verifyToken";
import { upload } from "../middleware/multer";

const userRouter = Router();

userRouter.use(verifyToken);

userRouter.get("/", user.listUsers);
userRouter.get("/me", user.getProfile);
userRouter.put("/me", upload.single("avatar"), user.updateProfile)

export default userRouter