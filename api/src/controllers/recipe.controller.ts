import { Request, Response } from "express";
import { Recipe } from "../models/Recipe";
import mongoose from "mongoose";

export const getAll = async (req: Request, res: Response) => {
  try {
    const { ingredient } = req.query;

    let filter = {};

    if (ingredient) {
      filter = {
        ingredients: {
          $regex: new RegExp(ingredient as string, "i"),
        },
      };
    }

    const recipes = await Recipe.find().where({ deleted: false, ...filter });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const recipe = await Recipe.findById(id).where({ deleted: false });
    if (!recipe) res.status(404).json({ message: "Recipe not found" });

    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();

    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, {
      ...req.body,
      updatedAt: Date.now(),
    }).where({ deleted: false });
    if (!recipe) res.status(404).send("Recipe not found");

    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, {
      ...req.body,
      updatedAt: Date.now(),
      deleted: true,
    });
    if (!recipe) res.status(404).send("Recipe not found");

    res.json({ message: `Recipe with ID ${req.params.id} deleted` });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteAll = async (req: Request, res: Response) => {
  try {
    await Recipe.deleteMany();

    res.json({ message: "All recipes deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
