import { PaginationButton } from "./PaginationButton";

export const Pagination = ({ nbrButton = 0, handleClick }) => {
  //   Numbers sera un tableau de chiffre
  // Ex: si nbrButton = 5 ==> [1,2,3,4,5]
  const numbers = Array.from({ length: nbrButton }, (_, index) => index + 1);

  return (
    <div className="bg-white join">
      {numbers.map((number) => (
        <PaginationButton
          key={number}
          number={number}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};
