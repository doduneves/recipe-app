"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const recipe_routes_1 = __importDefault(require("./routes/recipe.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Recipe API is running!");
});
app.use('/api/recipes', recipe_routes_1.default);
mongoose_1.default
    .connect(process.env.MONGO_URI || "", {})
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
    .catch((error) => console.error("MongoDB connection error:", error));
