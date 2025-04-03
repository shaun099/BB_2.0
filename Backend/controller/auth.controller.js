import { exchangeCodeForToken } from "../service/auth.service.js";

export const hanldeOAuthCallback = async (req, res) => {
  try {
    if (req.query.state !== req.session.state) {
      throw new Error("State mismatch");
    }

    const { accessToken, patientId } = await exchangeCodeForToken(
      req.query.code
    );
    req.session.bbAccessToken = accessToken;
    req.session.patientId = patientId;

    res.redirect("/api/patient");
  } catch (error) {
    console.error("Auth error:", error);
    res.status(500).send("Authentication failed");
  }
};
