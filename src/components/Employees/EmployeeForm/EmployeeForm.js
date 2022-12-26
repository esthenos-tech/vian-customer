import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Label,
  Input,
} from "reactstrap";
import "flatpickr/dist/themes/light.css";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { TextField } from "../component/TextField";
import { NumberField } from "../component/NumberField";
import * as Yup from "yup";
import CustError from "../component/CustError";
// import "../Employee.scss";
import SelectDropDown from "../component/SelectDropDown";
import "../ChangePassword/style.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { countryOptions, stateOptions } from "../EmployeeData";
import { PasswordField } from "../component/PasswordField";
import { DatePickerSelect } from "../component/DatePicker";
import SelectReactDropDown from "../component/SelectReactDropDown";
function EmployeeForm({
  handlerSubmitEmployeeCreation,
  designationDropdwonList,
  // accesspartnerDropDownList,
}) {
  const [state1, setState1] = useState(false);
  const toggleBtn1 = () => {
    setState1((prevState) => !prevState);
  };
  const hierchy_data = designationDropdwonList.map((list) => {
    return {
      label: `(${list.title.toUpperCase()}) ${list.title_full.toUpperCase()}`,
      value: list.id,
    };
  });
  const [state2, setState2] = useState(false);

  const toggleBtn2 = () => {
    setState2((prevState) => !prevState);
  };
  const validate = Yup.object().shape({
    first_name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .matches(/^[a-zA-Z]+$/g, "Only alphabets are allowed")
      .required("This field is required*"),
    last_name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .matches(/^[a-zA-Z]+$/g, "Only alphabets are allowed")
      .required("This field is required*"),
    email: Yup.string()
      .email("Email is invalid")
      .required("This field is required*"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "A password must contains a combination of uppercase and lowercase letter, number and special character."
      )
      .required("This field is required*"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("This field is required"),
    date_of_birth: Yup.date()
      .max(new Date(), "Date must not be later than today.")
      .required("This field is required*"),
    gender: Yup.string().required("This field is required*"),
    notify_email: Yup.string().email("Email is invalid"),
    hierarchy: Yup.string().required("This field is required*"),
    postal_address: Yup.string()
      .min(5, "too short")
      .max(200, "Must be 200 characters or less")
      .required("This field is required*"),
    postal_country: Yup.string().required("This field is required*"),
    postal_state: Yup.string()
      .matches(/^[a-zA-Z]+$/g, "Only alphabets are allowed")
      .required("This field is required*"),
    postal_city: Yup.string()
      .matches(/^[a-zA-Z]+$/g, "Only alphabets are allowed")
      .max(15, "Must be 15 characters or less")
      .required("This field is required*"),
    postal_code: Yup.string()
      .matches(/[0-9]{6}/, "Enter valid Postal code")
      .required("This field is required*"),
    postal_tele_code: Yup.string()
      .matches(/^\+\d{1,3}$/, "Enter valid country code (+)")
      .min(3, "Enter valid country code")
      .required("This field is required*"),
    postal_telephone: Yup.string()
      .required("This field is required*")
      .min(10, "Enter valid phone numbber")
      .matches(/^[6789]\d[0-9]+$/, "Enter valid phone number"),
    // access_partners: Yup.string(),
  });

  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        hierarchy: "",
        postal_country: "",
        date_of_birth: "",
        gender: "",
        notify_email: "",
        postal_address: "",
        postal_state: "",
        postal_city: "",
        postal_code: "",
        postal_tele_code: "+91",
        postal_telephone: "",
        // access_partners: "",
      }}
      validationSchema={validate}
      onSubmit={(employeeFormData, { resetForm }) => {
        handlerSubmitEmployeeCreation(employeeFormData);
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
          <div className="divider-text bg-transparent text-bold-600">
            <React.Fragment>
              <div className="container">
                <div className="row">
                  <div className="col-12 card ">
                    <div className="card-header">
                      <div className="card-title">Add Employee</div>
                    </div>
                    <Form>
                      <div className="row">
                        <div className="col-6 line">
                          <Card className="mb-0">
                            <CardHeader>
                              <CardTitle className="w-100">
                                <span className="span_head">
                                  Personal Information
                                </span>
                              </CardTitle>
                            </CardHeader>
                            <CardBody className="">
                              <Row>
                                <Col md="6" sm="12">
                                  <TextField
                                    name="first_name"
                                    id="first_name"
                                    label="First name"
                                    placeholder="First Name"
                                    type="text"
                                    isMand={true}
                                  />
                                </Col>
                                <Col md="6" sm="12">
                                  <TextField
                                    name="last_name"
                                    label="Last name"
                                    placeholder="Last Name"
                                    type="text"
                                    isMand={true}
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col md="6" sm="12">
                                  <TextField
                                    name="email"
                                    label="Email"
                                    placeholder="user-name@vian-dev.esthenos.com"
                                    type="email"
                                    isMand={true}
                                  />
                                </Col>
                                <Col md="6" sm="12">
                                  <TextField
                                    name="notify_email"
                                    label="Notify email"
                                    placeholder="user-name@vian-dev.esthenos.com"
                                    type="email"
                                    isMand={false}
                                  />
                                </Col>

                                <Col md="6" sm="12">
                                  <Label for="password">password</Label>
                                  <span className="mandate-field text-label">
                                    *
                                  </span>
                                  <PasswordField
                                    name="password"
                                    label="Password"
                                    placeholder="Enter password"
                                    customtype="true"
                                    type={state1 ? "text" : "password"}
                                    passwordstrengthfield={true}
                                  >
                                    <div className="input-group-append">
                                      <span
                                        className="input-group-text rounded-right"
                                        onClick={toggleBtn1}
                                      >
                                        {state1 ? (
                                          <AiOutlineEyeInvisible />
                                        ) : (
                                          <AiOutlineEye />
                                        )}
                                      </span>
                                    </div>
                                  </PasswordField>
                                </Col>
                                <Col md="6" sm="12">
                                  <Label for="password">Confirm Password</Label>
                                  <span className="mandate-field text-label">
                                    *
                                  </span>
                                  <PasswordField
                                    name="confirm_password"
                                    label="Confirm Password"
                                    placeholder="Confirm Password"
                                    customtype="false"
                                    type={state2 ? "text" : "password"}
                                    passwordstrengthfield={false}
                                  >
                                    <div className="input-group-append">
                                      <span
                                        className="input-group-text rounded-right"
                                        onClick={toggleBtn2}
                                      >
                                        {state2 ? (
                                          <AiOutlineEyeInvisible />
                                        ) : (
                                          <AiOutlineEye />
                                        )}
                                      </span>
                                    </div>
                                  </PasswordField>
                                </Col>
                              </Row>
                              <Row>
                                <Col md="6" sm="12">
                                  <DatePickerSelect
                                    name="date_of_birth"
                                    label="Date of joining"
                                    placeholder="Date of joining"
                                    format="YYYY-MM-DD"
                                  />
                                </Col>
                                <div
                                  className="col-sm-12 col-md-6 "
                                  style={{ marginTop: "8px" }}
                                >
                                  <Label for="password">Gender</Label>
                                  <span className="mandate-field text-label">
                                    *
                                  </span>
                                  <div className="d-flex align-items-center">
                                    <label>Male</label>
                                    <Field
                                      type="radio"
                                      value="male"
                                      name="gender"
                                      className="mx-1 "
                                    />
                                    <label>Female</label>
                                    <Field
                                      type="radio"
                                      value="female"
                                      name="gender"
                                      className="mx-1"
                                    />
                                    <CustError name="gender" />
                                  </div>
                                </div>
                              </Row>
                              <SelectReactDropDown
                                label="Hierarchy"
                                name="hierarchy"
                                id="hierarchy"
                                options={hierchy_data}
                                placeholder="Hierarchy"
                                onChange={(option) => {
                                  if (option) {
                                    setFieldValue("hierarchy", option.value);
                                  } else {
                                    setFieldValue("hierarchy", "");
                                  }
                                }}
                              />
                              {/* <Row>
                              <Col md="12" sm="12">
                                <SelectDropDown
                                  typeImportent={true}
                                  label="Hierarchy"
                                  name="hierarchy"
                                  options={dropdownManipulation(
                                    designationDropdwonList,
                                    "hierarchy"
                                  )}
                                />
                              </Col>
                            </Row> */}
                            </CardBody>
                          </Card>
                        </div>
                        <div className="col-6">
                          <Card className="mb-0">
                            <CardHeader>
                              <CardTitle className="w-100">
                                <span className="span_head">
                                  Postal Information
                                </span>
                              </CardTitle>
                            </CardHeader>
                            <CardBody>
                              <Row>
                                <Col md="12" sm="12">
                                  <TextField
                                    name="postal_address"
                                    label="Address"
                                    placeholder="Address"
                                    type="text"
                                    isMand={true}
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col md="6" sm="12">
                                  <div>
                                    <SelectDropDown
                                      label="Country"
                                      typeImportent={true}
                                      name="postal_country"
                                      options={countryOptions}
                                    />
                                  </div>
                                </Col>
                                <Col md="6" sm="12">
                                  <div>
                                    <SelectDropDown
                                      label="State"
                                      typeImportent={true}
                                      name="postal_state"
                                      options={stateOptions}
                                    />
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col md="6" sm="12">
                                  <TextField
                                    name="postal_city"
                                    placeholder="City"
                                    label="City"
                                    type="text"
                                    isMand={true}
                                  />
                                </Col>
                                <Col
                                  md="6"
                                  sm="12"
                                  className="d-flex align-items-end"
                                >
                                  <NumberField
                                    name="postal_code"
                                    label="Postal Code"
                                    placeholder="Postal Code"
                                    type="text"
                                    maxLength={6}
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col md="6" sm="12">
                                  <NumberField
                                    name="postal_tele_code"
                                    label="Country code"
                                    placeholder="+91"
                                    type="text"
                                    maxLength={3}
                                  />
                                </Col>
                                <Col md="6" sm="12">
                                  <NumberField
                                    type="text"
                                    name="postal_telephone"
                                    label="Phone number"
                                    placeholder="Phone number"
                                    id="phoneNumber"
                                    maxLength={10}
                                  />
                                </Col>
                              </Row>
                              {/* <Row>
                              <Col md="12" sm="12">
                                <SelectDropDown
                                  label="Access Partners"
                                  typeImportent={false}
                                  name="access_partners"
                                  options={dropdownManipulation(
                                    accesspartnerDropDownList,
                                    "access_partners"
                                  )}
                                />
                              </Col>
                            </Row> */}
                            </CardBody>
                          </Card>
                        </div>
                        <div className="d-flex justify-content-end w-100">
                          <Row>
                            <Col md="6" sm="12">
                              <button
                                color="primary"
                                type="submit"
                                className="mr-1 mb-1 btn btn-primary"
                              >
                                Add Employee
                              </button>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6" sm="12">
                              <NavLink to="/organisation">
                                <button
                                  color="danger"
                                  type="reset"
                                  className="mr-1 mb-1 btn btn-danger"
                                >
                                  Back
                                </button>
                              </NavLink>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </React.Fragment>
          </div>
        );
      }}
    </Formik>
  );
}

export default EmployeeForm;
