import React, { useState, useRef } from "react";
import { FormLabel, Container, Row } from "react-bootstrap";
import { Alert, Col } from "reactstrap";
import { BsInfoCircle } from "react-icons/bs";
import ReactTooltip from "react-tooltip";
import { Input } from "reactstrap";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import { TextAreaField } from "./components/TextAreaField";
import Select from "react-select";
import { TextField } from "./components/TextField";
import { toast } from "react-toastify";

export const options2 = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
];

export const BreActionModalContainer = (props) => {
  const {
    modaldata,
    commoncategoryDropDown,
    handleBreFormData,
    catogeryID,
    showModalDataAfterSubmit,
    methodAction,
    buttonNameAction,
  } = props;

  let selectedFieldUpdate = false;
  let help_Data = "";
  let threshold = "";
  let description = "";
  const ruleId = modaldata?.rule_id;
  if (modaldata?.application_key !== undefined) {
    selectedFieldUpdate = true;

    var result = commoncategoryDropDown.find(function (post, index) {
      if (post.value == modaldata?.application_key) return true;
    });
    help_Data = result.help_Data;
    threshold = result.type;
    description = result.description;
  }

  const [selectedField, setSelectedField] = useState(selectedFieldUpdate);
  const [helpData, setHelpData] = useState(help_Data);
  const [typeOfThreshold, setTypeOfThreshold] = useState(threshold);
  let selectRef1 = useRef();
  let selectRef2 = useRef();

  const validate = Yup.object({
    application_key: Yup.string().required("This field is required*"),
    rule_level: Yup.string().required("This field is required*"),
    rule_type: Yup.string().required("This field is required*"),
    description: Yup.string().required("This field is required*"),
    rule_min: Yup.number().required("This field is required*"),
    rule_max: Yup.number()
      .required("This field is required*")
      .test("superior", "max must be greater than min", function (f) {
        const ref = Yup.ref("rule_min");
        return f > this.resolve(ref);
      }),
  });
  return (
    <Formik
      initialValues={{
        application_key: modaldata?.application_key,
        rule_level: modaldata?.rule_level,
        rule_type: typeOfThreshold,
        description: modaldata?.description,
        rule_min: modaldata?.rule_min,
        rule_max: modaldata?.rule_max,
      }}
      validationSchema={""}
      onSubmit={(formData, { resetForm }) => {
        if (formData.application_key === undefined) {
          toast.info("Rule is empty");
        } else {
          const payload = {
            ...formData,
            rule_type: typeOfThreshold,
          };
          handleBreFormData(payload, ruleId, methodAction);
          showModalDataAfterSubmit();
          selectRef1.current.select.clearValue();
          selectRef2.current.select.clearValue();
          resetForm();
        }
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
          setFieldValue,
        } = formik;
        return (
          <form onSubmit={handleSubmit}>
            <FormLabel>Partner Name: {catogeryID}</FormLabel>
            <Container>
              <Row>
                <Col xs={12} md={6} className="d-flex align-items-center">
                  Key
                  <BsInfoCircle data-tip="Select key on which to define the rule" />
                  <span className="mandate-field text-label">*</span>
                </Col>
                <Col xs={12} md={6} className="mb-1 ">
                  <Select
                    classNamePrefix="select"
                    className={`form-control-cust shadow-none ${
                      touched && errors && "is-invalid"
                    }`}
                    options={commoncategoryDropDown}
                    placeholder="key"
                    name="application_key"
                    ref={selectRef1}
                    defaultValue={commoncategoryDropDown.find(
                      ({ value }) => value === modaldata?.application_key
                    )}
                    onChange={(option) => {
                      if (option) {
                        setFieldValue("application_key", option.value);
                        setSelectedField(true);
                        setHelpData(option.help_Data);
                        setTypeOfThreshold(option.type);
                      } else {
                        setFieldValue("application_key", "");
                      }
                    }}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    component="div"
                    name="application_key"
                    className="invalid-feedback"
                  />
                </Col>
                <Col xs={12} md={6} className="d-flex align-items-center">
                  Rule Level
                  <BsInfoCircle data-tip="Select key on which to define the rule" />
                  <span className="mandate-field text-label">*</span>
                </Col>
                <Col xs={12} md={6} className="mb-1">
                  <Select
                    classNamePrefix="select"
                    className={`form-control-cust shadow-none ${
                      touched && errors && "is-invalid"
                    }`}
                    options={options2}
                    placeholder="level"
                    name="rule_level"
                    defaultValue={{
                      value: modaldata.rule_level,
                      label: modaldata.rule_level,
                    }}
                    ref={selectRef2}
                    onChange={(option) => {
                      if (option) {
                        setFieldValue("rule_level", option.value);
                      } else {
                        setFieldValue("rule_level", "");
                      }
                    }}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    component="div"
                    name="rule_level"
                    className="invalid-feedback"
                  />
                </Col>
                <Col xs={12} md={6} className="d-flex align-items-center">
                  Type
                  <span className="mandate-field text-label">*</span>
                </Col>
                <Col xs={12} md={6} className="mb-1">
                  <Input
                    type="text"
                    disabled
                    name="rule_type"
                    style={{ cursor: "not-allowed" }}
                    value={typeOfThreshold}
                  />
                </Col>
                {selectedField ? (
                  <>
                    <Col sx={12} md={12}>
                      <Alert color="primary">
                        <div className="alert-body fw-normal">{helpData}</div>
                      </Alert>
                    </Col>
                    <Col xs={6} md={6}>
                      Minimum Value
                      <span className="mandate-field text-label">*</span>
                      <TextField
                        name="rule_min"
                        type="number"
                        id="rule_min"
                        placeholder="Minimum Value"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.rule_min || ""}
                      />
                      <ErrorMessage
                        component="div"
                        name="rule_min"
                        className="invalid-feedback"
                      />
                    </Col>

                    <Col xs={6} md={6}>
                      Maximum Value
                      <span className="mandate-field text-label">*</span>
                      <TextField
                        name="rule_max"
                        id="rule_max"
                        type="number"
                        placeholder="Maximum Value"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.rule_max || ""}
                      />
                      <ErrorMessage
                        component="div"
                        name="rule_max"
                        className="invalid-feedback"
                      />
                    </Col>
                  </>
                ) : (
                  ""
                )}

                <Col xs={12} md={6} className="mt-2">
                  Description
                  <BsInfoCircle data-tip="This text will be used to show reason the sanction failed" />
                  <span className="mandate-field text-label">*</span>
                </Col>
                <Col xs={12} md={6} className="mt-2">
                  <TextAreaField
                    name="description"
                    placeholder="Enter Status Message"
                    maxLength={50}
                    onChange={(option) => {
                      if (option) {
                        setFieldValue(
                          "description",
                          option.currentTarget.value
                        );
                      } else {
                        setFieldValue("description", "");
                      }
                    }}
                    onBlur={handleBlur}
                  />
                </Col>
              </Row>
              <div className="d-flex justify-content-end mt-1">
                <button
                  className=" btn btn-primary "
                  color="none"
                  type="submit"
                >
                  {buttonNameAction}
                </button>
              </div>
            </Container>
            <ReactTooltip />
          </form>
        );
      }}
    </Formik>
  );
};
