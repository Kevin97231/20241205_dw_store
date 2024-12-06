import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setArticles } from "../features/news/newsSlice";

const url = "https://news-backend.dawan.fr/articles/top10";

export const useNewsApi = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.news.articles);

  const get = async () => {
    if (articles.length === 0) {
      try {
        const response = await axios.get(url);
        dispatch(setArticles(response.data));
      } catch (error) {
        console.error("Erreur lors du chargement des articles:", error);
      }
    }
  };

  return { get, articles };
};
