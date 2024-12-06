import { Card } from "./Card";
import { SkeletonCard } from "./SkeletonCard";
import PropTypes from "prop-types";

export const ProductList = ({ products }) => {
  const array = Array.from({ length: 8 });

  return (
    <div className="grid w-full grid-cols-4 gap-4">
      {products !== undefined && products.length > 0
        ? products.map((product) => <Card key={product.id} product={product} />)
        : array.map((_, index) => <SkeletonCard key={index} />)}
    </div>
  );
};

ProductList.propTypes = {
  // products: PropTypes.object.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      // Exemple d vérification dans le cas ou mon ID peut etre un string ou un numbre
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ),
};
