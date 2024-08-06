import express from "express";
import { loggedUser, userLogin, userLogout, userRegis } from "../Controller/userControl";
import ValidateToken from "../middleware/validateToken";

const userRouter = express.Router();

userRouter.get("/");
userRouter.post("/register", userRegis);
userRouter.post("/login", userLogin);
userRouter.post("/logout", userLogout);
userRouter.get("/current", ValidateToken, loggedUser);

export default userRouter;
