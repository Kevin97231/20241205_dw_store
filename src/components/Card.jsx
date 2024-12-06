import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addProduct, deleteProduct } from "../features/product/cartSlice";
import PropTypes from "prop-types";

/* eslint-disable react/prop-types */
export const Card = ({ product }) => {
  // Exemple pour rediriger dans une fonction javascript
  const navigate = useNavigate();
  const navigateToDetail = () => {
    navigate(`/products/${product.id}`);
  };

  const dispatch = useDispatch();

  const products = useSelector((state) => state.cart.value);

  const isInCart = products.some((item) => item.id === product.id);

  return (
    <div className="flex shadow-xl card bg-base-100 w-96">
      <figure>
        <div className="h-40">
          <img src={product.image} alt={product.title} />
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.title}</h2>
        <p>{product.category}</p>
        <p>{product.decription}</p>
        <p>{product.price}</p>
        <div className="justify-end card-actions">
          <button className="btn btn-primary" onClick={navigateToDetail}>
            Voir
          </button>
          <Link to={`/products/${product.id}`}>Voir avec le Link</Link>
          {!isInCart ? (
            <button
              className="btn"
              onClick={() => dispatch(addProduct(product))}
            >
              ajouter au panier
            </button>
          ) : (
            <button
              className="btn btn-error"
              onClick={() => dispatch(deleteProduct(product.id))}
            >
              Supprimer du panier
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string.isRequired,
  }),
};
