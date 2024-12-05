import { useSelector } from "react-redux";
import { ProductList } from "./ProductList";

export const Cart = () => {
  const products = useSelector((state) => state.cart.value);

  console.log(products);

  return (
    <>
      <h1>Mon panier</h1>
      <ProductList products={products} />
    </>
  );
};
