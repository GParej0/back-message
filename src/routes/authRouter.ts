import { Router } from "express";
import * as auth from "../controllers/authControllers"

const authRouter = Router()

authRouter.post("/signup", auth.newUser)
authRouter.post("/login", auth.login)

export default authRouter