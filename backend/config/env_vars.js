import dotenv from "dotenv"

dotenv.config()

export const ENV_VARS={
    MONGO_URI:process.env.MONGO_URI,
    PORT:process.env.PORT || 3000,
    JWT_SECRET:process.env.JWT_SECRET || "secret",
    NODE_ENV:process.env.NODE_ENV || "development",
    TMDB_API_KEY:process.env.TMDB_API_KEY || "your_api_key",
}