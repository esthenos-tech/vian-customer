import React, { useEffect, useState, useRef } from "react";
import { Formik } from "formik";
import { addDays } from "date-fns";
import ReportDatePicker from "./ReportDatepicker/ReportDatepicker";
import { FormGroup, Spinner } from "reactstrap";
import * as Icon from "react-feather";
import Select from "react-select";

const ReportForm = ({
  isActive,
  buttonName,
  isDisabledField,
  customClass,
  initialValues,
  reportType,
  validateSchema,
  handlerReport,
  partnerCode,
  isLoading,
  menuPlacement,
}) => {
  let selectRef = useRef();
  const clearValue = () => {
    selectRef.current.select.clearValue();
  };
  const current = new Date();
  const todaysDate = `${current.getFullYear()}-${(
    "0" +
    (current.getMonth() + 1)
  ).slice(-2)}-${("0" + current.getDate()).slice(-2)}`;

  return (
    <div className={customClass}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          handlerReport(values, reportType);
          clearValue();
          resetForm();
        }}
        validationSchema={validateSchema}
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
                {isDisabledField ? (
                  <FormGroup className="form-label-group col-md-3">
                    <ReportDatePicker
                      name="start_date"
                      value={values.start_date}
                      dateFormat="dd-MM-yyyy"
                      placeholderText="Start date"
                      autoComplete="off"
                      customClassName={
                        errors.start_date && touched.start_date && "border-red"
                      }
                    />
                    {errors.start_date && touched.start_date && (
                      <div className="input-feedback error-message text-left">
                        {errors.start_date}
                      </div>
                    )}
                  </FormGroup>
                ) : (
                  <div className="col-md-3">
                    <input
                      className="form-control"
                      style={{ cursor: "not-allowed" }}
                      type="text"
                      placeholder="Jan 2019"
                      disabled
                    />
                  </div>
                )}
                {isDisabledField ? (
                  <FormGroup className="form-label-group col-md-3">
                    <ReportDatePicker
                      name="end_date"
                      dateFormat="dd-MM-yyyy"
                      placeholderText="End date"
                      autoComplete="off"
                      minDate={values.start_date}
                      maxDate={addDays(new Date(values.start_date), 90)}
                      customClassName={
                        errors.end_date && touched.end_date && "border-red"
                      }
                      isDisabled={values.start_date ? false : true}
                    />
                    {errors.end_date && touched.end_date && (
                      <div className="input-feedback error-message text-left">
                        {errors.end_date}
                      </div>
                    )}
                  </FormGroup>
                ) : (
                  <div className="col-md-3">
                    <input
                      style={{ cursor: "not-allowed" }}
                      className="form-control"
                      type="text"
                      placeholder={todaysDate}
                      disabled
                    />
                  </div>
                )}
                {isActive ? (
                  <div className="form-label-group col-md-3">
                    <Select
                      classNamePrefix="select"
                      options={partnerCode}
                      placeholder="Partner"
                      name="partner_code"
                      ref={selectRef}
                      menuPlacement={menuPlacement}
                      onChange={(option) => {
                        if (option) {
                          setFieldValue("partner_code", option.value);
                        } else {
                          setFieldValue("partner_code", "");
                        }
                      }}
                      isLoading={isLoading}
                      onBlur={handleBlur}
                    />

                    {errors.partner_code && touched.partner_code && (
                      <div className="input-feedback error-message text-left">
                        {errors.partner_code}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="col-md-3"></div>
                )}
                <div className="col-md-3">
                  <button
                    className=" btn btn-cust btn-primary w-100 mb-2 d-flex text-left"
                    color="none"
                    type="submit"
                    style={{ fontSize: "12px", fontWeight: "600" }}
                  >
                    <Icon.FileText size={18} style={{ marginRight: "4px" }} />
                    {buttonName}
                  </button>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
export default ReportForm;
