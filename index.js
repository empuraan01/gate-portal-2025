import express from "express";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import configurePassport from "./config/passport.js";
import { connect } from "./config/db.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
// Database Connection
connect();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "views")));
app.use(
  session({
    secret: "secret-key-ds",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
configurePassport();
app.use("/", passRoutes);
app.use("/", nightRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
