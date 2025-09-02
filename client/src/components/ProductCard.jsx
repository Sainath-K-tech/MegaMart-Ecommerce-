import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleWishlistToggle = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        <button
          onClick={handleWishlistToggle}
          className={`wishlist-btn ${isInWishlist(product._id) ? "active" : ""}`}
          title={isInWishlist(product._id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist(product._id) ? "❤️" : "🤍"}
        </button>
      </div>
      <div className="product-details">
        <h2 className="product-title">{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <div className="product-info">
          <span className="product-price">₹{product.price}</span>
          <span className="product-rating">⭐ {product.rating}</span>
        </div>
        <div className="product-category">
          <span>{product.category}</span>
        </div>
        <button
          onClick={() => addToCart({
            id: product._id,
            title: product.name,
            description: product.description,
            price: product.price,
            thumbnail: product.image,
            rating: product.rating
          })}
          className="add-to-cart-btn"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}