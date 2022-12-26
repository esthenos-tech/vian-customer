import React, { useRef, useEffect } from "react";
import Select from "react-select";
import { Formik } from "formik";
import {
  personal_info,
  Documents_SubmittedValues,
  Applicant_Age,
  Years_In_Business,
  Net_Income_Percentage,
  Income_Sources,
  Net_Income,
  Income_Pattern,
  Banking_Transactions,
  Liabilities,
} from "./ProfileScoredata";
import * as Yup from "yup";

const MyForm = ({ handlerProfileScoreData }) => {
  let selectRef = useRef();
  const clearValue = () => {
    selectRef.current.select.clearValue();
  };
  const validate = Yup.object({
    personal_info: Yup.string().required("This field is required"),
    Documents_SubmittedValues: Yup.string().required("This field is required"),
    Applicant_Age: Yup.string().required("This field is required"),
    Years_In_Business: Yup.string().required("This field is required"),
    Net_Income_Percentage: Yup.string().required("This field is required"),
    Income_Sources: Yup.string().required("This field is required"),
    Net_Income: Yup.string().required("This field is required"),
    Income_Pattern: Yup.string().required("This field is required"),
    Banking_Transactions: Yup.string().required("This field is required"),
    Liabilities: Yup.string().required("This field is required"),
  });
  return (
    <Formik
      initialValues={{
        personal_info: "",
        Documents_SubmittedValues: "",
        Applicant_Age: "",
        Years_In_Business: "",
        Net_Income_Percentage: "",
        Income_Sources: "",
        Net_Income: "",
        Income_Pattern: "",
        Banking_Transactions: "",
        Liabilities: "",
      }}
      onSubmit={(values, { resetForm }) => {
        handlerProfileScoreData(values);
        console.log(JSON.stringify(values, null, 2));
        clearValue();
        resetForm();
      }}
      validationSchema={validate}
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
            <div className="row">
              <div className="col-1 " style={{ marginTop: "9px" }}>
                <span className="sub-head-text" style={{ marginLeft: "20px" }}>
                  1
                </span>
              </div>

              <div className="col-6" style={{ marginTop: "9px" }}>
                <span className="sub-head-text">
                  Personal Information
                  <span className="mandate-field">*</span>
                </span>
              </div>

              <div className="col-5">
                <Select
                  classNamePrefix="select"
                  options={personal_info}
                  // value={values.name}
                  placeholder="Select"
                  name="personal_info"
                  ref={selectRef}
                  menuPlacement="auto"
                  onChange={(option) => {
                    if (option) {
                      setFieldValue("personal_info", option.value);
                    } else {
                      setFieldValue("personal_info", "");
                    }
                  }}
                  onBlur={handleBlur}
                />

                {errors.personal_info && touched.personal_info && (
                  <div
                    className="input-feedback error-message text-left"
                    style={{ color: "red", fontSize: "0.8rem" }}
                  >
                    {errors.personal_info}
                  </div>
                )}
              </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-1 " style={{ marginTop: "9px" }}>
                <span className="sub-head-text" style={{ marginLeft: "20px" }}>
                  2
                </span>
              </div>

              <div className="col-6" style={{ marginTop: "9px" }}>
                <span className="sub-head-text">
                  No Of Documents Submitted
                  <span className="mandate-field">*</span>
                </span>
              </div>

              <div className="col-5">
                <Select
                  classNamePrefix="select"
                  options={Documents_SubmittedValues}
                  // value={values.name}
                  placeholder="Select"
                  name="Documents_SubmittedValues"
                  ref={selectRef}
                  menuPlacement="auto"
                  onChange={(option) => {
                    if (option) {
                      setFieldValue("Documents_SubmittedValues", option.value);
                    } else {
                      setFieldValue("Documents_SubmittedValues", "");
                    }
                  }}
                  onBlur={handleBlur}
                />

                {errors.Documents_SubmittedValues &&
                  touched.Documents_SubmittedValues && (
                    <div
                      className="input-feedback error-message text-left"
                      style={{ color: "red", fontSize: "0.8rem" }}
                    >
                      {errors.Documents_SubmittedValues}
                    </div>
                  )}
              </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-1 " style={{ marginTop: "9px" }}>
                <span className="sub-head-text" style={{ marginLeft: "20px" }}>
                  3
                </span>
              </div>

              <div className="col-6" style={{ marginTop: "9px" }}>
                <span className="sub-head-text">
                  Applicant's Age
                  <span className="mandate-field">*</span>
                </span>
              </div>

              <div className="col-5">
                <Select
                  classNamePrefix="select"
                  options={Applicant_Age}
                  // value={values.name}
                  placeholder="Select"
                  name="Applicant_Age"
                  ref={selectRef}
                  menuPlacement="auto"
                  onChange={(option) => {
                    if (option) {
                      setFieldValue("Applicant_Age", option.value);
                    } else {
                      setFieldValue("Applicant_Age", "");
                    }
                  }}
                  onBlur={handleBlur}
                />

                {errors.Applicant_Age && touched.Applicant_Age && (
                  <div
                    className="input-feedback error-message text-left"
                    style={{ color: "red", fontSize: "0.8rem" }}
                  >
                    {errors.Applicant_Age}
                  </div>
                )}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-1 " style={{ marginTop: "9px" }}>
                <span className="sub-head-text" style={{ marginLeft: "20px" }}>
                  4
                </span>
              </div>

              <div className="col-6" style={{ marginTop: "9px" }}>
                <span className="sub-head-text">
                  No Of Years In Business
                  <span className="mandate-field">*</span>
                </span>
              </div>

              <div className="col-5">
                <Select
                  classNamePrefix="select"
                  options={Years_In_Business}
                  // value={values.name}
                  placeholder="Select"
                  name="Years_In_Business"
                  ref={selectRef}
                  menuPlacement="auto"
                  onChange={(option) => {
                    if (option) {
                      setFieldValue("Years_In_Business", option.value);
                    } else {
                      setFieldValue("Years_In_Business", "");
                    }
                  }}
                  onBlur={handleBlur}
                />

                {errors.Years_In_Business && touched.Years_In_Business && (
                  <div
                    className="input-feedback error-message text-left"
                    style={{ color: "red", fontSize: "0.8rem" }}
                  >
                    {errors.Years_In_Business}
                  </div>
                )}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-1 " style={{ marginTop: "9px" }}>
                <span className="sub-head-text" style={{ marginLeft: "20px" }}>
                  5
                </span>
              </div>

              <div className="col-6" style={{ marginTop: "9px" }}>
                <span className="sub-head-text">
                  Net Income Percentage Of Total
                  <span className="mandate-field">*</span>
                </span>
              </div>

              <div className="col-5">
                <Select
                  classNamePrefix="select"
                  options={Net_Income_Percentage}
                  // value={values.name}
                  placeholder="Select"
                  name="Net_Income_Percentage"
                  ref={selectRef}
                  menuPlacement="auto"
                  onChange={(option) => {
                    if (option) {
                      setFieldValue("Net_Income_Percentage", option.value);
                    } else {
                      setFieldValue("Net_Income_Percentage", "");
                    }
                  }}
                  onBlur={handleBlur}
                />

                {errors.Net_Income_Percentage && touched.Net_Income_Percentage && (
                  <div
                    className="input-feedback error-message text-left"
                    style={{ color: "red", fontSize: "0.8rem" }}
                  >
                    {errors.Net_Income_Percentage}
                  </div>
                )}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-1 " style={{ marginTop: "9px" }}>
                <span className="sub-head-text" style={{ marginLeft: "20px" }}>
                  6
                </span>
              </div>

              <div className="col-6" style={{ marginTop: "9px" }}>
                <span className="sub-head-text">
                  No Of Income Sources
                  <span className="mandate-field">*</span>
                </span>
              </div>

              <div className="col-5">
                <Select
                  classNamePrefix="select"
                  options={Income_Sources}
                  // value={values.name}
                  placeholder="Select"
                  name="Income_Sources"
                  ref={selectRef}
                  menuPlacement="auto"
                  onChange={(option) => {
                    if (option) {
                      setFieldValue("Income_Sources", option.value);
                    } else {
                      setFieldValue("Income_Sources", "");
                    }
                  }}
                  onBlur={handleBlur}
                />

                {errors.Income_Sources && touched.Income_Sources && (
                  <div
                    className="input-feedback error-message text-left"
                    style={{ color: "red", fontSize: "0.8rem" }}
                  >
                    {errors.Income_Sources}
                  </div>
                )}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-1 " style={{ marginTop: "9px" }}>
                <span className="sub-head-text" style={{ marginLeft: "20px" }}>
                  7
                </span>
              </div>

              <div className="col-6" style={{ marginTop: "9px" }}>
                <span className="sub-head-text">
                  Net Income
                  <span className="mandate-field">*</span>
                </span>
              </div>

              <div className="col-5">
                <Select
                  classNamePrefix="select"
                  options={Net_Income}
                  // value={values.name}
                  placeholder="Select"
                  name="Net_Income"
                  ref={selectRef}
                  menuPlacement="auto"
                  onChange={(option) => {
                    if (option) {
                      setFieldValue("Net_Income", option.value);
                    } else {
                      setFieldValue("Net_Income", "");
                    }
                  }}
                  onBlur={handleBlur}
                />

                {errors.Net_Income && touched.Net_Income && (
                  <div
                    className="input-feedback error-message text-left"
                    style={{ color: "red", fontSize: "0.8rem" }}
                  >
                    {errors.Net_Income}
                  </div>
                )}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-1 " style={{ marginTop: "9px" }}>
                <span className="sub-head-text" style={{ marginLeft: "20px" }}>
                  8
                </span>
              </div>

              <div className="col-6" style={{ marginTop: "9px" }}>
                <span className="sub-head-text">
                  Income Pattern
                  <span className="mandate-field">*</span>
                </span>
              </div>

              <div className="col-5">
                <Select
                  classNamePrefix="select"
                  options={Income_Pattern}
                  // value={values.name}
                  placeholder="Select"
                  name="Income_Pattern"
                  ref={selectRef}
                  menuPlacement="auto"
                  onChange={(option) => {
                    if (option) {
                      setFieldValue("Income_Pattern", option.value);
                    } else {
                      setFieldValue("Income_Pattern", "");
                    }
                  }}
                  onBlur={handleBlur}
                />

                {errors.Income_Pattern && touched.Income_Pattern && (
                  <div
                    className="input-feedback error-message text-left"
                    style={{ color: "red", fontSize: "0.8rem" }}
                  >
                    {errors.Income_Pattern}
                  </div>
                )}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-1 " style={{ marginTop: "9px" }}>
                <span className="sub-head-text" style={{ marginLeft: "20px" }}>
                  9
                </span>
              </div>

              <div className="col-6" style={{ marginTop: "9px" }}>
                <span className="sub-head-text">
                  Is Banking Transactions?
                  <span className="mandate-field">*</span>
                </span>
              </div>

              <div className="col-5">
                <Select
                  classNamePrefix="select"
                  options={Banking_Transactions}
                  // value={values.name}
                  placeholder="Select"
                  name="Banking_Transactions"
                  ref={selectRef}
                  menuPlacement="top"
                  onChange={(option) => {
                    if (option) {
                      setFieldValue("Banking_Transactions", option.value);
                    } else {
                      setFieldValue("Banking_Transactions", "");
                    }
                  }}
                  onBlur={handleBlur}
                />

                {errors.Banking_Transactions && touched.Banking_Transactions && (
                  <div
                    className="input-feedback error-message text-left"
                    style={{ color: "red", fontSize: "0.8rem" }}
                  >
                    {errors.Banking_Transactions}
                  </div>
                )}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-1 " style={{ marginTop: "9px" }}>
                <span className="sub-head-text" style={{ marginLeft: "20px" }}>
                  10
                </span>
              </div>

              <div className="col-6" style={{ marginTop: "9px" }}>
                <span className="sub-head-text">
                  What Are Liabilities?
                  <span className="mandate-field">*</span>
                </span>
              </div>

              <div className="col-5">
                <Select
                  classNamePrefix="select"
                  options={Liabilities}
                  // value={values.name}
                  placeholder="Select"
                  name="Liabilities"
                  ref={selectRef}
                  menuPlacement="top"
                  onChange={(option) => {
                    if (option) {
                      setFieldValue("Liabilities", option.value);
                    } else {
                      setFieldValue("Liabilities", "");
                    }
                  }}
                  onBlur={handleBlur}
                />

                {errors.Liabilities && touched.Liabilities && (
                  <div
                    className="input-feedback error-message text-left"
                    style={{ color: "red", fontSize: "0.8rem" }}
                  >
                    {errors.Liabilities}
                  </div>
                )}
              </div>
            </div>
            <hr />

            <div className=" justify-content-center d-flex">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default MyForm;
