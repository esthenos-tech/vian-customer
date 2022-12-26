import React, { useRef } from "react";
import { Form, Formik } from "formik";
import { TextField } from "../Component/TextField";
import { Card, Col } from "reactstrap";
import * as Yup from "yup";
import { FaEdit } from "react-icons/fa";
import SelectDropDown from "../Component/SelectDropDown";
import { createOgranisationStateLocation } from "../../dataLayer/OrganisationUpdateLocation/index";

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

const SelectState = ({ zone, state, handletabSwitch }) => {
  const handlerOrganisationStateLocation = async (payload) => {
    const response = await createOgranisationStateLocation(payload);
  };
  const selectRef = useRef();
  const selectRef1 = useRef();

  const validate = Yup.object({
    zone_code: Yup.string().required("This field is required"),
    code: Yup.string().required("This field is required"),
    state_id: Yup.string().required("This field is required"),
  });
  return (
    <Formik
      initialValues={{
        zone_code: "",
        code: "",
        state_id: "",
      }}
      validationSchema={validate}
      onSubmit={(statusFormData, { resetForm }) => {
        handlerOrganisationStateLocation(statusFormData);
        handletabSwitch("3");
        selectRef.current.select.clearValue();
        selectRef1.current.select.clearValue();
        resetForm();
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
                        Add Zone
                        <span className="mandate-field text-label">*</span>
                      </div>
                      <SelectDropDown
                        name="zone_code"
                        id="zone_code"
                        options={zone}
                        placeholder="Select Zone"
                        ref={selectRef}
                        onBlur={handleBlur}
                        onChange={(option) => {
                          if (option) {
                            setFieldValue("zone_code", option.value);
                          } else {
                            setFieldValue("zone_code", "");
                          }
                        }}
                      />
                    </Col>
                    <Col md="4" sm="12" className="">
                      <div className="input-text-label">
                        Select State
                        <span className="mandate-field text-label">*</span>
                      </div>
                      <SelectDropDown
                        name="code"
                        id="code"
                        options={state}
                        placeholder="Select State"
                        ref={selectRef1}
                        onBlur={handleBlur}
                        onChange={(option) => {
                          if (option) {
                            setFieldValue("code", option.value);
                          } else {
                            setFieldValue("code", "");
                          }
                        }}
                      />
                    </Col>
                    <Col md="4" sm="12" className="">
                      <div className="input-text-label">
                        State ID
                        <span className="mandate-field text-label">*</span>
                      </div>

                      <TextField
                        name="state_id"
                        type="text"
                        placeholder="Code"
                        validate={validateStatus}
                        maxLength={50}
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

export default SelectState;
