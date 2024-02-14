import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

declare module "express-session" {
  interface SessionData {
    messages: string[];
  }
}

router.get("/login", forwardAuthenticated, (req, res) => {
  const messages = req.session.messages || [];
  req.session.messages = [];
  res.render('login', { messages });
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    /* FIX ME: 😭 failureMsg needed when login fails */
    failureMessage: true
  }), 
  (req, res) => {
    if (req.user && req.user.role === "admin") {
      res.redirect("/admin");
    } else {
      res.redirect("/dashboard");
    }
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

router.get('/github',
  passport.authenticate('github', { scope: [ 'user:email' ] })
);

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/dashboard?user=' + JSON.stringify(req.user));
  }
);

export default router;
