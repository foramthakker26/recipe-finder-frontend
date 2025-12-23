import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ItemCard from "./components/ItemCard";
import Footer from "./components/Footer";
import "./App.css";

const API_URL = "https://recipe-finder-backend.onrender.com";

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

  // 🔄 Load from backend only once
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

  // 💾 Save recipes locally
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.image) return;

    setRecipes([...recipes, { ...form, _id: Date.now() }]);
    setForm({ title: "", description: "", image: "" });
  };

  return (
    <>
      <Navbar />

      <section className="hero">
        <h1>🍲 Recipe Finder</h1>
        <p>Discover, Save & Create Your Favourite Recipes</p>
      </section>

      <section className="form-section">
        <h2>Add Your Recipe</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Recipe Title"
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

          <button type="submit">Add Recipe</button>
        </form>
      </section>

      <section className="recipes">
        <h2>All Recipes</h2>
        <div className="grid">
          {recipes.map((recipe) => (
            <ItemCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default App;
