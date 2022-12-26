import React from "react";
import { Formik } from "formik";
import { addDays } from "date-fns";
import ReportDatePicker from "./ReportDatepicker/ReportDatepicker";
import { FormGroup } from "reactstrap";
import * as Icon from "react-feather";

const ReportForm = ({
  buttonName,
  isDisabledField,
  customClass,
  initialValues,
  validateSchema,
  handlerReport,
  report_name,
}) => {
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
          handlerReport(values, report_name);
          resetForm();
        }}
        validationSchema={validateSchema}
      >
        {(props) => {
          const { values, touched, errors, handleSubmit } = props;
          return (
            <form onSubmit={handleSubmit}>
              <div className="row">
                {isDisabledField ? (
                  <FormGroup className="form-label-group col-md-4">
                    <ReportDatePicker
                      name="report_start_date"
                      value={values.report_start_date}
                      dateFormat="dd-MM-yyyy"
                      placeholderText="Start date"
                      autoComplete="off"
                      customClassName={
                        errors.report_start_date &&
                        touched.report_start_date &&
                        "border-red"
                      }
                    />
                    {errors.report_start_date && touched.report_start_date && (
                      <div className="input-feedback error-message text-left">
                        {errors.report_start_date}
                      </div>
                    )}
                  </FormGroup>
                ) : (
                  <div className="col-md-4">
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
                  <FormGroup className="form-label-group col-md-4">
                    <ReportDatePicker
                      name="report_end_date"
                      dateFormat="dd-MM-yyyy"
                      placeholderText="End date"
                      autoComplete="off"
                      minDate={values.report_start_date}
                      maxDate={addDays(new Date(values.report_start_date), 180)}
                      customClassName={
                        errors.report_end_date &&
                        touched.report_end_date &&
                        "border-red"
                      }
                      isDisabled={values.report_start_date ? false : true}
                    />
                    {errors.report_end_date && touched.report_end_date && (
                      <div className="input-feedback error-message text-left">
                        {errors.report_end_date}
                      </div>
                    )}
                  </FormGroup>
                ) : (
                  <div className="col-md-4">
                    <input
                      style={{ cursor: "not-allowed" }}
                      className="form-control"
                      type="text"
                      placeholder={todaysDate}
                      disabled
                    />
                  </div>
                )}
                <div className="col-md-4">
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
