import Recipe from "../models/recipe.model.js";

// Error fct
import { serverError } from "../tools/error.js";

// Show all recipes
// GET /api/recipe
export const getAllRecipes = async (req, res) => {
  const userId = req.user._id;

  try {
    const recipes = await Recipe.find({ author: userId });
    if (!recipes || recipes.length < 1) {
      return res.status(404).json({ message: "No Recipes Found" });
    }

    res.status(200).json({ recipes });
  } catch (error) {
    serverError("getAllRecipes", res, error);
  }
};

// Show one recipe
// GET /api/recipe/:id
export const getRecipeById = async (req, res) => {
  const userId = req.user._id;

  try {
    const recipe = await Recipe.findOne({ author: userId, _id: req.params.id });

    if (!recipe) {
      return res.status(404).json({ mesage: "No Recipe Found" });
    }

    res.status(200).json({ recipe });
  } catch (error) {
    serverError("getRecipeById", res, error);
  }
};

// Create recipe
// POST /api/recipe
export const createRecipe = async (req, res) => {
  const userId = req.user._id;
  const { title, description, items, steps } = req.body;

  if (
    !title ||
    !description ||
    !steps ||
    !Array.isArray(items) ||
    !Array.isArray(steps)
  ) {
    return res.status(400).json({ message: "All Fields Required" });
  }

  try {
    const newRecipe = await new Recipe({
      author: userId,
      title,
      description,
      items,
      steps,
    });

    await newRecipe.save();

    res.status(200).json({ newRecipe });
  } catch (error) {
    serverError("createRecipe", res, error);
  }
};

// Update recipe
// PUT /api/recipe/:id
export const updateRecipe = async (req, res) => {
  const userId = req.user._id;

  const { modifications } = req.body;

  if (
    !modifications ||
    Array.isArray(modifications) ||
    Object.keys(modifications).length < 1 ||
    typeof modifications !== "object"
  ) {
    return res.status(400).json({ message: "No Update Sended" });
  }

  try {
    const allowedFields = Object.keys(Recipe.schema.paths).filter(
      (key) => !["_id", "__v", "createdAt", "updatedAt", "author"].includes(key)
    );

    const filteredModifications = Object.keys(modifications)
      .filter((key) =>
      allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = modifications[key];
        return obj;
      }, {});

    const updatedRecipe = await Recipe.findOneAndUpdate(
      { author: userId, _id: req.params.id },
      { $set: filteredModifications },
      { new: true, runValidators: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ mesage: "Recipe Not Found" });
    }

    res.status(200).json({
      message: "Updated Successfully",
      updatedRecipe,
    });
  } catch (error) {
    serverError("updateRecipe", res, error);
  }
};

// Delete recipe
// DELETE /api/recipe/:id
export const deleteRecipe = async (req, res) => {
  const userId = req.user._id;

  try {
    const deletedRecipe = await Recipe.findOneAndDelete({
      author: userId,
      _id: req.params.id,
    });

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe Not Found" });
    }

    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    serverError("deleteRecipe", res, error);
  }
};
