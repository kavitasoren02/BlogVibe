import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Label from "./Label";

const Input = ({ label, type, error, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType = showPassword && type === "password" ? "text" : type;

  return (
    <div className="relative mb-4 w-full max-w-md">
      <Label htmlFor={props.id || props.name} text={label} />
      <div className="relative">
        <input
          {...props}
          type={inputType}
          className="w-full px-4 py-2 text-white bg-transparent border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 text-sm sm:text-base"
        />
        {type === "password" && (
          <div
            onClick={handleTogglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? (
              <FaEyeSlash className="text-white text-base sm:text-lg" />
            ) : (
              <FaEye className="text-white text-base sm:text-lg" />
            )}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
