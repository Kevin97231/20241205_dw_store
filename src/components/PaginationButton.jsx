export const PaginationButton = ({ number, handleClick, loading }) => {
  return (
    <button
      className="join-item btn btn-lg"
      onClick={() => handleClick(number)}
      disabled={loading}
    >
      {number}
    </button>
  );
};
