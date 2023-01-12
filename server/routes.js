import express from "express";
import apiController from "./controller/api.controller";
const apiRouter = express.Router();

apiRouter.post("/api/url", new apiController().submitWebsite);

export default apiRouter;
