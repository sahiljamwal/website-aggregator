import express from "express";
import cors from "cors";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

/** @description health check route */
app.get("/api", (req, res) => {
  return res.status(200).json({ status: "OK" });
});

app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));
