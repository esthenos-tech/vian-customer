import React from "react";
import { Field, ErrorMessage } from "formik";
import { Label } from "reactstrap";

function SelectDropDown(props) {
  const { label, name, value, options, typeImportent, ...rest } = props;
  return (
    <div className="mb-1 d-flex justify-content-around align-items-center flex-row">
      <div style={{ width: "100%" }}>
        {/* <div className="input-group"> */}
        <Label for={label}>{label}</Label>
        {typeImportent ? (
          <span className="mandate-field text-label">*</span>
        ) : (
          ""
        )}
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
            position: "relative",
            // bottom: "-16px",
          }}
        />
      </div>
      {/* </div> */}
    </div>
  );
}

export default SelectDropDown;
