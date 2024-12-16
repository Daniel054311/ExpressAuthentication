
import { Router } from "express";
import AuthControllers from "../controllers/auth.controller";
import { authenticate } from "../middlewares/authenticate.middleware";



const authRouter = Router();

authRouter.post("/register", AuthControllers.register);
authRouter.post("/login", AuthControllers.login);
authRouter.post("/refresh-token",authenticate, AuthControllers.refreshToken);

export default authRouter;
