import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import moviesRoutes from './routes/moviesRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import tvRoutes from './routes/tvRoutes.js';
import { ENV_VARS } from "./config/env_vars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middelware/protectRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// important for __dirname in ES6 modules

const app = express();

// Setup __dirname correctly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ENV_VARS.NODE_ENV === "production" 
    ? "https://your-frontend-domain.vercel.app"  
    : "http://localhost:5173",
  credentials: true
}));

// Your API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, moviesRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

// Serve Frontend
if (ENV_VARS.NODE_ENV === "production") {
  // Get the root directory path (one level up from backend)
  const rootDir = path.resolve(__dirname, '..');
  
  app.use(express.static(path.join(rootDir, "frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(rootDir, "frontend", "dist", "index.html"));
  });
}

app.get("/", (req, res) => {
  res.send("Backend is Running 🚀");
});

// Start server
const PORT = ENV_VARS.PORT || 3000;

app.listen(PORT, () => {
  console.log('✅ Server running on port: ' + PORT);
  connectDB();
});
