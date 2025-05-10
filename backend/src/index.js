import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import protectedRoute from "./middlewares/protect.middleware.js"

// Tools
import { connectDB } from "./tools/db.js";

// Routes import
import authRoute from "./routes/auth.route.js";
import recipeRoute from "./routes/recipe.route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const PORT = process.env.PORT;

// Open the server
app.listen(PORT, () => {
  console.log("The server is running on port:", PORT);
  connectDB();
});

// Get the routes
app.use("/api/auth", authRoute);
app.use("/api/recipe", recipeRoute);

app.get("/recipe", protectedRoute, (req, res) => {
  res.send("test validé")
})