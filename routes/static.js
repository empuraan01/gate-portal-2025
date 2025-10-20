import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { processImage } from "../controllers/imageController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/register-night", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "nights.html"));
});

router.get("/get-pass", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "pass.html"));
});

router.get("/image", processImage);

export default router;

