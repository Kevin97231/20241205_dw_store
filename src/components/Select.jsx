export const Select = ({ options = [], value, onChangeFunction, children }) => {
  const handleSeclectChange = (e) => {
    onChangeFunction(e.target.value);
  };

  return (
    <div className="m-auto">
      <select
        value={value}
        onChange={handleSeclectChange}
        className="w-full max-w-xs select select-bordered select-sm"
      >
        <option disabled>{children}</option>
        {options.map((option) => (
          <option key={options.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};
