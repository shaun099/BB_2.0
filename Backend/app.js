import express from "express";
import session from "express-session";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import patientRouter from "./routes/patient.routes.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only your frontend
    credentials: true, // Allow cookies/session
    exposedHeaders: ["Location"], // Expose Location header for redirects
  })
);

// Session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // Security best practice
      secure: false, // Set to true if using HTTPS
      sameSite: "Lax", // Allows cookies to be sent on same-origin requests
    },
  })
);

// Routes
app.use("/auth", authRouter);
app.use("/api", patientRouter);

app.get("/", (req, res) => {
  res.send("Blue Button API Gateway running on port 5500");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
