import React from "react";
import { ErrorMessage, useField, Field } from "formik";
import { Label } from "reactstrap";

export const TextField = ({ label, max, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="row mb-0">
        <div className="col-6">
          <h6 for={field.name}>{label}</h6>
        </div>
        <div className="col-6">
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
        </div>
      </div>
    </>
  );
};
