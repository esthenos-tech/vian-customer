import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { Label } from "reactstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { getApplicationRejectionDropDown } from "../../../components/dataLayer/ApplicationLayer";
import TextArea from "./FormInputComponents/TextArea";

const ApplicationForcefullyUpdateCbFailed = ({
  handlerSubmitApplicationUpdateStatus,
  texthead,
  placeHolder,
  textAreaPlaceHolder,
  update_type_Value,
  inetialValues,
}) => {
  const textRef = useRef();
  const selectRef = useRef();
  const [textBoxVisable, setTextBoxVisable] = useState();
  const [pointer, setPointer] = useState("not-allowed");

  const validate = Yup.object({
    update_reason: Yup.string(),
    other_reason: Yup.string(),
  });
  const initialstatusCreation = {
    loading: false,
    status: [],
  };
  const [{ loading, status }, setStateCreation] = useState(
    initialstatusCreation
  );
  //for api just add endpoint and change data keywords
  //   const getOrganisationstatusDetails = async () => {
  //     const response = await getApplicationRejectionDropDown();
  //     if (response && response.results)
  //       setStateCreation((prevState) => ({
  //         ...prevState,
  //         loading: false,
  //         status: response?.results.map((item) => {
  //           return { value: item.status_code, label: item.status };
  //         }),
  //       }));
  //   };

  //   useEffect(() => {
  //     getOrganisationstatusDetails();
  //   }, []);
  return (
    <Formik
      initialValues={inetialValues}
      validationSchema={validate}
      onSubmit={(values, { resetForm }) => {
        const payload = {
          ...values,
          update_type: update_type_Value,
        };
        handlerSubmitApplicationUpdateStatus(payload);
        selectRef.current.select.clearValue();
        resetForm();
      }}
    >
      {(formik) => {
        const {
          values,
          touched,
          errors,
          handleSubmit,
          handleChange,
          handleBlur,
          handleReset,
          setFieldValue,
        } = formik;

        return (
          <Form>
            <div className="d-flex">
              <h5 for="name">{texthead}</h5>
              <span className="mandate-field text-label">*</span>
            </div>
            <Select
              className="react-select"
              classNamePrefix="select"
              ref={selectRef}
              label="Select Status"
              isLoading={loading}
              name="update_reason"
              id="update_reason"
              options={dataSet}
              placeholder={placeHolder}
              onChange={(option) => {
                if (option) {
                  setFieldValue("update_reason", option.value);
                  setTextBoxVisable(option.value);
                  setPointer("pointer");
                } else {
                  setFieldValue("update_reason", "");
                  setPointer("not-allowed");
                  setTextBoxVisable("");
                }
              }}
            />
            {textBoxVisable === "999" ? (
              <TextArea
                name="other_reason"
                rows="6"
                ref={textRef}
                placeholder={textAreaPlaceHolder}
              />
            ) : (
              <></>
            )}
            <div className="d-flex justify-content-end">
              {pointer === "pointer" ? (
                <button
                  className="btn btn-primary mt-1"
                  style={{ cursor: pointer }}
                  type="submit"
                >
                  Submit
                </button>
              ) : (
                <button
                  className="btn btn-primary mt-1"
                  style={{ cursor: pointer }}
                  type="submit"
                  disabled
                >
                  Submit
                </button>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ApplicationForcefullyUpdateCbFailed;

const dataSet = [
  { value: "1", label: "Reason One" },
  { value: "2", label: "Reason Two" },
  { value: "3", label: "Reason three" },
  { value: "999", label: "Other Reason" },
];
