import React from "react";
import { ErrorMessage } from "formik";
import Select from "react-select";
import { Label } from "reactstrap";

const SelectDropDownRef = (props, ref) => {
  const { label, name, value, defaultValue, options, ...rest } = props;
  return (
    <div className="mb-0 d-flex justify-content-around align-items-center flex-row">
      <div style={{ width: "100%" }}>
        <div className="row">
          <div className="col-6">
            <h6 for={name}>{label}</h6>{" "}
          </div>
          <div className="col-6">
            <Select
              className="react-select"
              classNamePrefix="select"
              options={options}
              id={name}
              name={name}
              ref={ref}
              defaultValue={defaultValue}
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
    </div>
  );
};

const SelectDropDown = React.forwardRef(SelectDropDownRef);
export default SelectDropDown;
