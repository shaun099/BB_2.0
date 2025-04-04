import { exchangeCodeForToken } from "../service/auth.service.js";

export const handleOAuthCallback = async (req, res) => {
  const { code, state } = req.query;

  if (!state || state !== req.session.state) {
    return res.status(400).json({ message: "Invalid state" });
  }

  // Success — clear state and continue
  req.session.state = null;

  try {
    const { access_token, patient } = await exchangeCodeForToken(code);
    req.session.access_token = access_token;
    req.session.patient_id = patient;

    res.redirect("http://localhost:5173");
    //res.redirect("/api/patient");
  } catch (error) {
    console.error("OAuth callback error:", error);
    res.status(500).json({ message: "OAuth Error" });
  }
};
