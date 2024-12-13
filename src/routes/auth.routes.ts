
import { Router } from "express";
import AuthControllers from "../controllers/auth.controller";



const authRouter = Router();

authRouter.post("/register", AuthControllers.register);
authRouter.post("/login", AuthControllers.login);
authRouter.post("/refresh-token", AuthControllers.refreshToken);

export default authRouter;
