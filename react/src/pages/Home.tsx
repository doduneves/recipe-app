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
      <form
        onSubmit={handleSearchSubmit}
        className="mb-4 flex flex-col md:flex-row md:items-center"
      >
        <input
          type="text"
          placeholder="Search by ingredient"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 md:mr-2 md:mb-0"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline md:ml-auto"
        >
          Search
        </button>
      </form>

      <table className="w-full border border-gray-300 rounded-md">
        <thead>
          <tr>
            <th className="text-left py-2 px-4 text-sm text-gray-500">Title</th>
            <th className="text-center py-2 px-4 w-24 text-sm text-gray-500">
              Image
            </th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe._id}>
              <td
                className="hover:text-orange-400 font-medium py-2 px-4"
                onClick={() => handleClickDetails(recipe._id)}
              >
                {recipe.title}
              </td>
              <td className="py-2 px-4">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="h-12 w-20 object-cover rounded-md"
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
