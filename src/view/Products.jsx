import { useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { ProductList } from "../components/ProductList";
import { Pagination } from "../components/Pagination";

export const Products = () => {
  const { getPaginate, page, perPage, setPage, setPerPage } = useAxios();

  const [products, setProducts] = useState([]);
  const [responseObject, setResponseObject] = useState({ pages: 0, items: 0 });

  useEffect(() => {
    getPaginate()
      .then((response) => {
        setProducts(response.data);
        setResponseObject({ pages: response.pages, items: response.items });
      })
      .catch((err) => console.error(err.message));
  }, [page, perPage]);

  const clickOnPaginationButton = (number) => {
    setPage(number);
  };

  return (
    <div className="w-full">
      <h1>Mes produits</h1>
      <ProductList products={products} />
      <Pagination
        nbrButton={responseObject.pages}
        handleClick={clickOnPaginationButton}
      />
    </div>
  );
};
