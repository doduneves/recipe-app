import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import recipeRoutes from './routes/recipe.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Recipe API is running!");
});
app.use('/api/recipes', recipeRoutes);


mongoose
  .connect(process.env.MONGO_URI || "", {})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error("MongoDB connection error:", error));
