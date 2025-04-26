import { User } from "../models/user.model.js"; // notice the curly braces
import bcrypt from "bcryptjs";     
import { generateToken } from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or Email already in use" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const profile_pic = ["/Avatar1.jpg", "/Avatar3.jpg"];
    const image = profile_pic[Math.floor(Math.random() * profile_pic.length)];

    const newUser = await User.create({
      username,
      email,
      password : hashedPassword,
      image,
    });

    if(newUser){
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({sucess:true, user: { ...newUser._doc, password: ""}});
    }

   
    
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error ls" });
  }
}




export async function login(req, res) {
  try
  {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      generateToken(user._id, res);
      res.status(200).json({sucess:true, user: { ...user._doc, password: ""}});
    }
    catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Server error" });
    }
}

// logout functionality
export async function logout(req, res) {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).json({sucess:true, message: "Logout successful" });
  }
  catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({sucess:false, message: "Server error" });
  }
}

export async function authcheck(req,res){
  try {
    res.status(200).json({sucess:true, user: req.user});
  } catch (error) {
    console.error("Auth check error:", error.message);
    res.status(500).json({sucess:false, message: "Server error" });
    
  }
}
