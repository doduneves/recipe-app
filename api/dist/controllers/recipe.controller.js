"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecipe = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const Recipe_1 = require("../models/Recipe");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield Recipe_1.Recipe.find();
    res.json(recipes);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = yield Recipe_1.Recipe.findById(req.params.id);
    res.json(recipe);
});
exports.getById = getById;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = new Recipe_1.Recipe(req.body);
    yield recipe.save();
    res.status(201).json(recipe);
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = yield Recipe_1.Recipe.findByIdAndUpdate(req.params.id, req.body, {
        updatedAt: Date.now,
    });
    res.status(404).json({ message: "Not found" });
});
exports.update = update;
const deleteRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const recipe = await Recipe.findByIdAndUpdate(req.params.id);
    // if (!recipe) return res.status(404).send("Not found");
    res.json({ message: "Recipe deleted" });
});
exports.deleteRecipe = deleteRecipe;
