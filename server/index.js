import express from "express";
import cors from "cors";
import { createRequire } from "module";
import apiRouter from "./routes.js";
const require = createRequire(import.meta.url);
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

/** @description health check route */
app.get("/health", (req, res) => {
  return res.status(200).json({ status: "OK" });
});

/** @description REST Endpoint */
app.use("/api", apiRouter);

app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));
