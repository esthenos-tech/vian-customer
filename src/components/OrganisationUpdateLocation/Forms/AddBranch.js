import React, { useState } from "react";
import { Form, Formik } from "formik";
import { TextField } from "../Component/TextField";
import { Card, Col } from "reactstrap";
import * as Yup from "yup";
import { FaEdit } from "react-icons/fa";
import SelectDropDown from "../Component/SelectDropDown";
import { GeolocationContainer } from "../Component/GeolocationContainer";
import { createOgranisationBranchLocation } from "../../dataLayer/OrganisationUpdateLocation";
import { toast } from "react-toastify";
import { useRef } from "react";

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

const AddBranch = ({ cluster }) => {
  const handlerOrganisationBranchLocation = async (payload) => {
    const response = await createOgranisationBranchLocation(payload);
  };
  const selectRef = useRef();
  const defaultLocationOnload = [12.96456705437624, 77.64380317571583];
  const validate = Yup.object({
    cluster_code: Yup.string().required("This field is required"),
    name: Yup.string().required("This field is required"),
    code: Yup.string().required("This field is required"),
  });
  const [gpsCoordinates, setGpsCoordinates] = useState("");
  const handleSubmitGeolocation = (props) => {
    setGpsCoordinates(props);
  };
  return (
    <Formik
      initialValues={{
        cluster_code: "",
        name: "",
        code: "",
      }}
      validationSchema={validate}
      onSubmit={(statusFormData, { resetForm }) => {
        if (gpsCoordinates === "") {
          toast.error("Select location from tag location...");
        } else {
          const payload = { ...statusFormData, ...gpsCoordinates };
          handlerOrganisationBranchLocation(payload);
          selectRef.current.select.clearValue();
          resetForm();
        }
      }}
    >
      {(formik) => {
        const { setFieldValue, handleBlur } = formik;

        return (
          <Form>
            <Card className="mb-0">
              <div className="row">
                <Col md="8" sm="12" className="">
                  <div className="row d-flex align-items-center">
                    <Col md="4" sm="12" className="">
                      <div className="input-text-label">
                        Select Cluster
                        <span className="mandate-field text-label">*</span>
                      </div>
                      <SelectDropDown
                        name="cluster_code"
                        id="cluster_code"
                        options={cluster}
                        placeholder="Select Cluster"
                        ref={selectRef}
                        onBlur={handleBlur}
                        classNamePrefix="select"
                        onChange={(option) => {
                          if (option) {
                            setFieldValue("cluster_code", option.value);
                          } else {
                            setFieldValue("cluster_code", "");
                          }
                        }}
                      />
                    </Col>
                    <Col md="4" sm="12" className="">
                      <div className="input-text-label">
                        Add Branch
                        <span className="mandate-field text-label">*</span>
                      </div>

                      <TextField
                        name="name"
                        type="text"
                        placeholder="Code"
                        maxLength={50}
                        validate={validateStatus}
                      />
                    </Col>
                    <Col md="4" sm="12" className="">
                      <div className="input-text-label">
                        Add Branch Code
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
                <Col md="2" sm="12" className="">
                  <div className="input-text-label d-flex justify-content-center">
                    Tag Location
                    <span className="mandate-field text-label">*</span>
                  </div>
                  <div className="d-flex justify-content-center">
                    <GeolocationContainer
                      handleSubmitGeolocation={handleSubmitGeolocation}
                      defaultLocationOnload={defaultLocationOnload}
                    />
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

export default AddBranch;
