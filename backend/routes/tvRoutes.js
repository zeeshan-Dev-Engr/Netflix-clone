import express from "express";
import { trendingtv, gettvtrailer, gettvdetails,getsimilartv,gettvByCategory } from "../controller/tv.controller.js";

const routes = express.Router();

routes.get("/trending",trendingtv)
routes.get("/:id/trailer",gettvtrailer)
routes.get("/:id/details",gettvdetails)
routes.get("/:id/similarmovies",getsimilartv)
routes.get("/:category",gettvByCategory)

export default routes;