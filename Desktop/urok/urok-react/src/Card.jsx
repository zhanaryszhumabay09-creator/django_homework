import "./Card.css";

function Card() {
  return (
    <div className="card">
      <div className="card-image"></div>

      <h2 className="card-title">Nike Air Max</h2>

      <p className="card-text">
        Удобные спортивные кроссовки для повседневной носки.
      </p>

      <p className="card-price">45 000 ₸</p>

      <button className="card-button">
        Купить
      </button>
    </div>
  );
}

export default Card;