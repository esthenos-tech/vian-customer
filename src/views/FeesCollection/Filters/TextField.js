import React from "react";
import { ErrorMessage, useField, Field } from "formik";
import { Label } from "reactstrap";

export const TextField = ({ label, max, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="mx-1" style={{ marginBottom: "8px" }}>
        <Label for={field.name}>{label}</Label>
        <span className="mandate-field text-label">*</span>
        <Field
          className={`form-control shadow-none ${
            meta.touched && meta.error && "is-invalid"
          }`}
          {...field}
          {...props}
          max={max}
          autoComplete="off"
          role="presentation"
        />
        <ErrorMessage
          component="div"
          name={field.name}
          style={{ color: "red", fontSize: ".8rem" }}
        />
      </div>
    </>
  );
};
