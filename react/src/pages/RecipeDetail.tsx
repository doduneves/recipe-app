import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RecipeType } from "../types/recipe.type";
import BackButton from "../components/BackButton";

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
    <div className="container mx-auto p-6 bg-white rounded-md shadow-md">
      <BackButton />
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h2>

      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="md:w-1/2">
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Ingredients:
            </h3>
            <ul className="list-disc list-inside text-gray-600">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="font-semibold">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Instructions:
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {recipe.instructions}
            </p>
          </div>
          <div className="mt-4 text-sm text-gray-500 flex justify-between">
            <p>
              Created At: {new Date(recipe.createdAt!).toLocaleDateString()}
            </p>
            <p className="text-right">
              Updated At: {new Date(recipe.updatedAt!).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="md:w-1/2 order-first md:order-last">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-auto rounded-md shadow-md mb-4 md:mb-0"
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
