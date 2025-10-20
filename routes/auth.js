import express from "express";
import passport from "passport";
import { googleAuthRedirect, getUploadPassesPage, getQPassPage } from "../controllers/authController.js";
import { isAuthorized, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), googleAuthRedirect);

router.get("/upload-passes", isAuthorized, getUploadPassesPage);

router.get("/qpass", isAuthenticated, getQPassPage);

export default router;

