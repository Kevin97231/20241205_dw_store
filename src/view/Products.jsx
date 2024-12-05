import { useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { ProductList } from "../components/ProductList";
import { Pagination } from "../components/Pagination";
import { Select } from "../components/Select";

export const Products = () => {
  const { getPaginate, page, perPage, setPage, setPerPage } = useAxios();

  const [products, setProducts] = useState([]);
  const [responseObject, setResponseObject] = useState({ pages: 0, items: 0 });

  const [tableSelect, setTableSelect] = useState([]);

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

  useEffect(() => {
    if (responseObject.items) {
      const array = Array.from(
        { length: responseObject.items },
        (_, index) => ({
          value: index + 1,
          label: index + 1,
        })
      );
      setTableSelect(array);
    }
  }, [responseObject]);

  const selectOnChange = (number) => {
    setPerPage(number);
  };

  return (
    <div className="w-full p-5">
      <h1 className="text-2xl font-bold text-center mb-5">Mes produits</h1>
      {/* Sélection du nombre de produits par page */}
      <div className="flex justify-end items-center space-x-2 mt-5 mr-8 my-5">
        <label htmlFor="productsPerPage" className=" font-medium">
          Nombre de produits à afficher :
        </label>
        <Select
          id="productsPerPage"
          options={tableSelect}
          value={perPage}
          onChangeFunction={selectOnChange}
        />
      </div>
      {/* Liste des produits */}
      <ProductList products={products} />

      {/* Pagination */}
      <div className="flex justify-center my-5">
        <Pagination
          nbrButton={responseObject.pages}
          handleClick={clickOnPaginationButton}
        />
      </div>
    </div>
  );
};
