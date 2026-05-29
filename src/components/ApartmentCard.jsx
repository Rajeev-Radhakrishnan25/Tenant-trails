import "./ApartmentCard.css";

function StarRating({ rating }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<span key={i} className="star filled">★</span>);
    } else if (i === fullStars && hasHalf) {
      stars.push(<span key={i} className="star half">★</span>);
    } else {
      stars.push(<span key={i} className="star empty">☆</span>);
    }
  }

  return <div className="star-rating">{stars}</div>;
}

function ApartmentCard({ apartment }) {
  const { name, address, neighbourhood, rating, reviewCount, tags, image } = apartment;

  return (
    <div className="apartment-card">
      <div className="card-image-wrapper">
        <img src={image} alt={name} className="card-image" />
        <div className="card-rating-badge">
          <span className="badge-star">★</span> {rating.toFixed(1)}
        </div>
      </div>
      <div className="card-content">
        <h3 className="card-name">{name}</h3>
        <p className="card-address">
          <span className="pin-icon">📍</span> {address} · {neighbourhood}
        </p>
        <div className="card-tags">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`card-tag ${tag === "No AI summary yet" ? "tag-muted" : ""}`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="card-footer">
          <span className="review-count">{reviewCount} reviews</span>
          <StarRating rating={rating} />
        </div>
      </div>
    </div>
  );
}

export default ApartmentCard;
