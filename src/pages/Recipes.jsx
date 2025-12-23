import React, { useState, useEffect } from "react";

const Recipes = () => {
  const [recipes, setRecipes] = useState(() => JSON.parse(localStorage.getItem("recipes")) || []);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = () => {
    if (!name || !desc || !img) return;
    const newRecipe = { id: Date.now(), name, desc, img, likes: 0 };
    setRecipes([newRecipe, ...recipes]);
    setName(""); setDesc(""); setImg("");
  };

  const likeRecipe = (id) => {
    setRecipes(recipes.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r));
  };

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter(r => r.id !== id));
  };

  return (
    <section id="recipes" style={{ padding: "50px", background: "#fff3e0" }}>
      <h1 style={{ textAlign: "center" }}>Recipes</h1>

      <div style={{ margin: "20px 0", textAlign: "center" }}>
        <input type="text" placeholder="Recipe Name" value={name} onChange={e => setName(e.target.value)} />
        <input type="text" placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
        <input type="text" placeholder="Image URL" value={img} onChange={e => setImg(e.target.value)} />
        <button onClick={addRecipe}>Add Recipe</button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {recipes.map(r => (
          <div key={r.id} style={{ border: "1px solid #ccc", borderRadius: "10px", margin: "10px", padding: "10px", width: "250px", textAlign: "center" }}>
            <img src={r.img} alt={r.name} style={{ width: "100%", borderRadius: "10px" }} />
            <h3>{r.name}</h3>
            <p>{r.desc}</p>
            <p>Likes: {r.likes}</p>
            <button onClick={() => likeRecipe(r.id)}>Like</button>
            <button onClick={() => deleteRecipe(r.id)}>Delete</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recipes;
