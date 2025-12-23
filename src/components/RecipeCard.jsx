export default function RecipeCard({ recipe, onLike, onDelete }) {
  return (
    <div className="card">
      <img src={recipe.image} alt={recipe.title} />

      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>

      <div className="actions">
        <button onClick={() => onLike(recipe.id)}>
          ❤️ {recipe.likes}
        </button>

        <button onClick={() => onDelete(recipe.id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
