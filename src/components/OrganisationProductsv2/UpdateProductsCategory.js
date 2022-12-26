import React, { useState, useEffect } from "react";
import { Card, Row, Col, CardTitle } from "reactstrap";
import { TextField } from "./Components/TextField";
import * as Yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";
import ProductDatePicker from "./Components/ProductDatePicker";
import { NavLink, withRouter } from "react-router-dom";
import {
  getAllProductsCategoryDetails,
  getProductsPerticularDetails,
  updateProductsPerticularDetails,
} from "../../components/dataLayer/OrganisationProducts/index";
import "../../views/Organisation/OrganisationProducts.scss";
import { toast } from "react-toastify";
import moment from "moment";

import Cookies from "universal-cookie";
import SelectDropDownAf from "./Components/SelectDropDownAf";
const cookies = new Cookies();

const freqDat = [
  {
    value: "Monthly",
    label: "Monthly",
  },
  {
    value: "Fortnightly",
    label: "Fortnightly",
  },
  {
    value: "Weekly",
    label: "Weekly",
  },
];

const UpdateProductsCategory = (props) => {
  const initialProductsCreationState = {
    loading: true,
    data: [],
    dataset: [],
  };
  const [{ loading, data, dataset }, setProductsCreation] = useState(
    initialProductsCreationState
  );

  const [perticularProduct, setPerticularProductDetail] = useState({});
  const getPerticularProducts = async () => {
    try {
      const response = await getProductsPerticularDetails(props.match.params.id)
        .then((response) => {
          if (response && response.data)
            setPerticularProductDetail(response?.data);
        })

        .catch((error) => {
          if (
            error &&
            error?.response &&
            error?.response?.data &&
            error?.response?.data?.message
          ) {
            toast.error(error?.response?.data?.message);
          }
          cookies.remove("user");
          return error;
        });
    } catch (error) {
      console.log(error);

      if (error && error.message) {
        toast.error(error.message);
      }

      return toast.error("Something went wrong...", error);
    }
  };
  const [rdata, setData] = useState({});

  // const [ perSendData ,setPerSendData ] = useState("")
  const handleSubmitProductCreation = async (perSendData) => {
    const payload = {
      ...perSendData,
      activation_date: moment(perSendData.activation_date).format("YYYY-MM-DD"),
      deactivation_date: moment(perSendData.deactivation_date).format(
        "YYYY-MM-DD"
      ),
    };
    setData(payload);

    updateProduct(payload);
  };

  const updateProduct = async (payload) => {
    try {
      const response = await updateProductsPerticularDetails(
        props.match.params.id,
        payload
      );
    } catch (error) {
      if (error && error.message) {
        toast.error(error.message);
      }
    }
  };

  const getOrganisationProductsCategoryDetails = async () => {
    const response = await getAllProductsCategoryDetails();
    if (response && response.data)
      setProductsCreation((prevState) => ({
        ...prevState,
        loading: false,
        dataset: response?.data?.results,
      }));
  };
  const updateDatamanipulation = dataset.map((item) => {
    return { value: `${item.code}`, label: `${item.name}` };
  });
  const selectedData = updateDatamanipulation.findIndex(
    (o) => o.value === perticularProduct?.product_category
  );
  const selectMonth = freqDat.findIndex(
    (o) => o.value === perticularProduct?.frequency
  );

  useEffect(() => {
    getPerticularProducts();
    getOrganisationProductsCategoryDetails();
  }, []);

  const validate = Yup.object().shape({
    product_category: Yup.string().required("This field is required"),
    name: Yup.string()
      .min(3, "Enter more than three characters")
      .required("This field is required"),
    code: Yup.string()
      .min(3, "Enter more than three characters")
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
      .test(
        "superior",
        "Max Amount should be greater than Min Amount",
        function (f) {
          const ref = Yup.ref("min_amount");
          return f >= this.resolve(ref);
        }
      ),

    min_interest_rate: Yup.number()
      .required("This field is required")
      .test(
        "superior",
        "Min Interest should be lesser or equal to Max Interest",
        function (f) {
          const ref = Yup.ref("max_interest_rate");
          return f <= this.resolve(ref);
        }
      ),
    max_interest_rate: Yup.number()
      .required("This field is required")
      .test(
        "superior",
        "Max Interest should be greater than Min Interest",
        function (f) {
          const ref = Yup.ref("min_interest_rate");
          return f >= this.resolve(ref);
        }
      ),

    min_installment: Yup.number()
      .required("This field is required")
      .test(
        "superior",
        "Min Installment should be lesser or Equal to Max Installment",
        function (f) {
          const ref = Yup.ref("max_installment");
          return f <= this.resolve(ref);
        }
      ),
    max_installment: Yup.number()
      .required("This field is required")
      .test(
        "superior",
        "Max Installment should be greater than Min Installment",
        function (f) {
          const ref = Yup.ref("min_installment");
          return f >= this.resolve(ref);
        }
      ),

    min_tenure: Yup.number()
      .required("This field is required")
      .test(
        "superior",
        "Min Tenure should be lesser or equal to Max Tenure",
        function (f) {
          const ref = Yup.ref("max_tenure");
          return f <= this.resolve(ref);
        }
      ),
    max_tenure: Yup.number()
      .required("This field is required")
      .test(
        "superior",
        "Max Tenure should be greater than Min Tenure",
        function (f) {
          const ref = Yup.ref("min_tenure");
          return f >= this.resolve(ref);
        }
      ),

    activation_date: Yup.string().required("Please select the activation date"),
    deactivation_date: Yup.string().required(
      "Please select the deactivation date"
    ),
  });

  return (
    <Formik
      initialValues={{
        product_category: perticularProduct?.product_category,
        name: perticularProduct?.name,
        code: perticularProduct?.code,
        frequency: perticularProduct?.frequency,
        min_amount: perticularProduct?.min_amount,
        max_amount: perticularProduct?.max_amount,
        min_interest_rate: perticularProduct?.min_interest_rate,
        max_interest_rate: perticularProduct?.max_interest_rate,
        min_installment: perticularProduct?.min_installment,
        max_installment: perticularProduct?.max_installment,
        min_tenure: perticularProduct?.min_tenure,
        max_tenure: perticularProduct?.max_tenure,
        activation_date: perticularProduct?.activation_date,
        deactivation_date: perticularProduct?.deactivation_date,
      }}
      enableReinitialize={perticularProduct ? true : false}
      validationSchema={validate}
      onSubmit={(updateProductData) => {
        // setPerSendData(...updateProductData)
        handleSubmitProductCreation(updateProductData);
        // updateProduct({
        //   perSendData,
        // });
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
            <Card className="p-3">
              <CardTitle>Update product: {perticularProduct.name}</CardTitle>
              <hr />
              <Row>
                <Col md="3" sm="12" className="mb-1">
                  <SelectDropDownAf
                    label="Product Category"
                    name="product_category"
                    options={updateDatamanipulation}
                    // placeholder="Product Category"
                  />
                </Col>
                <Col md="3" sm="12" className="mb-1">
                  <TextField
                    name="name"
                    id="name"
                    label="Product Name"
                    placeholder="Product Name"
                    type="text"
                    maxLength="50"
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
                  <SelectDropDownAf
                    label="Frequency"
                    name="frequency"
                    options={freqDat}
                    // placeholder="frequency"
                  />
                </Col>
              </Row>
              <Row>
                <Col md="3" sm="12" className="mb-1">
                  <TextField
                    name="min_amount"
                    id="min_amount"
                    label="Min Amount"
                    placeholder="Min Amount"
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
                    label="Min Installment"
                    placeholder="Min Installment"
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
                    label="Max Installment"
                    placeholder="Max Installment"
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
                <Col
                  md="12"
                  sm="12"
                  className="d-flex justify-content-end mb-1"
                >
                  <button type="submit" className="btn btn-primary mr-2">
                    Save
                  </button>

                  <NavLink to="/organisation/products">
                    <button
                      color="danger"
                      type="reset"
                      className="mr-1 btn btn-danger"
                    >
                      Back
                    </button>
                  </NavLink>
                </Col>
              </Row>
              <hr />
            </Card>
          </Form>
        );
      }}
    </Formik>
  );
};
export default withRouter(UpdateProductsCategory);
