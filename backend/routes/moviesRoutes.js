import express from "express";
import { trendingmovie, getmovitrailer, getmovidetails, getsimilarmovies,getmoviesByCategory } from "../controller/movies.controller.js";

const routes = express.Router();

routes.get("/trending",trendingmovie)
routes.get("/:id/trailer",getmovitrailer)
routes.get("/:id/details",getmovidetails)
routes.get("/:id/similarmovies",getsimilarmovies)
routes.get("/category/:category",getmoviesByCategory)

export default routes;