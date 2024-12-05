/* eslint-disable react/prop-types */
import { Card } from "./Card";
import { SkeletonCard } from "./SkeletonCard";

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
