import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

export default router;
