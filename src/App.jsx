import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://recipe-finder-backend-1-5mw8.onrender.com/api/recipes";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  // READ
  const fetchRecipes = async () => {
    const res = await axios.get(API_URL);
    setRecipes(res.data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // CREATE + UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, {
        title,
        description
      });
      setEditingId(null);
    } else {
      await axios.post(API_URL, {
        title,
        description
      });
    }

    setTitle("");
    setDescription("");
    fetchRecipes();
  };

  // DELETE
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchRecipes();
  };

  // EDIT
  const handleEdit = (recipe) => {
    setTitle(recipe.title);
    setDescription(recipe.description);
    setEditingId(recipe._id);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>🍲 Recipe Finder</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />
        <textarea
          placeholder="Recipe Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">
          {editingId ? "Update Recipe" : "Add Recipe"}
        </button>
      </form>

      <hr />

      {recipes.map((recipe) => (
        <div key={recipe._id} style={{ marginBottom: "15px" }}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <button onClick={() => handleEdit(recipe)}>Edit</button>
          <button onClick={() => handleDelete(recipe._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
