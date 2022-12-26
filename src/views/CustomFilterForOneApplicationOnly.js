import React from "react";
import { Card, Button } from "reactstrap";
import { CardBody, Row, Col } from "reactstrap";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "../components/CommonComponents/TextField";

const CustomFilterForOneApplicationOnly = ({
  handlerSubmitFilterSingleApplicationData,
  application_Id_Prefield,
}) => {
  const validate = Yup.object({
    application_id: Yup.string(),
  });

  return (
    <Formik
      initialValues={{
        application_id: application_Id_Prefield,
      }}
      validationSchema={validate}
      onSubmit={(values, { resetForm }) => {
        handlerSubmitFilterSingleApplicationData(values);
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
                  <Col className="mb-1" md="4" sm="12">
                    <TextField
                      type="text"
                      name="application_id"
                      placeholder="Search by application ID"
                    />
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <Button color="primary" type="submit">
                      Search Branches
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

export default CustomFilterForOneApplicationOnly;
