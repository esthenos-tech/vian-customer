import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { Label } from "reactstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { getApplicationRejectionDropDown } from "../../../components/dataLayer/ApplicationLayer";
import TextArea from "./FormInputComponents/TextArea";

const UpdateAgentRejectApplication = ({
  handlerApplicationRejectData,
  texthead,
  placeHolder,
  btnName,
  update_type,
  inetialValues,
}) => {
  const textRef = useRef();
  const selectRef = useRef();
  const [textBoxVisable, setTextBoxVisable] = useState(false);
  const [pointer, setPointer] = useState("not-allowed");

  const validate = Yup.object({
    rejection_remark: Yup.string(),
    rejection_comments: Yup.string(),
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
          update_type: update_type,
        };
        handlerApplicationRejectData(payload);
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
              <h5 for="name">{texthead}</h5>{" "}
              <span className="mandate-field text-label">*</span>
            </div>
            <Select
              className="react-select px-2"
              classNamePrefix="select"
              ref={selectRef}
              label="Select Status"
              isLoading={loading}
              name="rejection_remark"
              id="rejection_remark"
              options={dataSet}
              placeholder={placeHolder}
              onChange={(option) => {
                if (option) {
                  setFieldValue("rejection_remark", option.value);
                  setTextBoxVisable(true);
                  setPointer("pointer");
                } else {
                  setFieldValue("rejection_remark", "");
                  setPointer("not-allowed");
                  setTextBoxVisable(false);
                }
              }}
            />
            {textBoxVisable ? (
              <TextArea
                name="rejection_comments"
                rows="6"
                ref={textRef}
                placeholder="Rejection Remarks..."
              />
            ) : (
              <></>
            )}
            <div className="d-flex justify-content-center">
              {pointer === "pointer" ? (
                <button
                  className="btn btn-primary mt-1"
                  style={{ cursor: pointer }}
                  type="submit"
                >
                  {btnName}
                </button>
              ) : (
                <button
                  className="btn btn-primary mt-1"
                  style={{ cursor: pointer }}
                  type="submit"
                  disabled
                >
                  {btnName}
                </button>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UpdateAgentRejectApplication;

const dataSet = [
  { value: "Wrong data entry", label: "Wrong data entry" },
  { value: "CB Analysis failed", label: "CB Analysis failed" },
  { value: "Customer not interested", label: "Customer not interested" },
  {
    value: "Business stability norms not met",
    label: "Business stability norms not met",
  },
  { value: "Negative Profile", label: "Negative Profile" },
  { value: "DBR not met", label: "DBR not met" },
  {
    value: "Move to Relogin with changes",
    label: "Move to Relogin with changes",
  },
  { value: "Out of geo limit", label: "Out of geo limit" },
  { value: "Documents not provided", label: "Documents not provided" },
  { value: "PD Negative", label: "PD Negative" },
  { value: "Policy norms not met", label: "Policy norms not met" },
  { value: "Legal", label: "Legal" },
  { value: "Technical", label: "Technical" },
];
