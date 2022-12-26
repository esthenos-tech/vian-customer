import React, { useEffect, useRef, useState } from "react";
import { Card, Button } from "reactstrap";
// ** Reactstrap Imports
import { CardBody, Row, Col } from "reactstrap";
import Select from "react-select";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { getAllProductsCategoryDetails } from "../components/dataLayer/OrganisationProducts";
import { TextField } from "../components/CommonComponents/TextField";
import { getteStatusDropdown } from "../components/dataLayer/ApplicationLayer";
// import { selectThemeColors } from '@utils'

const CustomFilterForApplication = ({ handlerSubmitFilterDate }) => {
  const selectRef = useRef();
  const selectRef1 = useRef();

  const validate = Yup.object({
    application_id: Yup.string(),
    applicant_name: Yup.string(),
    status: Yup.string(),
    loan_category: Yup.string(),
  });

  const initialstatusCreation = {
    loading: true,
    category: [],
    status: [],
  };
  const [{ loading, category, status }, setStateCreation] = useState(
    initialstatusCreation
  );

  const getAllCategoryValues = async () => {
    const response = await getAllProductsCategoryDetails();
    if (response && response.data)
      setStateCreation((prevState) => ({
        ...prevState,
        loading: false,
        category: response?.data?.results.map((item) => {
          return { value: item.code, label: item.name };
        }),
      }));
  };

  const getOrganisationstatusDetails = async () => {
    const response = await getteStatusDropdown();
    if (response && response.results)
      setStateCreation((prevState) => ({
        ...prevState,
        loading: false,
        status: response?.results.map((item) => {
          return { value: item.status_code, label: item.status };
        }),
      }));
  };

  useEffect(() => {
    getAllCategoryValues();
    getOrganisationstatusDetails();
  }, []);

  return (
    <Formik
      initialValues={{
        application_id: "",
        applicant_name: "",
        status: "",
        loan_category: "",
      }}
      validationSchema={validate}
      onSubmit={(values, { resetForm }) => {
        handlerSubmitFilterDate(values);
        selectRef.current.select.clearValue();
        selectRef1.current.select.clearValue();
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
          <Form>
            <Card>
              <CardBody>
                <Row>
                  <Col className="mb-1" md="6" sm="12">
                    <TextField
                      type="text"
                      id="application_id"
                      name="application_id"
                      placeholder="Search By Application ID"
                    />
                  </Col>
                  <Col className="mb-1" md="6" sm="12">
                    <TextField
                      type="text"
                      id="applicant_name"
                      name="applicant_name"
                      placeholder="Search By Application Name"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className="mb-1" md="6" sm="12">
                    <Select
                      className="react-select"
                      ref={selectRef}
                      classNamePrefix="select"
                      name="loan_category"
                      options={category}
                      isClearable={true}
                      placeholder="Search By Loan Category"
                      onChange={(option) => {
                        if (option) {
                          setFieldValue("loan_category", option.value);
                        } else {
                          setFieldValue("loan_category", "");
                        }
                      }}
                      onBlur={handleBlur}
                    />
                  </Col>
                  <Col className="mb-1" md="6" sm="12">
                    <Select
                      className="react-select"
                      ref={selectRef1}
                      classNamePrefix="select"
                      name="status"
                      options={status}
                      isClearable={true}
                      placeholder="Select Status"
                      onChange={(option) => {
                        if (option) {
                          setFieldValue("status", option.value);
                        } else {
                          setFieldValue("status", "");
                        }
                      }}
                      onBlur={handleBlur}
                    />
                  </Col>

                  <Col className="d-flex justify-content-end">
                    <Button color="primary" type="submit">
                      Find Applications
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CustomFilterForApplication;
