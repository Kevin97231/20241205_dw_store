import { useEffect } from "react";
import { useAxios } from "../hooks/useAxios";

export const Products = () => {
  const { getPaginate, page, perPage, setPage, setPerPage } = useAxios();

  useEffect((), {

  }, [page, perPage])

  return (<>
  <div>
    {products.map((product) => <Card product={product}/>)}
  </div>
  </>)
};
