import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchProducts } from "../api";
import ProductCard from "../components/ProductCard";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search");
    const category = searchParams.get("category");

    fetchProducts({ search: searchQuery, category })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [location.search]);

  return (
    <div className="products-container">
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
