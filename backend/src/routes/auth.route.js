import express from "express";

// Controllers import
import {
  loginController,
  logoutController,
  signupController,
  checkAuthController,
} from "../controllers/auth.controller.js";
import protectedRoute from "../middlewares/protect.middleware.js";

const router = express.Router();

// Auth routes
router.post("/signup", signupController); // Signup route
router.post("/login", loginController); // Login route
router.post("/logout", protectedRoute, logoutController); // Logout route
router.post("/checkAuth", protectedRoute, checkAuthController);

export default router;
