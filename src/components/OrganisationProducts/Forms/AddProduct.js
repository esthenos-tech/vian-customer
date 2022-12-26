import React from "react";
import { Card, Row, Col } from "reactstrap";
import { TextField } from "../Components/TextField";
import { SelectDropDown } from "../Components/SelectDropDown";
import * as Yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";
import { NavLink } from "react-router-dom";
import ProductDatePicker from "../Components/ProductDatePicker";

const freqDat = [
  {
    value: "monthly",
    label: "Monthly",
  },
  {
    value: "fortnightly",
    label: "Fortnightly",
  },
  {
    value: "weekly",
    label: "Weekly",
  },
];

const AddProduct = ({
  handlerSubmitProductCreation,
  productsDetails,
  updateDatamanipulation,
  handleClearFormData,
}) => {
  console.log("'===== add product details =====", productsDetails);
  const validate = Yup.object().shape({
    product_category: Yup.string().required("This field is required"),
    name: Yup.string()
      .min(3, "Enter more then three characters")
      .required("This field is required"),
    code: Yup.string()
      .min(3, "Enter more then three characters")
      .required("This field is required"),
    frequency: Yup.string().required("This field is required"),

    min_amount: Yup.number()
      .min(20000, "Please enter a value greater than or equal to 20000.")
      .required("This field is required")
      .test(
        "superior",
        "Min Amount should be lesser or equal to Max Amount",
        function (f) {
          const ref = Yup.ref("max_amount");
          return f <= this.resolve(ref);
        }
      ),
    max_amount: Yup.number()
      .required("This field is required")
      .test("superior", "max must be greater than min", function (f) {
        const ref = Yup.ref("min_amount");
        return f >= this.resolve(ref);
      }),

    min_interest_rate: Yup.number()
      .required("This field is required")
      .test(
        "superior",
        "Min Amount should be lesser or equal to Max Amount",
        function (f) {
          const ref = Yup.ref("max_interest_rate");
          return f <= this.resolve(ref);
        }
      ),
    max_interest_rate: Yup.number()
      .required("This field is required")
      .test("superior", "max must be greater than min", function (f) {
        const ref = Yup.ref("min_interest_rate");
        return f >= this.resolve(ref);
      }),

    min_installment: Yup.number()
      .required("This field is required")
      .test(
        "superior",
        "Min Amount should be lesser or equal to Max Amount",
        function (f) {
          const ref = Yup.ref("max_installment");
          return f <= this.resolve(ref);
        }
      ),
    max_installment: Yup.number()
      .required("This field is required")
      .test("superior", "max must be greater than min", function (f) {
        const ref = Yup.ref("min_installment");
        return f >= this.resolve(ref);
      }),

    min_tenure: Yup.number()
      .required("This field is required")
      .test(
        "superior",
        "Min Amount should be lesser or equal to Max Amount",
        function (f) {
          const ref = Yup.ref("max_tenure");
          return f <= this.resolve(ref);
        }
      ),
    max_tenure: Yup.number().test(
      "superior",
      "max must be greater than min",
      function (f) {
        const ref = Yup.ref("min_tenure");
        return f >= this.resolve(ref);
      }
    ),

    activation_date: Yup.string().required("Please select the activation date"),
    deactivation_date: Yup.string().required("Please select the end date"),
  });

  return (
    <Formik
      initialValues={{
        product_category: productsDetails?.PRODUCTS_CATEGORY,
        name: productsDetails?.name || "",
        code: productsDetails?.code,
        frequency: productsDetails?.frequency || "",
        min_amount: productsDetails?.min_amount,
        max_amount: productsDetails?.max_amount,
        min_interest_rate: productsDetails?.min_interest_rate || "",
        max_interest_rate: productsDetails?.max_interest_rate,
        min_installment: productsDetails?.min_installmentment,
        max_installment: productsDetails?.max_installmentment,
        min_tenure: productsDetails?.min_tenure,
        max_tenure: productsDetails?.max_tenure,
        activation_date: productsDetails?.activation_date,
        deactivation_date: productsDetails?.deactivation_date,
      }}
      enableReinitialize={productsDetails ? true : false}
      validationSchema={validate}
      onSubmit={(productFormData, { resetForm }) => {
        handlerSubmitProductCreation(productFormData);
        resetForm();
      }}
      onReset={(productFormData) => {
        handleClearFormData();
        // onResetAction();
        // resetForm()
        // selectRef1.current.select.clearValue();
        // selectRef2.current.select.clearValue();
      }}
    >
      {(formik) => {
        const {
          values,
          touched,
          errors,
          onResetAction,
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
                <Col md="3" sm="12" className="mb-1">
                  <SelectDropDown
                    label="Product Category"
                    name="product_category"
                    options={updateDatamanipulation}
                    placeholder="Product Category"
                    onChange={(option) => {
                      if (option) {
                        setFieldValue("product_category", option.value);
                      } else {
                        setFieldValue("product_category", "");
                      }
                    }}
                  />
                </Col>
                <Col md="3" sm="12" className="mb-1">
                  <TextField
                    name="name"
                    id="name"
                    label="Product Name"
                    placeholder="Product Name"
                    type="text"
                    value={values.name || ""}
                  />
                </Col>
                <Col md="3" sm="12" className="mb-1">
                  <TextField
                    name="code"
                    id="code"
                    label="Product Code"
                    placeholder="Product Code"
                    type="text"
                    value={values.code || ""}
                  />
                </Col>
                <Col md="3" sm="12" className="mb-1">
                  <SelectDropDown
                    label="frequency"
                    name="frequency"
                    options={freqDat}
                    placeholder="frequency"
                    onChange={(option) => {
                      if (option) {
                        setFieldValue("frequency", option.value);
                      } else {
                        setFieldValue("frequency", "");
                      }
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="3" sm="12" className="mb-1">
                  <TextField
                    name="min_amount"
                    id="min_amount"
                    label="Minimum Amount"
                    placeholder="Minimum Amount"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.min_amount || ""}
                  />
                </Col>
                <Col md="3" sm="12" className="mb-1">
                  <TextField
                    name="max_amount"
                    id="max_amount"
                    label="Max Amount"
                    placeholder="Max Amount"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.max_amount || ""}
                  />
                </Col>
                <Col md="3" sm="12" className="mb-1">
                  <TextField
                    name="min_interest_rate"
                    id="min_interest_rate"
                    label="Min Interest Rate"
                    placeholder="Min Interest Rate"
                    type="number"
                    value={values.min_interest_rate || ""}
                  />
                </Col>
                <Col md="3" sm="12" className="mb-1">
                  <TextField
                    name="max_interest_rate"
                    id="max_interest_rate"
                    label="Max Interest Rate"
                    placeholder="Max Interest Rate"
                    type="number"
                    value={values.max_interest_rate || ""}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="3" sm="12" className="mb-1">
                  <TextField
                    name="min_installment"
                    id="min_installment"
                    label="Min Number Of Installment"
                    placeholder="Min Number Of Installment"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.min_installment || ""}
                  />
                </Col>
                <Col md="3" sm="12" className="mb-1">
                  <TextField
                    name="max_installment"
                    id="max_installment"
                    label="Max Number Of Installment"
                    placeholder="Max Number Of Installment"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.max_installment || ""}
                  />
                </Col>
                <Col md="3" sm="12" className="mb-1">
                  <TextField
                    name="min_tenure"
                    id="min_tenure"
                    label="Min Tenure"
                    placeholder="Min Tenure"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.min_tenure || ""}
                  />
                </Col>
                <Col md="3" sm="12" className="mb-1">
                  <TextField
                    name="max_tenure"
                    id="max_tenure"
                    label="Max Tenure"
                    placeholder="Max Tenure"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.max_tenure || ""}
                  />
                </Col>
                <Col md="3" sm="12" className="mb-1 ">
                  <ProductDatePicker
                    name="activation_date"
                    label="Activation Date"
                    value={values.activation_date}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Activation Date"
                    autoComplete="off"
                    customClassName={
                      errors.activation_date &&
                      touched.activation_date &&
                      "border-red"
                    }
                  />
                  <ErrorMessage
                    name="activation_date"
                    component="div"
                    style={{
                      color: "red",
                      fontSize: ".8rem",
                    }}
                  />
                </Col>
                <Col md="3" sm="12" className="mb-1 ">
                  <ProductDatePicker
                    name="deactivation_date"
                    dateFormat="yyyy-MM-dd"
                    placeholderText="De-Activation Date"
                    autoComplete="off"
                    minDate={values.activation_date}
                    label="De-Activation Date"
                    // maxDate={addDays(new Date(values.activation_date), 30)}
                    customClassName={
                      errors.deactivation_date &&
                      touched.deactivation_date &&
                      "border-red"
                    }
                    isDisabled={values.activation_date ? false : true}
                  />
                  <ErrorMessage
                    name="deactivation_date"
                    component="div"
                    style={{
                      color: "red",
                      fontSize: ".8rem",
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12" sm="12" className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary mr-2">
                    Save
                  </button>
                  <button
                    onClick={onResetAction()}
                    className="btn btn-warning mr-2"
                  >
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
export default AddProduct;
