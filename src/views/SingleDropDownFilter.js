import React, { useRef, useState } from "react";
import { Row, Col, Button } from "reactstrap";
import Select from "react-select";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";

const SingleDropDownFilter = ({
  handlerSubmitFilterFormDate,
  dropDownData,
}) => {
  const selectRef = useRef();
  const [tableLabel, setTableLabel] = useState();
  const validate = Yup.object({
    lead_type: Yup.string().required("This field is required"),
  });

  return (
    <Formik
      initialValues={{
        lead_type: "",
      }}
      validationSchema={validate}
      onSubmit={(values, { resetForm }) => {
        handlerSubmitFilterFormDate(values.lead_type, tableLabel);
        selectRef.current.select.clearValue();
        resetForm();
      }}
    >
      {(formik) => {
        const { handleBlur, setFieldValue } = formik;

        return (
          <Form>
            <Row>
              <Col className="mb-1" md="8" sm="12">
                <Select
                  className="react-select"
                  ref={selectRef}
                  classNamePrefix="select"
                  name="lead_type"
                  options={dropDownData}
                  isClearable={true}
                  placeholder="Search By Lead Category"
                  onChange={(option) => {
                    if (option) {
                      setFieldValue("lead_type", option.value);
                      setTableLabel(option.label);
                    } else {
                      setFieldValue("lead_type", "");
                    }
                  }}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  component="div"
                  name="lead_type"
                  style={{ color: "red", fontSize: ".8rem" }}
                />
              </Col>

              <Col className="d-flex justify-content-end pb-1">
                <Button color="primary" type="submit">
                  Find Leads
                </Button>
              </Col>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SingleDropDownFilter;
