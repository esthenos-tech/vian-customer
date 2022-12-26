import React from "react";
import { useField } from "formik";

export const CheckBox = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="d-flex " style={{ margin: "25px 35px" }}>
        <input
          className={`form-check-input shadow-none ${
            meta.touched && meta.error && "is-invalid"
          }`}
          {...field}
          {...props}
          autoComplete="off"
        />
        <label htmlFor={field.name}>{label}</label>
      </div>
    </>
  );
};
