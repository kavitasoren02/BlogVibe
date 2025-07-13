import Label from "./Label";

const Select = ({ label, options, error, ...props }) => {
  return (
    <div className="relative mb-4 w-full max-w-md">
      {/* Label */}
      <Label htmlFor={props.id || props.name} text={label} />

      {/* Select Dropdown */}
      <select
        {...props}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white bg-gray-700 text-sm sm:text-base"
      >
        {/* Default Option */}
        <option value="" disabled hidden className="text-white bg-gray-700">
          Select an option
        </option>

        {/* Dynamic Options */}
        {options?.map((option, index) => (
          <option key={index} value={option.value} className="text-black">
            {option.label}
          </option>
        ))}
      </select>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Select;
