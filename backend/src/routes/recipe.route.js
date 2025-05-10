import express from "express";

// Protected route
import protectedRoute from "../middlewares/protect.middleware.js";

const router = express.Router();

router.post("/", protectedRoute, (req, res) => {
  res.status(200).json({ message: "test connected" });
});

export default router;
