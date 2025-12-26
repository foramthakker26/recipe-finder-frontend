import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ItemCard from "./components/ItemCard";
import Footer from "./components/Footer";
import "./App.css";

const API_URL = "https://recipe-finder-backend-1-5mw8.onrender.com";

function App() {
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem("recipes");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [editId, setEditId] = useState(null); // ⭐ NEW

  // 🔄 Load from backend once
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        if (recipes.length === 0) {
          const res = await fetch(`${API_URL}/api/recipes`);
          const data = await res.json();
          setRecipes(data);
          localStorage.setItem("recipes", JSON.stringify(data));
        }
      } catch (err) {
        console.log("Backend offline, using local data");
      }
    };

    fetchRecipes();
    // eslint-disable-next-line
  }, []);

  // 💾 Save locally
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  // ➕ ADD or ✏️ UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.image) return;

    if (editId) {
      // ✏️ UPDATE
      const updated = recipes.map((r) =>
        r._id === editId ? { ...r, ...form } : r
      );
      setRecipes(updated);
      setEditId(null);
    } else {
      // ➕ ADD
      setRecipes([...recipes, { ...form, _id: Date.now() }]);
    }

    setForm({ title: "", description: "", image: "" });
  };

  // ❌ DELETE
  const handleDelete = (id) => {
    const updated = recipes.filter((r) => r._id !== id);
    setRecipes(updated);
  };

  // ✏️ EDIT
  const handleEdit = (recipe) => {
    setForm({
      title: recipe.title,
      description: recipe.description,
      image: recipe.image,
    });
    setEditId(recipe._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />

      <section className="hero">
        <h1>🍲 Recipe Finder</h1>
        <p>Discover, Save & Create Your Favourite Recipes</p>
      </section>

      <section className="form-section">
        <h2>{editId ? "Edit Recipe" : "Add Your Recipe"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Recipe Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <button type="submit">
            {editId ? "Update Recipe" : "Add Recipe"}
          </button>
        </form>
      </section>

      <section className="recipes">
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
      </section>

      <Footer />
    </>
  );
}

export default App;
