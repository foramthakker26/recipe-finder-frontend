import "./ItemCard.css";

function ItemCard({ recipe, onDelete, onEdit }) {
  return (
    <div className="card">
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>

      <div className="btn-group">
        <button
          className="edit-btn"
          onClick={() => onEdit(recipe)}
        >
          ✏️ Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(recipe._id)}
        >
          ❌ Delete
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
