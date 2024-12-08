import { useFormContext, Controller } from "react-hook-form";
import { getErrorMessageByPropertyName } from "../../../utils/schema-validator";

const FormTextArea = ({ name, label, rows, value, placeholder,defaultValue }) => {
  const {
    control,
    formState: { errors },
    register,
  } = useFormContext();
  const errorMessage = getErrorMessageByPropertyName(errors, name);
  return (
    <>
      {label ? <label htmlFor={name}   className="block text-gray-700 font-medium">{label}</label> : null}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <textarea
            id={name}
            name={name}
            rows={rows}
            placeholder={placeholder}
            className="mt-1 p-2 w-full border rounded-md"
            {...field}
            defaultValue={defaultValue}
          />
        )}
      />
      {errorMessage && (
        <small className="text-red-500 mt-1">{errorMessage}</small>
      )}
    </>
  );
};

export default FormTextArea;
