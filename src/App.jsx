import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ItemCard from "./components/ItemCard";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "https://recipe-finder-backend-1-5mw8.onrender.com";
function App() {
  const [activePage, setActivePage] = useState("home");

  // 🔹 Load recipes from localStorage OR default recipes
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem("recipes");
    return savedRecipes
      ? JSON.parse(savedRecipes)
      : [
          { id: 1, name: "Pizza", desc: "Cheesy Italian Pizza", img: "/images/pizza.jpg" },
          { id: 2, name: "Burger", desc: "Juicy Veg Burger", img: "/images/burger.jpg" },
          { id: 3, name: "Pasta", desc: "Creamy Pasta", img: "/images/pasta.jpg" },
          { id: 4, name: "Biryani", desc: "Spicy Veg Biryani", img: "/images/biryani.jpg" },
          { id: 5, name: "Dosa", desc: "Crispy Dosa", img: "/images/dosa.jpg" },
          { id: 6, name: "Sandwich", desc: "Healthy Sandwich", img: "/images/sandwich.jpg" },
          { id: 7, name: "Noodles", desc: "Veg Noodles", img: "/images/noodles.jpg" },
          { id: 8, name: "Cake", desc: "Chocolate Cake", img: "/images/cake.jpg" },
          { id: 9, name: "Salad", desc: "Fresh Salad", img: "/images/salad.jpg" },
          { id: 10, name: "Soup", desc: "Hot Soup", img: "/images/soup.jpg" }
        ];
  });

  const [newRecipe, setNewRecipe] = useState({
    name: "",
    desc: "",
    img: ""
  });

  // 🔹 Save recipes to localStorage whenever recipes change
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (e) => {
    e.preventDefault();
    setRecipes([...recipes, { ...newRecipe, id: Date.now() }]);
    setNewRecipe({ name: "", desc: "", img: "" });
  };

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter((r) => r.id !== id));
  };

  const clearAllRecipes = () => {
    setRecipes([]);
    localStorage.removeItem("recipes");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar setActivePage={setActivePage} />

      <div className="container my-4">
        {activePage === "home" && (
          <div className="text-center">
            <h1>Welcome to Recipe Finder 🍽️</h1>
            <p>Add, like & save recipes permanently</p>
          </div>
        )}

        {activePage === "about" && (
          <div className="text-center">
            <h2>About</h2>
            <p>This app stores recipes using localStorage.</p>
          </div>
        )}

        {activePage === "project" && (
          <div className="text-center">
            <h2>Project</h2>
            <p>React app with persistent data storage.</p>
          </div>
        )}

        {activePage === "product" && (
          <>
            <form className="mb-4" onSubmit={addRecipe}>
              <input
                className="form-control mb-2"
                placeholder="Recipe Name"
                value={newRecipe.name}
                onChange={(e) =>
                  setNewRecipe({ ...newRecipe, name: e.target.value })
                }
                required
              />

              <input
                className="form-control mb-2"
                placeholder="Description"
                value={newRecipe.desc}
                onChange={(e) =>
                  setNewRecipe({ ...newRecipe, desc: e.target.value })
                }
                required
              />

              <input
                className="form-control mb-2"
                placeholder="Image Path (/images/...)"
                value={newRecipe.img}
                onChange={(e) =>
                  setNewRecipe({ ...newRecipe, img: e.target.value })
                }
                required
              />

              <button className="btn btn-success">Add Recipe</button>
              <button
                type="button"
                className="btn btn-danger ms-2"
                onClick={clearAllRecipes}
              >
                Clear All
              </button>
            </form>

            <div className="row">
              {recipes.map((recipe) => (
                <ItemCard
                  key={recipe.id}
                  recipe={recipe}
                  deleteRecipe={deleteRecipe}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
