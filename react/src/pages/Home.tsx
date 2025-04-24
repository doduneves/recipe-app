import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RecipeType } from "../types/recipe.type";


const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<[RecipeType]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchRecipes = async (ingredient?: string) => {
    setLoading(true);
    setError(null);

    let url = `${import.meta.env.VITE_API_BASE_URL}/recipes`;
    if (ingredient) {
      url += `?ingredient=${ingredient}`;
    }

    try {
      const response = await axios.get<RecipeType[]>(url);
      setRecipes(response.data);
      setLoading(false);
    } catch (err: any) {
      setError(err?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchRecipes(searchTerm);
  };

  const handleClickDetails = (id: string) => {
    navigate(`/recipe/${id}`);
  };

  if (loading) {
    return <div>Loading recipes...</div>;
  }

  if (error) {
    return <div>Error loading recipes: {error}</div>;
  }

  return (
    <div className="container">
      <h1 className="text-xl font-bold mb-4">All Recipes</h1>
      <form onSubmit={handleSearchSubmit} className="mb-4 flex">
        <input
          type="text"
          placeholder="Search by ingredient"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
        >
          Search
        </button>
      </form>
      <table>
        {" "}
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe._id}>
              <td
                className="recipe-title"
                onClick={() => handleClickDetails(recipe._id)}
              >
                {recipe.title}
              </td>
              <td>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="recipe-image"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
