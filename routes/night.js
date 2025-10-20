import express from "express";
import { registerNight } from "../controllers/nightController.js";

const router = express.Router();

router.post("/nights", registerNight);

export default router;

