import { useEffect } from "react";
import { useNewsApi } from "../hooks/useNewsApi";
import NewsCard from "../components/NewsCard";

export const HomePage = () => {
  const { get, articles } = useNewsApi();

  useEffect(() => {
    get();
  }, []);

  return (
    <section className="grid grid-cols-4 gap-5">
      {articles.map((article) => (
        <NewsCard key={article.id} news={article} />
      ))}
    </section>
  );
};
