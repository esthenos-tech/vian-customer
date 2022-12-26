import React from "react";
import { ErrorMessage, useField } from "formik";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import "../ChangePassword/style.css";
import { FormGroup, Input, Label } from "reactstrap";

export const PasswordField = ({
  passwordstrengthfield,
  label,
  children,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="mb-1 w-100">
        <FormGroup className="form-label-group input-group mb-0">
          <Input
            className={`form-control shadow-none ${
              meta.touched && meta.error && "is-invalid"
            }`}
            {...field}
            {...props}
            autoComplete="new-password"
            role="presentation"
          />
          {children}
          {passwordstrengthfield ? (
            <>
              {field.value && props.customtype && (
                <PasswordStrengthMeter password={field.value} />
              )}
            </>
          ) : (
            ""
          )}
        </FormGroup>
        <ErrorMessage
          component="div"
          name={field.name}
          style={{ color: "red", fontSize: ".8rem", position: "relative" }}
        />
      </div>
    </>
  );
};
