import React from "react";
import { Field, ErrorMessage } from "formik";
import { Label } from "reactstrap";

function SelectDropDownAf(props) {
  const { label, name, value, options, ...rest } = props;
  return (
    <div className="mb-1 d-flex justify-content-around align-items-center flex-row">
      <div style={{ width: "100%" }}>
        <Label for={name}>{label}</Label>{" "}
        <span className="mandate-field text-label">*</span>
        {/* <div className="input-group"> */}
        <Field
          as="select"
          id={name}
          className="custom-select"
          name={name}
          {...rest}
        >
          {options.length &&
            options.map((option) => {
              return (
                <option
                  key={option.value}
                  value={option.value.toLowerCase()}
                  readOnly={option.value === "-1"}
                >
                  {option.label}
                </option>
              );
            })}
        </Field>
        <ErrorMessage
          name={name}
          component="div"
          style={{
            color: "red",
            fontSize: ".8rem",
            position: "absolute",
            bottom: "-16px",
          }}
        />
        {/* </div> */}
      </div>
    </div>
  );
}

export default SelectDropDownAf;
