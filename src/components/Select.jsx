export const Select = ({ options = [], value, onChangeFunction, children }) => {
  const handleSeclectChange = (e) => {
    onChangeFunction(e.target.value);
  };

  return (
    <div className="flex justify-center items-center mx-auto my-4">
      <select
        value={value}
        onChange={handleSeclectChange}
        className="w-fit p-5 bg-primary text-secondary p-3 rounded-lg"
      >
        <option disabled className="text-gray-500">
          {children}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-black"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
