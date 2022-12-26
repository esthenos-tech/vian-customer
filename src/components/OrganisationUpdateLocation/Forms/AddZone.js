import React from "react";
import { Form, Formik } from "formik";
import { TextField } from "../Component/TextField";
import { Card, Col } from "reactstrap";
import * as Yup from "yup";
import { FaEdit } from "react-icons/fa";
import { createOgranisationZoneLocation } from "../../dataLayer/OrganisationUpdateLocation";

function validateStatus(value) {
  let error;
  const regex = /^[^-\s*\":<>[\]{}`\\()';@&$=+~!][a-zA-Z0-9\s]*$/;
  if (!value) {
    error = "This field is required";
  } else if (!regex.test(value)) {
    error = "Only alphanumeric are allowed";
  }
  return error;
}

function validateStatusCode(value) {
  let error;
  const regex = /^[^-\s*|\":<>[\]{}`\\()';@&$=+~!][A-Z0-9_]*$/;
  if (!value) {
    error = "This field is required";
  } else if (!regex.test(value)) {
    error =
      "Enter capital letters without space or special character, except '_'";
  }
  return error;
}

const AddZone = ({ handletabSwitch }) => {
  const handlerOrganisationZoneLocation = async (payload) => {
    const response = await createOgranisationZoneLocation(payload);
  };

  const validate = Yup.object({
    name: Yup.string().min(2, "Enter more then one characters"),
    code: Yup.string().min(2, "Enter more then one characters"),
  });
  return (
    <Formik
      initialValues={{
        name: "",
        code: "",
      }}
      validationSchema={validate}
      onSubmit={(statusFormData, { resetForm }) => {
        handlerOrganisationZoneLocation(statusFormData);
        handletabSwitch("2");
        resetForm();
      }}
    >
      {(formik) => (
        <Form>
          <Card className="mb-0">
            <div className="row">
              <Col md="10" sm="12" className="">
                <div className="row d-flex align-items-center">
                  <Col md="4" sm="12" className="">
                    <div className="input-text-label">
                      Add Zone
                      <span className="mandate-field text-label">*</span>
                    </div>

                    <TextField
                      name="name"
                      id="name"
                      type="text"
                      placeholder="Name"
                      maxLength={50}
                      validate={validateStatus}
                    />
                  </Col>

                  <Col md="4" sm="12" className="">
                    <div className="input-text-label">
                      Add Zone Code
                      <span className="mandate-field text-label">*</span>
                    </div>

                    <TextField
                      name="code"
                      id="code"
                      type="text"
                      placeholder="Code"
                      maxLength={50}
                      validate={validateStatusCode}
                    />
                  </Col>
                </div>
              </Col>
              <Col md="2" sm="12" className="d-flex align-items-center">
                <button type="submit" className="btn btn-primary">
                  <FaEdit style={{ fontSize: "18px", marginRight: "5px" }} />
                  Add
                </button>
              </Col>
            </div>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default AddZone;
