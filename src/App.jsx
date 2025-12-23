import { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchRecipes = async () => {
    const res = await fetch("http://localhost:5000/recipes");
    const data = await res.json();
    setRecipes(data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const addRecipe = async () => {
    if (!recipeName.trim()) return;
    const res = await fetch("http://localhost:5000/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeName })
    });
    const data = await res.json();
    setMessage(data.message);
    setRecipeName("");
    fetchRecipes();
  };

  const updateRecipe = async () => {
    const res = await fetch(`http://localhost:5000/recipes/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeName })
    });
    const data = await res.json();
    setMessage(data.message);
    setEditId(null);
    setRecipeName("");
    fetchRecipes();
  };

  const deleteRecipe = async (id) => {
    const res = await fetch(`http://localhost:5000/recipes/${id}`, {
      method: "DELETE"
    });
    const data = await res.json();
    setMessage(data.message);
    fetchRecipes();
  };

  return (
    <div className="screen">
      <div className="card">
        <h1>🍽 Recipe Finder</h1>
        <p className="subtitle">Manage your recipes easily</p>

        <input
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          placeholder="Enter recipe name"
        />

        {editId ? (
          <button className="primary" onClick={updateRecipe}>
            Update Recipe
          </button>
        ) : (
          <button className="primary" onClick={addRecipe}>
            Add Recipe
          </button>
        )}

        {message && <p className="msg">{message}</p>}

        <ul>
          {recipes.map((r) => (
            <li key={r.id}>
              <span>🍲 {r.recipeName}</span>
              <div>
                <button
                  className="edit"
                  onClick={() => {
                    setEditId(r.id);
                    setRecipeName(r.recipeName);
                  }}
                >
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => deleteRecipe(r.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
