import { useSelector } from "react-redux";
import { ProductList } from "./ProductList";
import { useNewsApi } from "../hooks/useNewsApi";
import NewsCard from "./NewsCard";

export const Cart = () => {
  const products = useSelector((state) => state.cart.value);

  const { articles } = useNewsApi();

  console.log(products);

  return (
    <>
      <section>
        <h1>Mon panier</h1>
        <ProductList products={products} />
      </section>
      <section>
        {articles.map((article) => (
          <NewsCard key={article.id} news={article} />
        ))}
      </section>
    </>
  );
};
