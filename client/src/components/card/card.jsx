const Card = ({ name, image, teams }) => {
  return (
    <article className="card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{teams}</p>
    </article>
  );
};

export default Card;
