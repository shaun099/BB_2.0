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
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true in production with HTTPS
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
