import express from "express";
import { protectRoute } from "../middelware/protectRoute.js";
import { signup,login,logout,authcheck } from "../controller/auth.controller.js";

const routes = express.Router();

routes.post("/signup",signup)
routes.post("/login",login);
routes.post("/logout",logout)
routes.get("/authcheck",protectRoute,authcheck)


export default routes;