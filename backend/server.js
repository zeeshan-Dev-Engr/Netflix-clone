import express from "express";

import authRoutes from './routes/auth.js';
import moviesRoutes from './routes/moviesRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import tvRoutes from './routes/tvRoutes.js';
import { ENV_VARS } from "./config/env_vars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middelware/protectRoute.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url'; // important for __dirname in ES6 modules

const app = express();

// Setup __dirname correctly
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Your API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, moviesRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

// Serve Frontend
// if (ENV_VARS.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
// }

// Start server
const PORT = ENV_VARS.PORT || 3000;

app.listen(PORT, () => {
  console.log('✅ Server running on port: ' + PORT);
  connectDB();
});
