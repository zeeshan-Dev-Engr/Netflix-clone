import express from "express";
import { searchPerson, searchMovie, searchTv, getsearchHistory, deletesearchHistory } from "../controller/search.controller.js";


const routes = express.Router();

routes.get("/person/:query",searchPerson)
routes.get("/movie/:query",searchMovie)
routes.get("/tv/:query",searchTv)
routes.get("/history",getsearchHistory)
routes.delete("/history/:id",deletesearchHistory)



export default routes;