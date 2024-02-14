import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import { session } from "passport";

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user
  });
});





router.get("/admin", ensureAuthenticated, (req, res) => {
    // @ts-ignore
    req.sessionStore.all((err: any, sessions: any) => {
      if (err) {
        throw err;
      }
      const session: any = [];
      const sessionInfo = Object.keys(sessions);
      console.log(sessionInfo)
      sessionInfo.forEach((sessionID) => {
        const sessionData = sessions[sessionID];
        const userObject = {
          sessionID: sessionID,
          userID: sessionData.passport.user,
        };
        session.push(userObject);
      });
      console.log(session);
      res.render("admin", { user: req.user, sessions: session });
    });
  }
);

router.post("/revoke-session", (req, res) => {
  const sessionID = req.body.sessionID;
  if (sessionID) {
    req.sessionStore.destroy(sessionID, (err) => {
      if (err) {
        console.error("Error destroying session:", err);
        res.status(500).send("Error destroying session");
      } else {
        res.status(200).send("Session destroyed successfully");
      }
    });
  } else {
    res.status(400).send("Invalid sessionID");
  }
});


export default router;
