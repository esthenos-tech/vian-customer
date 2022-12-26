import React, { useRef } from "react";
import { Card, Row, Col } from "reactstrap";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { TextField } from "../Components/TextField";
import SelectDropDown from "../Components/SelectDropDown";

const DD = [
  {
    label: "HIGHMARK",
    value: "HIGHMARK",
  },
  {
    label: "EXPERIAN",
    value: "EXPERIAN",
  },
  {
    label: "CIBIL",
    value: "CIBIL",
  },
];
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
const AddProductCategory = ({ handlerSubmitProductCategory }) => {
  const selectRef = useRef();
  const validate = Yup.object().shape({
    name: Yup.string().min(3, "Enter more then two characters"),
    // .max(50, "Enter more then two characters")
    // .required("This field is required"),
    code: Yup.string().min(3, "Enter more then two characters"),
    bureau_type: Yup.string().required("This field is required"),
  });
  return (
    <Formik
      initialValues={{
        name: "",
        code: "",
        bureau_type: "",
      }}
      validationSchema={validate}
      onSubmit={(categoryFormData, { resetForm }) => {
        handlerSubmitProductCategory(categoryFormData);
        console.log(categoryFormData);
        selectRef.current.select.clearValue();
        resetForm();
      }}
      onReset={(categoryFormData) => {
        selectRef.current.select.clearValue();
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
          <Form>
            <Card className="mb-0">
              <Row>
                <Col md="4" sm="12">
                  <TextField
                    name="name"
                    id="name"
                    label="Category Name"
                    placeholder="Category Name"
                    maxLength={50}
                    minLength={2}
                    validate={validateStatus}
                    type="text"
                  />
                </Col>
                <Col md="4" sm="12">
                  <TextField
                    name="code"
                    id="code"
                    label="Category Code"
                    placeholder="Category Code"
                    validate={validateStatusCode}
                    maxLength={25}
                    minLength={2}
                    type="text"
                  />
                </Col>
                <Col md="4" sm="12">
                  <SelectDropDown
                    ref={selectRef}
                    classNamePrefix="select"
                    label="Bureau Name"
                    name="bureau_type"
                    id="bureau_type"
                    options={DD}
                    placeholder="Bureau Name"
                    onChange={(option) => {
                      if (option) {
                        setFieldValue("bureau_type", option.value);
                      } else {
                        setFieldValue("bureau_type", "");
                      }
                    }}
                    onBlur={handleBlur}
                  />
                </Col>
                <Col
                  md="12"
                  sm="12"
                  className="d-flex justify-content-end mt-1"
                >
                  <button type="submit" className="btn btn-primary mr-1 ">
                    Save
                  </button>
                  <button type="reset" className="btn btn-secondary mr-1">
                    Clear
                  </button>
                </Col>
              </Row>
            </Card>
          </Form>
        );
      }}
    </Formik>
  );
};
export default AddProductCategory;
