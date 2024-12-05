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
    <div className="w-full">
      <h1>Mes produits</h1>
      <ProductList products={products} />
      <Pagination
        nbrButton={responseObject.pages}
        handleClick={clickOnPaginationButton}
      />
      <Select
        options={tableSelect}
        value={perPage}
        onChangeFunction={selectOnChange}
      >
        Nombre de produits à afficher
      </Select>
    </div>
  );
};
