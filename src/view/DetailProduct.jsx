import { useParams } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { useEffect, useState } from "react";

export const DetailProduct = () => {
  const params = useParams();
  const productId = params.id;
  const { getById } = useAxios();

  const [product, setProduct] = useState();

  useEffect(() => {
    console.log("chargement !");
    getById(productId)
      .then((response) => {
        console.log("response", response);
        setProduct(response);
      })
      .catch((error) => console.error("error", error));
  }, [productId]);

  return (
    <div>
      {product && (
        <div>
          <h1>Détail du produit</h1>
          <p>name: {product.title}</p>
          <p>id: {product.id}</p>
        </div>
      )}
    </div>
  );
};
