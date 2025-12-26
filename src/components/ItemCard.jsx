function ItemCard({ recipe, onDelete, onEdit }) {
  return (
    <div className="card">
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>

      <div className="card-buttons">
        <button onClick={() => onEdit(recipe)}>Edit</button>
        <button onClick={() => onDelete(recipe._id)}>Delete</button>
      </div>
    </div>
  );
}

export default ItemCard;
