import React from "react";
import { ErrorMessage } from "formik";
import Select from "react-select";
const SelectDropDownRef = (props, ref) => {
  const { label, name, value, options, ...rest } = props;
  return (
    <div className="mb-0 d-flex justify-content-around align-items-center flex-row">
      <div style={{ width: "100%" }}>
        <div className="">
          <Select
            className="react-select"
            classNamePrefix="select"
            options={options}
            id={name}
            ref={ref}
            isClearable={true}
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

const SelectDropDown = React.forwardRef(SelectDropDownRef);
export default SelectDropDown;
