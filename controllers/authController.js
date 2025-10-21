import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const googleAuthRedirect = (req, res) => {
  res.redirect("/");
};

export const getUploadPassesPage = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "passes.html"));
};

export const getQPassPage = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "view-pass.html"));
};

