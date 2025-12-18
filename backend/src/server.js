import express from "express";
import { ENV } from "./lib/env.js";
import { dbConnect } from "./lib/dbConnect.js";
import cors from "cors";
import { auth } from "./auth/auth.js";
import { toNodeHandler } from "better-auth/node"; 
import sessionRoute from "./routes/sessionRoute.js";
import chatRoute from "./routes/chatRoute.js";
import executionRoute from "./routes/executionRoute.js";

const app = express();
const port = ENV.PORT;

// Error handlers 
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err)
});

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION:", reason);
});
// Middleware
app.set("trust proxy", 1);
app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"], credentials: true }));

// Start server
let dbReady = false;
app.use(async (req, res, next) => {
  if (!dbReady) {
    try {
      await dbConnect();
      dbReady = true;
    } catch (err) {
      console.error("DB connection failed:", err);
      return res.status(500).json({ error: "DB connection failed" });
    }
  }
  next();
});

// Mount routes
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use("/api/sessions", sessionRoute);
app.use("/api/chats", chatRoute);
app.use("/api/execution", executionRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});