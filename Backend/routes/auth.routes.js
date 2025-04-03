import { Router } from "express";
import { getAuthUrl } from "../service/auth.service.js";
import { hanldeOAuthCallback } from "../controller/auth.controller.js";

const router = Router();

router.get("/login", (req, res) => {
  const state = Math.random().toString(36).substring(7);
  req.session.state = state;
  res.redirect(getAuthUrl(state));
});

router.get("/callback", hanldeOAuthCallback);

export default router;
