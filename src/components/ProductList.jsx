/* eslint-disable react/prop-types */
import { Card } from "./Card";

export const ProductList = ({ products }) => {
  return (
    <div className="grid w-full grid-cols-4 gap-4">
      {products.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};
