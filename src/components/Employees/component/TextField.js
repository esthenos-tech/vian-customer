import React, { useState } from "react";
import { ErrorMessage, useField } from "formik";
import { FormGroup, Input, Label } from "reactstrap";

export const TextField = ({ isMand, label, ...props }) => {
  const [field, meta] = useField(props);
  const [value, setValue] = useState("");
  const onChange = (event) => setValue(event.target.value);
  return (
    <>
      <div className="mb-1">
        <Label for={field.name}>{label}</Label>
        {isMand ? <span className="mandate-field text-label">*</span> : ""}
        <Input
          className={`form-control shadow-none ${
            meta.touched && meta.error && "is-invalid"
          }`}
          style={{ fontWeight: "600" }}
          onChange={onChange}
          value={value}
          {...field}
          {...props}
          autoComplete="false"
          role="presentation"
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
