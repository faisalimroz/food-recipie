import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { getErrorMessageByPropertyName } from "../../../utils/schema-validator";

const FormDatePicker = ({ name, label, onChange, size = "large" }) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  const handleOnChange = (e) => {
    const selectedDate = dayjs(e.target.value);
    onChange ? onChange(selectedDate, selectedDate.format("YYYY-MM-DD")) : null;
    console.log(selectedDate);
    setValue(name, selectedDate.format("YYYY-MM-DD"));
  };

  return (
    <div>
      {label ? label : null}
      <br />
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type="date"
            value={field.value ? dayjs(field.value).format("YYYY-MM-DD") : ""}
            onChange={handleOnChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        )}
      />
      {errorMessage && (
        <small className="text-red-500 mt-1">{errorMessage}</small>
      )}
    </div>
  );
};

export default FormDatePicker;
