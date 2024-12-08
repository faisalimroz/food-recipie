
import { useFormContext, Controller } from "react-hook-form";




const FormSelectField = ({
  name,
  size = "large",
  value,
  placeholder = "select",
  options,
  label,
  defaultValue,
}) => {
  const { control } = useFormContext();

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-gray-700 font-medium"
        >
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <select
            onChange={(e) => onChange(e.target.value)}
            value={value}
            defaultValue={defaultValue}
            className={`w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              size === "large"
                ? "text-base"
                : "text-sm"
            }`}
            placeholder={placeholder}
          >
            <option value="">{placeholder}</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );
};

export default FormSelectField;
