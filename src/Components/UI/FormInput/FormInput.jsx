import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { getErrorMessageByPropertyName } from "../../../utils/schema-validator";

const FormInput = ({
  name,
  type,
  size,
  value,
  id,
  placeholder,
  validation,
  label,
  customStyle,
  defaultValue 
}) => {
  const {
    control,
    formState: { errors },
    register,
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            type={type}
            size={size}
            placeholder={placeholder}
            style={customStyle}
            {...field}
            value={value ? value : field.value}
            defaultValue ={defaultValue}
            className="block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#22c55e] focus:border-transparent focus:outline-none "
          />
        )}
      />
      {errorMessage && (
        <small className="text-red-500 mt-1">{errorMessage}</small>
      )}
    </div>
  );
};

export default FormInput;
