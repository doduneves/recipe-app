import { Router } from "express";
import {
  getAll,
  create,
  update,
  deleteRecipe,
  getById,
  deleteAll,
} from "../controllers/recipe.controller";

const router = Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteRecipe);
router.delete("/all", deleteAll);

export default router;
