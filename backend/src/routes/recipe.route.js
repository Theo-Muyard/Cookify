import express from "express";

// Protected route
import protectedRoute from "../middlewares/protect.middleware.js";

// Controllers import
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipe.controller.js";

const router = express.Router();

// Show all recipes
// GET /api/recipe
router.get("/", protectedRoute, getAllRecipes);

// Show one recipe
// GET /api/recipe/:id
router.get("/:id", protectedRoute, getRecipeById);

// Create recipe
// POST /api/recipe
router.post("/", protectedRoute, createRecipe);

// Update recipe
// PUT /api/recipe/:id
router.put("/:id", protectedRoute, updateRecipe);

// Delete recipe
// DELETE /api/recipe/:id
router.delete("/:id", protectedRoute, deleteRecipe);

export default router;
