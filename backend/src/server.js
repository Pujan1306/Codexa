import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { ENV } from "./lib/env.js";
import { dbConnect } from "./lib/dbConnect.js";
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

// Serve frontend (SPA) from backend/public if present.
// Registered before the DB middleware so static assets don't depend on MongoDB.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../public");

if (fs.existsSync(path.join(publicDir, "index.html"))) {
  app.use(express.static(publicDir));

  // SPA fallback: any non-API route serves index.html
  app.get("/{*any}", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(publicDir, "index.html"));
  });

  console.log(`Serving frontend from ${publicDir}`);
} else {
  app.get("/", (req, res) => {
    res.json({ status: "ok", message: "Codexa API is running" });
  });
}

// DB gate: API requests wait for/ensure MongoDB connection
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
