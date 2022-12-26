import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Label,
} from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "../component/TextField";
import { NumberField } from "../component/NumberField";
import { DatePickerSelect } from "../component/DatePicker";
import CustError from "../component/CustError";
import { CheckBox } from "../component/CheckBox";
import SelectDropDown from "../component/SelectDropDown";
import SelectReactDropDown from "../component/SelectReactDropDown";
// import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
import {
  // dropdownManipulation,
  stateOptions,
  countryOptions,
} from "../EmployeeData";
import "flatpickr/dist/themes/light.css";
import "../../../views/Organisation/OrganisationEmployee.scss";
import { NavLink, withRouter } from "react-router-dom";
import moment from "moment";
import {
  getParticularEmployeeDetails,
  updateParticularEmployeeDetails,
  getEmployeeDetails,
} from "../../dataLayer/EmployeeLayer";
import UpdateEmployeeTableDetails from "./UpdateEmployeeTableDetails";
import UpdateEmployeeAccessCard from "./UpdateEmployeeAccessCard"; // handleSendAction,
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { getAllProductsDetails } from "../../dataLayer/OrganisationProducts";
const cookies = new Cookies();

const UpdateEmployees = (props) => {
  const [particularEmployeeDetails, setParticularEmployeeDetails] = useState(
    {}
  );
  const [checkedValues, setCheckedValues] = useState();
  const [propsID, setPropsID] = useState(props.match.params.id);
  const [paetnerShow, setPaetnerShow] = useState();

  const updateEmployeeHirarchyPartnerInitialState = {
    loadingH: true,
    hirarchyList: [],
  };
  const updateEmployeeProductsDetailsInitialState = {
    loadingP: true,
    ProductsDetails: [],
  };

  const [
    { loadingH, hirarchyList },
    setUpdateEmployeeHirarchyPartner,
  ] = useState(updateEmployeeHirarchyPartnerInitialState);

  const [
    { loadingP, ProductsDetails },
    setUpdateEmployeeProductsDetails,
  ] = useState(updateEmployeeProductsDetailsInitialState);

  const getParticularEmployeeDetail = async () => {
    const response = await getParticularEmployeeDetails(propsID);
    if (response && response.data) {
      setParticularEmployeeDetails(response.data);
    }
  };

  const updateDropDownList = async () => {
    const response = await getEmployeeDetails();
    if (response?.data) {
      setUpdateEmployeeHirarchyPartner((prevState) => ({
        ...prevState,
        loadingH: false,
        hirarchyList: response.data.hierarchy,
      }));
    }
  };

  const getOrganisationProductsDetails = async () => {
    try {
      const response = await getAllProductsDetails()
        .then((response) => {
          if (response && response.data)
            setUpdateEmployeeProductsDetails((prevState) => ({
              ...prevState,
              loadingP: false,
              ProductsDetails: response?.data?.results,
            }));
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

  const updateEmployee = async (payload) => {
    const response = await updateParticularEmployeeDetails(propsID, payload);
  };

  const submitData = (values) => {
    console.log(values);
  };
  const hierchy_data = hirarchyList.map((list) => {
    return {
      label: `(${list.title.toUpperCase()}) ${list.title_full.toUpperCase()}`,
      value: list.id,
      title: list.title,
    };
  });
  const findHierarchyIndex = hierchy_data.findIndex(
    (item) => item.value === particularEmployeeDetails?.hierarchy
  );

  const products_data = ProductsDetails.map((list) => {
    return {
      label: `(${list.name.toUpperCase()}) ${list.name.toUpperCase()}`,
      value: list.code,
    };
  });

  const validate = Yup.object({
    first_name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .matches(/^[a-zA-Z]+$/g, "Only alphabets are allowed")
      .required("This field is required*"),
    last_name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .matches(/^[a-zA-Z]+$/g, "Only alphabets are allowed")
      .required("This field is required*"),
    email: Yup.string(),
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
    products: Yup.object().nullable(),
  });

  useEffect(() => {
    getParticularEmployeeDetail();
    getOrganisationProductsDetails();
  }, [props.match.params.id]);

  useEffect(() => {
    updateDropDownList();
  }, []);

  return (
    <Formik
      initialValues={{
        first_name: particularEmployeeDetails?.first_name,
        last_name: particularEmployeeDetails?.last_name,
        email: particularEmployeeDetails?.email,
        hierarchy: particularEmployeeDetails?.hierarchy,
        postal_country: particularEmployeeDetails?.postal_country,
        date_of_birth: particularEmployeeDetails?.date_of_birth,
        gender: particularEmployeeDetails?.gender,
        notify_email: particularEmployeeDetails?.notify_email,
        active: particularEmployeeDetails?.active,
        postal_address: particularEmployeeDetails?.postal_address,
        postal_state: particularEmployeeDetails?.postal_state,
        postal_city: particularEmployeeDetails?.postal_city,
        postal_code: particularEmployeeDetails?.postal_code,
        postal_tele_code: particularEmployeeDetails?.postal_tele_code,
        postal_telephone: particularEmployeeDetails?.postal_telephone,
        products: particularEmployeeDetails?.products,
      }}
      enableReinitialize={particularEmployeeDetails ? true : false}
      validationSchema={validate}
      onSubmit={(updateEmployeeData) => {
        submitData();
        updateEmployee({
          ...updateEmployeeData,
          checkedValues,
          date_of_birth: moment(updateEmployeeData.date_of_birth).format(
            "YYYY-MM-DD"
          ),
        });
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
                      <div className="card-title">Edit Employee</div>
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
                            <CardBody>
                              <Row>
                                <Col md="6" sm="12">
                                  <TextField
                                    name="first_name"
                                    isMand={true}
                                    label="First name"
                                    placeholder="First Name"
                                    type="text"
                                  />
                                </Col>
                                <Col md="6" sm="12">
                                  <TextField
                                    name="last_name"
                                    isMand={true}
                                    label="Last name"
                                    placeholder="Last Name"
                                    type="text"
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col md="12" sm="12">
                                  <TextField
                                    name="email"
                                    isMand={false}
                                    label="Email"
                                    placeholder="user-name@northernarc-dev.esthenos.com"
                                    type="email"
                                    disabled
                                  />
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
                              <Row>
                                <Col md="6" sm="12">
                                  {/* <Label for="Notify email">Notify email</Label> */}
                                  <TextField
                                    name="notify_email"
                                    label="Notify email"
                                    placeholder="user-name@vian-dev.esthenos.com"
                                    type="email"
                                  />
                                </Col>
                                <Col md="6" sm="12">
                                  <CheckBox
                                    type="checkbox"
                                    label="Active"
                                    name="active"
                                  />
                                </Col>
                              </Row>

                              <Row>
                                <Col md="12" sm="12">
                                  <SelectReactDropDown
                                    label="Hierarchy"
                                    name="hierarchy"
                                    id="hierarchy"
                                    defaultValue={
                                      hierchy_data[findHierarchyIndex]
                                    }
                                    options={hierchy_data}
                                    placeholder="Hierarchy"
                                    isLoading={loadingH}
                                    onChange={(option) => {
                                      if (option) {
                                        setFieldValue(
                                          "hierarchy",
                                          option.value
                                        );
                                        setPaetnerShow(option.title);
                                      } else {
                                        setFieldValue("hierarchy", "");
                                      }
                                    }}
                                  />
                                  {/* <SelectDropDown
                                  label="Hierarchy"
                                  typeImportent={true}
                                  name="hierarchy"
                                  value={particularEmployeeDetails?.hierarchy}
                                  options={dropdownManipulation(
                                    hirarchyList,
                                    "hierarchy"
                                  )}
                                /> */}
                                </Col>
                              </Row>
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
                                    isMand={true}
                                    name="postal_address"
                                    label="Address"
                                    placeholder="Address"
                                    type="text"
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
                                    isMand={true}
                                    name="postal_city"
                                    placeholder="City"
                                    label="City"
                                    type="text"
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
                              <Row>
                                <Col md="12" sm="12">
                                  {/* <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    // defaultValue={[colourOptions[4], colourOptions[5]]}
                                    isMulti
                                    options={dropdownManipulation(
                                      partnerCodelist,
                                      "products"
                                    )}
                                  />*/}
                                  {/* {paetnerShow === "rm" ||
                                  paetnerShow === "cm" ? ( */}
                                  <SelectReactDropDown
                                    label="Product Assignment"
                                    typeImportent={false}
                                    isMulti
                                    isLoading={loadingP}
                                    placeholder="Product Assignment"
                                    name="products"
                                    options={products_data}
                                    onChange={(option) => {
                                      if (option) {
                                        setFieldValue(
                                          "products",
                                          option.map(function (obj) {
                                            return obj.value;
                                          })
                                        );
                                      } else {
                                        setFieldValue("products", "");
                                      }
                                    }}
                                  />
                                  {/* ) : (
                                    <></>
                                  )} */}
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                        </div>
                        <div className="col-12">
                          <UpdateEmployeeTableDetails propsID={propsID} />
                        </div>
                        <div className="col-12">
                          <UpdateEmployeeAccessCard submitData={submitData} />
                        </div>
                        <div className="d-flex justify-content-end w-100">
                          <Row>
                            <Col md="6" sm="12">
                              <button
                                color="primary"
                                type="submit"
                                className="mr-1 mb-1 btn btn-primary"
                              >
                                Update Employee
                              </button>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6" sm="12">
                              <NavLink to="/organisation/employee">
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
};

export default withRouter(UpdateEmployees);
