import React from "react";
import { ErrorMessage, useField } from "formik";
import { FormGroup, Input, Label } from "reactstrap";

export const NumberField = ({ label, max, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="mb-1">
        <Label for={field.name}>{label}</Label>
        <span className="mandate-field text-label">*</span>{" "}
        <Input
          className={`form-control shadow-none ${
            meta.touched && meta.error && "is-invalid"
          }`}
          {...field}
          {...props}
          max={max}
          autoComplete="none"
        />
        <ErrorMessage
          component="div"
          name={field.name}
          style={{ color: "red", fontSize: ".8rem", position: "relative" }}
        />
      </div>
    </>
  );
};
