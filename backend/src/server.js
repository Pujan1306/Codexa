import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
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
  console.error("UNCAUGHT EXCEPTION:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION:", reason);
});

// Middleware
app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

// Mount routes
app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use("/api/sessions", sessionRoute);
app.use("/api/chats", chatRoute);
app.use("/api/execution", executionRoute)


// Start server
async function startServer() {
    try {
        await dbConnect();
        
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();