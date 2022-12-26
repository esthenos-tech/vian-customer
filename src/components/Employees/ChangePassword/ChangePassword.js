import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import { NavLink } from "react-router-dom";
import { PasswordField } from "../component/PasswordField";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import {
  employeeChangePassword,
  getParticularEmployeeDetails,
} from "../../dataLayer/EmployeeLayer";
import "./style.css";
import * as Yup from "yup";
import { Card, CardBody } from "reactstrap";

const ChangePassword = (props) => {
  const [state1, setState1] = useState(false);
  const toggleBtn1 = () => {
    setState1((prevState) => !prevState);
  };

  const [state2, setState2] = useState(false);
  const toggleBtn2 = () => {
    setState2((prevState) => !prevState);
  };
  const [particularEmployeeDetails, setParticularEmployeeDetails] = useState(
    {}
  );
  const name = particularEmployeeDetails.name;
  const email = particularEmployeeDetails.email;
  const validate = Yup.object({
    password: Yup.string()
      .min(8, "Must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "A password must contains a combination of uppercase and lowercase letter, number and special character."
      )
      .required("This field is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("This field is required"),
  });

  const handlerChangePassword = async (formData) => {
    let formDataNew = {
      email: particularEmployeeDetails.email,
      password: formData.password,
    };
    await employeeChangePassword(props.match.params.id, formDataNew);
  };
  const getParticularEmployeeDetail = async () => {
    const response = await getParticularEmployeeDetails(props.match.params.id);
    if (response && response.data) {
      setParticularEmployeeDetails(response.data);
    }
  };
  useEffect(() => {
    getParticularEmployeeDetail();
  }, [props.match.params.id]);
  return (
    <Formik
      initialValues={{
        password: "",
        confirm_password: "",
      }}
      validationSchema={validate}
      onSubmit={(updatePasswordData, { resetForm }) => {
        handlerChangePassword(updatePasswordData);
        resetForm();
      }}
    >
      {(formik) => (
        <Form>
          <Card>
            <CardBody className="mx-2">
              <div className="container">
                <section>
                  <div className="row mb-2">
                    <div className="col ml-2" style={{ width: "100%" }}>
                      <p>
                        <b>Name : </b>
                        <span>{name}</span>
                      </p>
                    </div>
                    <div className="col  ml-2" style={{ width: "100%" }}>
                      <p>
                        <b>Email : </b>
                        <span>{email}</span>
                      </p>
                    </div>
                  </div>
                  <hr />
                </section>
                <div className="row">
                  <div className="col-2"></div>
                  <div className="col-8 ">
                    <b>Change password</b>
                    <div className="m-2 input-element-wrapper">
                      <PasswordField
                        className="form-control password-field"
                        placeholder="Enter Password"
                        label="Enter password"
                        name="password"
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
                    </div>
                    <div className="m-2 input-element-wrapper">
                      <PasswordField
                        className="form-control password-field"
                        placeholder="Confirm Password"
                        label="Confirm password"
                        name="confirm_password"
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
                    </div>
                  </div>
                  <div className="col-2"></div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-2"></div>
                  <div className="col-8 d-flex justify-content-end">
                    <button
                      color="primary"
                      type="submit"
                      className="btn btn-primary mr-1 mb-1"
                    >
                      Change password
                    </button>
                    <NavLink to="/organisation/employee">
                      <button
                        color="danger"
                        type="reset"
                        className="btn btn-danger mr-1 mb-1"
                      >
                        Cancel
                      </button>
                    </NavLink>
                  </div>
                  <div className="col-2"></div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePassword;
