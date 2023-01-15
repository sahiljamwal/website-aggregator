import express from "express";
import apiController from "./controller/api.controller.js";
const apiRouter = express.Router();

apiRouter.post("/url", new apiController().submitWebsite);

export default apiRouter;
