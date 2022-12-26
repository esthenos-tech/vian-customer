import React, { useRef, useState } from "react";
import { Formik } from "formik";
import Select from "react-select";
import { toast } from "react-toastify";
import { ErrorMessage } from "formik";

const ZoneUnassignForm = ({
  zoneLabel,
  zoneSelectBoxType,
  buttonName,
  customClass,
  validateSchema,
  UnassignmentType,
  initialValues,
  handlerUnassignment,
  selectCodes,
  selectPlaceholder,
  dropDownData,
}) => {
  const [nameField, setNameField] = useState(selectCodes);
  let selectRef = useRef();
  const clearValue = () => {
    selectRef.current.select.clearValue();
  };
  let selectBoxType = "";
  if (zoneSelectBoxType === "zone2") {
    selectBoxType = dropDownData[0].zone;
  }
  if (zoneSelectBoxType === "state") {
    selectBoxType = dropDownData[0].state;
  }
  if (zoneSelectBoxType === "cluster") {
    selectBoxType = dropDownData[0].cluster;
  }
  if (zoneSelectBoxType === "area") {
    selectBoxType = dropDownData[0].area;
  }
  if (zoneSelectBoxType === "branch") {
    selectBoxType = dropDownData[0].branch;
  }
  return (
    <div className={customClass}>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={(values, { resetForm }) => {
          handlerUnassignment(values, UnassignmentType);
          console.log(values);
          toast.success(`${zoneLabel} is unassigned`);
          clearValue();
          resetForm();
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleSubmit,
            handleChange,
            handleBlur,
            handleReset,
            setFieldValue,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <div className="row px-4">
                <div className="col-5 d-flex justify-content-start align-items-center">
                  <span>{zoneLabel}</span>
                </div>
                <div className="col-5 ">
                  <Select
                    className="react-select"
                    classNamePrefix="select"
                    options={selectBoxType}
                    name={nameField}
                    placeholder={selectPlaceholder}
                    menuPlacement="auto"
                    onChange={(option) => {
                      if (option) {
                        setFieldValue(nameField, option.value);
                      } else {
                        setFieldValue(nameField, "");
                      }
                    }}
                    ref={selectRef}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name={nameField}
                    component="div"
                    style={{
                      color: "red",
                      fontSize: ".8rem",
                      bottom: "-16px",
                    }}
                  />
                </div>

                <div className="col-md-2 ">
                  <button
                    className=" btn btn-primary "
                    color="none"
                    type="submit"
                  >
                    {buttonName}
                  </button>
                </div>
              </div>
              <hr />
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
export default ZoneUnassignForm;
