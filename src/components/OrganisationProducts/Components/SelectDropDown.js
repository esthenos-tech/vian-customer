import React from "react";
import { Field, ErrorMessage } from "formik";
import Select from "react-select";
import { Label } from "reactstrap";
export const SelectDropDown = (props) => {
  const { label, name, value, options, ...rest } = props;
  return (
    <div className="mb-0 d-flex justify-content-around align-items-center flex-row">
      <div style={{ width: "100%" }}>
        <div className="">
          <Label for={name}>{label}</Label>{" "}
          <span className="mandate-field text-label">*</span>
          <Select
            className="react-select"
            classNamePrefix="select"
            options={options}
            id={name}
            name={name}
            {...rest}
            {...props}
          />
          <ErrorMessage
            name={name}
            component="div"
            style={{
              color: "red",
              fontSize: ".8rem",
              // position: "absolute",
              bottom: "-16px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectDropDown;
