import mongoose from "mongoose";
import dotenv from "dotenv";
import { Recipe } from "../src/models/Recipe";
import recipes from "../seeds/recipes.json";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/recipes-db";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB");

    await Recipe.deleteMany({});
    console.log("Old recipes removed");

    await Recipe.insertMany(recipes);
    console.log("New recipes added");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
