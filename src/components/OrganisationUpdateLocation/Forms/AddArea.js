import React, { useRef } from "react";
import { Form, Formik } from "formik";
import { TextField } from "../Component/TextField";
import { Card, Col } from "reactstrap";
import * as Yup from "yup";
import { FaEdit } from "react-icons/fa";
import SelectDropDown from "../Component/SelectDropDown";
import { createOgranisationAreaLocation } from "../../dataLayer/OrganisationUpdateLocation";

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

const AddArea = ({ state, handletabSwitch }) => {
  const handlerOrganisationAreaLocation = async (payload) => {
    const response = await createOgranisationAreaLocation(payload);
  };
  const selectRef = useRef();
  const validate = Yup.object({
    state_code: Yup.string().required("This field is required"),
    name: Yup.string().required("This field is required"),
    code: Yup.string().required("This field is required"),
  });
  return (
    <Formik
      initialValues={{
        state_code: "",
        name: "",
        code: "",
      }}
      validationSchema={validate}
      onSubmit={(statusFormData, { resetForm }) => {
        handlerOrganisationAreaLocation(statusFormData);
        handletabSwitch("4");
        resetForm();
        selectRef.current.select.clearValue();
      }}
    >
      {(formik) => {
        const { handleBlur, setFieldValue } = formik;

        return (
          <Form>
            <Card className="mb-0">
              <div className="row">
                <Col md="10" sm="12" className="">
                  <div className="row d-flex align-items-center">
                    <Col md="4" sm="12" className="">
                      <div className="input-text-label">
                        Select State
                        <span className="mandate-field text-label">*</span>
                      </div>
                      <SelectDropDown
                        name="state_code"
                        id="state_code"
                        ref={selectRef}
                        onBlur={handleBlur}
                        options={state}
                        placeholder="Select State"
                        onChange={(option) => {
                          if (option) {
                            setFieldValue("state_code", option.value);
                          } else {
                            setFieldValue("state_code", "");
                          }
                        }}
                      />
                    </Col>
                    <Col md="4" sm="12" className="">
                      <div className="input-text-label">
                        Add Area
                        <span className="mandate-field text-label">*</span>
                      </div>
                      <TextField
                        name="name"
                        type="text"
                        placeholder="Name"
                        maxLength={50}
                        validate={validateStatus}
                      />
                    </Col>
                    <Col md="4" sm="12" className="">
                      <div className="input-text-label">
                        Add Area Code
                        <span className="mandate-field text-label">*</span>
                      </div>

                      <TextField
                        name="code"
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
        );
      }}
    </Formik>
  );
};

export default AddArea;
