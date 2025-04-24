"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const recipeSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false }
});
exports.Recipe = mongoose_1.default.model("Recipe", recipeSchema);
