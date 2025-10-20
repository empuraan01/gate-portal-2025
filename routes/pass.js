import express from "express";
import upload from "../config/multer.js";
import {
  uploadPasses,
  getPass,
  viewPass,
  //viewPassByEmail,
} from "../controllers/passController.js";

const router = express.Router();

router.post("/passes", upload.single("file"), uploadPasses);

router.get("/pass", getPass);

router.get("/view-pass", viewPass);

//router.get("/view-pass2", viewPassByEmail);

export default router;

