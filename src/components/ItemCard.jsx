function ItemCard({ recipe }) {
  return (
    <div className="card">
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
    </div>
  );
}

export default ItemCard;
