import React from "react";
import { Form, Formik } from "formik";
import { Card, CardHeader, CardTitle, CardBody, Col } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import "flatpickr/dist/themes/light.css";
import { NavLink } from "react-router-dom";
import { TextField } from "../Component/TextField";
import * as Yup from "yup";
import { NumberField } from "../Component/NumberField";
import { BsCheck2Circle } from "react-icons/bs";
import { IoIosKeypad } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";

function validateStatus(value) {
  let error;
  const regex = /^[^-\s0-9*|\":<>[\]{}`\\()';@&$=+~!][a-zA-Z_\s]*$/;
  const regexNumber = /^[^0-9]*$/;
  if (!value) {
    error = "This field is required";
  } else if (!regex.test(value)) {
    error = "Only alphabets are allowed";
  } else if (!regexNumber.test(value)) {
    error = "Numbers not allowed";
  }
  return error;
}
function OrganisationStatusCreationForm({ handlerSubmitStatusCreation }) {
  const validate = Yup.object({
    status: Yup.string(),
    status_code: Yup.string()
      .required("This field is required")
      .matches(/^[0-9]+$/, "Only Numbers Allowed"),
    status_message: Yup.string(),
  });
  return (
    <Formik
      initialValues={{
        status: "",
        status_code: "",
        status_message: "",
      }}
      validationSchema={validate}
      onSubmit={(statusFormData, { resetForm }) => {
        handlerSubmitStatusCreation(statusFormData);
        resetForm();
      }}
    >
      {(formik) => (
        <Form>
          <Card>
            <CardBody>
              <div className="container ">
                <div className="row d-flex align-items-center">
                  <Col md="4" sm="12" className="mb-2">
                    <div className="input-text-label">
                      Status<span className="mandate-field text-label">*</span>
                    </div>

                    <TextField
                      name="status"
                      type="text"
                      placeholder="Enter Status"
                      validate={validateStatus}
                      maxLength={50}
                    />
                  </Col>

                  <Col md="4" sm="12" className="mb-2">
                    <div className="input-text-label">
                      Status Code
                      <span className="mandate-field text-label">*</span>
                    </div>

                    <NumberField
                      name="status_code"
                      type="text"
                      placeholder="Enter Status Code"
                      maxLength={6}
                    />
                  </Col>
                  <Col md="4" sm="12" className="mb-2">
                    <div className="input-text-label">
                      Status Message
                      <span className="mandate-field text-label">*</span>
                    </div>

                    <TextField
                      name="status_message"
                      type="text"
                      placeholder="Enter Status Message"
                      validate={validateStatus}
                      maxLength={50}
                    />
                  </Col>
                </div>
                <div className="d-flex justify-content-end mt-1">
                  <button type="submit" className="btn btn-primary mr-1">
                    Add Status
                  </button>
                  <button type="reset" className="btn btn-danger mr-1">
                    Clear
                  </button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Form>
      )}
    </Formik>
  );
}

export default OrganisationStatusCreationForm;
