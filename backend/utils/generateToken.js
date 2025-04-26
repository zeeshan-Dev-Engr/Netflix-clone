import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/env_vars.js";

export const generateToken = (userid, res) => {
  const token = jwt.sign({ id: userid },ENV_VARS.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt-netflix", token, {
    httpOnly: true,
    secure: ENV_VARS.NODE_ENV === "production",
    maxAge: 15 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    sameSite: "strict"
  });

  return token;
}
           