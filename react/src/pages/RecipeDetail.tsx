import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RecipeType } from "../types/recipe.type";

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get<RecipeType>(
            `${import.meta.env.VITE_API_BASE_URL}/recipes/${id}`
          );
          setRecipe(response.data);
          setLoading(false);
        } catch (err: any) {
          setError(err.message);
          setLoading(false);
        }
      };

      fetchRecipe();
    }
  }, [id]);

  if (loading) {
    return <div>Loading recipe details...</div>;
  }

  if (error) {
    return <div>Error loading recipe details: {error}</div>;
  }

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div className="container">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <div>
        <h3>Ingredients:</h3>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Instructions:</h3>
        <p>{recipe.instructions}</p>
      </div>
      <p>Created At: {new Date(recipe.createdAt!).toLocaleDateString()}</p>
      <p>Updated At: {new Date(recipe.updatedAt!).toLocaleDateString()}</p>
    </div>
  );
};

export default RecipeDetailPage;
