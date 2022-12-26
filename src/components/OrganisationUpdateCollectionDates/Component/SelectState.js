import React, { useEffect, useState } from "react";
import { Field, ErrorMessage } from "formik";
import Select from "react-select";
import { Label } from "reactstrap";
import { getAllStatelocation } from "../../dataLayer/OrganisationUpdateLocation";

export const SelectState = (props) => {
  const { label, name, value, ...rest } = props;
  const initialState = {
    loading1: true,
    stateData: [],
  };
  const [{ loading1, stateData }, setStateCreation] = useState(initialState);
  const getAllStateValues = async (payload) => {
    const response = await getAllStatelocation(payload);
    if (response?.status === 200)
      if (response?.data?.results) {
        setStateCreation((prevState) => ({
          ...prevState,
          loading1: false,
          stateData: response?.data?.results,
        }));
      } else {
        return;
      }
  };
  const state = stateData.map((item) => {
    return { value: item.code, label: item.name };
  });
  useEffect(() => {
    getAllStateValues();
  }, []);
  return (
    <div className="mb-0 d-flex justify-content-around align-items-center flex-row">
      <div style={{ width: "100%" }}>
        <div className="">
          <div className="input-text-label">
            Select State
            <span className="mandate-field text-label">*</span>
          </div>
          <Select
            className="react-select"
            classNamePrefix="select"
            options={state}
            id={name}
            isMulti
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

export default SelectState;
