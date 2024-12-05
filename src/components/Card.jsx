/* eslint-disable react/prop-types */
export const Card = ({ product }) => {
  return (
    <div className="flex shadow-xl card bg-base-100 w-96">
      <figure>
        <div className="h-40">
          <img src={product.image} alt={product.title} />
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.title}</h2>
        <p>{product.category}</p>
        <p>{product.decription}</p>
        <p>{product.price}</p>
        <div className="justify-end card-actions"></div>
      </div>
    </div>
  );
};
