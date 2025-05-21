import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Error fct
import { serverError } from "../tools/error.js";

// Global
const regexEmail = /^\S+@\S+\.\S+$/;

export const signupController = async (req, res) => {
  const { username, email, password } = req.body;

  console.log(req.body);

  const verifiedEmail = regexEmail.exec(email);

  if (!username.trim() || !email.trim() || !password.trim()) {
    return res.status(400).json({ message: "All fields Required" });
  }

  if (!verifiedEmail) {
    return res.status(400).json({ message: "No Valid Email" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password Too Short" });
  }

  try {
    const user = await User.findOne({ email: email.trim() });

    // User already exist
    if (user) {
      return res.status(400).json({ message: "Email Already Used" });
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const newUser = await new User({
      username: username.trim(),
      email: email.trim(),
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({ message: "Successfully Registered" });
  } catch (error) {
    serverError("signup", res, error);
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const verifiedEmail = regexEmail.exec(email);

    if (!email.trim() || !password.trim()) {
      return res.status(400).json({ message: "All fields Required" });
    }

    if (!verifiedEmail) {
      return res.status(400).json({ message: "No Valid Email" });
    }

    const user = await User.findOne({ email: email.trim() });

    if (!user) {
      return res.status(400).json({ message: "Invalid Identifiers" });
    }

    const isValidPassword = await bcrypt.compare(
      password.trim(),
      user.password
    );

    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid Identifiers" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    await res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "Strict",
        maxAge: 7 * 24 * 3600 * 1000,
      })
      .status(200)
      .json({
        message: "Successfully Connected",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
  } catch (error) {
    serverError("loggin", res, error);
  }
};

export const logoutController = async (req, res) => {
  try {
    await res
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "Strict",
      })
      .status(200)
      .json({ message: "Successfully Disconnected" });
  } catch (error) {
    serverError("logout", res, error);
  }
};

export const checkAuthController = async (req, res) => {
  res.status(200).json(req.user);
};
