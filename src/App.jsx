import { useEffect, useState } from "react";
import ItemCard from "./components/ItemCard";
import "./App.css";

const API_URL = "https://recipe-finder-backend-1-5mw8.onrender.com/api/recipes";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    image: "",
    description: "",
  });

  // FETCH RECIPES
  const fetchRecipes = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setRecipes(data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    fetchRecipes();
  };

  // EDIT (fill form)
  const handleEdit = (recipe) => {
    setEditingId(recipe._id);
    setForm({
      title: recipe.title,
      image: recipe.image,
      description: recipe.description,
    });
  };

  // UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${API_URL}/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setEditingId(null);
    setForm({ title: "", image: "", description: "" });
    fetchRecipes();
  };

  return (
    <>
      <h2>Edit Recipe</h2>

      {editingId && (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />
          <input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) =>
              setForm({ ...form, image: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
          <button type="submit">Update Recipe</button>
        </form>
      )}

      <h2>All Recipes</h2>

      <div className="grid">
        {recipes.map((recipe) => (
          <ItemCard
            key={recipe._id}
            recipe={recipe}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </>
  );
}

export default App;
