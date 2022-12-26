import React, { useEffect, useRef, useState } from "react";
import { Card, CardBody, Row, Col, Spinner, CardHeader } from "reactstrap";
import { TextField } from "./components/TextField";
import SelectDropDown from "./components/SelectDropDown";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import ApplicationDatePicker from "./components/ApplicationDatePicker";
import {
  getApplicationDetails,
  submitUpdateFormData,
} from "../../components/dataLayer/ApplicationLayer";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.scss";
import moment from "moment";

const UpdateApplicationDetails = (props) => {
  const initialValuesForApplication = {
    loading: true,
    data: [],
    applicant_details: [],
  };
  const [{ loading, data, applicant_details }, setState] = useState(
    initialValuesForApplication
  );

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

  const selectRef1 = useRef();
  const selectRef2 = useRef();

  const validate = Yup.object().shape({
    customer_first_name: Yup.string(),
    customer_middle_name: Yup.string(),
    customer_last_name: Yup.string(),
    customer_dob: Yup.string(),
    customer_age: Yup.string(),
    customer_gender: Yup.string(),
    customer_marital_status: Yup.string(),
    customer_aadhar_no: Yup.string(),
    customer_voter_id: Yup.string(),
    customer_driving_license: Yup.string(),
    customer_passport: Yup.string(),
    customer_pan: Yup.string(),
    customer_ration_card: Yup.string(),
    customer_mgnrega_id: Yup.string(),
    customer_mailing_house_no: Yup.string(),
    customer_mailing_house_street: Yup.string(),
    customer_mailing_landmark: Yup.string(),
    customer_mailing_locality: Yup.string(),
    customer_mailing_pincode: Yup.string(),
    customer_mailing_state: Yup.string(),
    customer_mailing_district: Yup.string(),
    customer_mailing_city: Yup.string(),
    customer_mailing_mobile_no: Yup.string(),
    customer_permanent_house_no: Yup.string(),
    customer_permanent_house_street: Yup.string(),
    customer_permanent_landmark: Yup.string(),
    customer_permanent_locality: Yup.string(),
    customer_permanent_pincode: Yup.string(),
    customer_permanent_state: Yup.string(),
    customer_permanent_district: Yup.string(),
    customer_permanent_city: Yup.string(),
    customer_permanent_mobile_no: Yup.string(),

    customer_official_house_no: Yup.string(),
    customer_official_house_street: Yup.string(),
    customer_official_landmark: Yup.string(),
    customer_official_locality: Yup.string(),
    customer_official_pincode: Yup.string(),
    customer_official_state: Yup.string(),
    customer_official_district: Yup.string(),
    customer_official_city: Yup.string(),
    customer_official_mobile_no: Yup.string(),
    // Spouse Details
    spouse_first_name: Yup.string(),
    spouse_middle_name: Yup.string(),
    spouse_last_name: Yup.string(),
    spouse_dob: Yup.string(),
    spouse_age: Yup.string(),
    spouse_gender: Yup.string(),
    spouse_marital_status: Yup.string(),
    spouse_adhar_number: Yup.string(),
    spouse_voter_id: Yup.string(),
    spouse_driving_license: Yup.string(),
    spouse_passport: Yup.string(),
    spouse_pan: Yup.string(),
    spouse_ration_card: Yup.string(),
    spouse_mgnrega_id: Yup.string(),

    //sopouse mailing address
    spouse_mailing_house_no: Yup.string(),
    spouse_mailing_house_street: Yup.string(),
    spouse_mailing_landmark: Yup.string(),
    spouse_mailing_locality: Yup.string(),
    spouse_mailing_pincode: Yup.string(),
    spouse_mailing_state: Yup.string(),
    spouse_mailing_district: Yup.string(),
    spouse_mailing_city: Yup.string(),
    spouse_mailing_mobile_no: Yup.string(),

    //5 Bank Details
    customer_bank_name: Yup.string(),
    customer_bank_account_number: Yup.string(),
    customer_bank_account_holder_name: Yup.string(),
    customer_bank_branch: Yup.string(),
    customer_bank_account_type: Yup.string(),
    customer_bank_ifsc_code: Yup.string(),
    customer_bank_operating_since: Yup.string(),

    // Coborrower Details
    co_borrower_first_name: Yup.string(),
    co_borrower_middle_name: Yup.string(),
    co_borrower_last_name: Yup.string(),
    co_borrower_dob: Yup.string(),
    co_borrower_age: Yup.string(),
    co_borrower_gender: Yup.string(),
    co_borrower_marital_status: Yup.string(),
    co_borrower_aadhar_no: Yup.string(),
    co_borrower_voter_id: Yup.string(),
    co_borrower_driving_licence: Yup.string(),
    co_borrower_passport: Yup.string(),
    co_borrower_pan: Yup.string(),
    co_borrower_ration_card: Yup.string(),
    co_borrower_mgnrega_id: Yup.string(),

    //co borrower mailing address
    co_borrower_mailing_house_no: Yup.string(),
    co_borrower_mailing_house_street: Yup.string(),
    co_borrower_mailing_landmark: Yup.string(),
    co_borrower_mailing_locality: Yup.string(),
    co_borrower_mailing_pincode: Yup.string(),
    co_borrower_mailing_state: Yup.string(),
    co_borrower_mailing_district: Yup.string(),
    co_borrower_mailing_city: Yup.string(),
    co_borrower_mailing_mobile_no: Yup.string(),

    //co_borrower Official Address
    co_borrower_official_house_no: Yup.string(),
    co_borrower_official_house_street: Yup.string(),
    co_borrower_official_landmark: Yup.string(),
    co_borrower_official_locality: Yup.string(),
    co_borrower_official_pincode: Yup.string(),
    co_borrower_official_state: Yup.string(),
    co_borrower_official_district: Yup.string(),
    co_borrower_official_city: Yup.string(),
    co_borrower_official_mobile_no: Yup.string(),
  });

  const getAllApplicationDetails = async () => {
    const response = await getApplicationDetails(props.match.params.id);
    if (response?.status == 200) {
      setState((pervState) => ({
        ...pervState,
        loading: false,
        data: response?.data?.results,
        applicant_details: response?.data?.results?.applicant_details,
      }));
    }
  };

  const postApplicationAllDetails = async (payload) => {
    const response = await submitUpdateFormData(props.match.params.id, payload);
    if (response) {
      toast.warn("Technical issue detected");
    }
  };

  useEffect(() => {
    getAllApplicationDetails();
  }, []);

  return (
    <>
      {loading ? (
        <div className="text-center">
          <Spinner type="grow" color="primary" size="lg" />
        </div>
      ) : (
        <Formik
          initialValues={{
            //1 kyc form
            customer_first_name:
              applicant_details?.personal_info?.name?.first_name,
            customer_middle_name:
              applicant_details?.personal_info?.name?.middle_name,
            customer_last_name:
              applicant_details?.personal_info?.name?.last_name,
            customer_dob: applicant_details?.personal_info?.dob,
            customer_age: applicant_details?.personal_info?.age,
            customer_gender: applicant_details?.personal_info?.gender,
            customer_marital_status:
              applicant_details?.personal_info?.marital_status,
            customer_aadhar_no: applicant_details?.kyc_info[0]?.id_value,
            customer_voter_id: "",
            customer_driving_license: "",
            customer_passport: "",
            customer_pan: applicant_details?.kyc_info[1]?.id_value,
            customer_ration_card: "",
            customer_mgnrega_id: "",

            //2 mailing address
            customer_mailing_house_no:
              applicant_details?.contact_details[0]?.address?.house_no,
            customer_mailing_house_street:
              applicant_details?.contact_details[0]?.address?.built_of_area,
            customer_mailing_landmark:
              applicant_details?.contact_details[0]?.address?.landmark,
            customer_mailing_locality:
              applicant_details?.contact_details[0]?.address?.locality,
            customer_mailing_pincode:
              applicant_details?.contact_details[0]?.address?.pincode,
            customer_mailing_state:
              applicant_details?.contact_details[0]?.address?.state,
            customer_mailing_district:
              applicant_details?.contact_details[0]?.address?.district,
            customer_mailing_city:
              applicant_details?.contact_details[0]?.address?.city,
            customer_mailing_mobile_no:
              applicant_details?.contact_details[0]?.phones[0]?.number,

            //3 Permanent Address
            customer_permanent_house_no: "",
            customer_permanent_house_street: "",
            customer_permanent_landmark: "",
            customer_permanent_locality: "",
            customer_permanent_pincode: "",
            customer_permanent_state: "",
            customer_permanent_district: "",
            customer_permanent_city: "",
            customer_permanent_mobile_no: "",

            //4 Official Address
            customer_official_house_no: "",
            customer_official_house_street: "",
            customer_official_landmark: "",
            customer_official_locality: "",
            customer_official_pincode: "",
            customer_official_state: "",
            customer_official_district: "",
            customer_official_city: "",
            customer_official_mobile_no: "",

            // Spouse Details
            spouse_first_name:
              applicant_details?.personal_info?.name?.first_name,
            spouse_middle_name:
              applicant_details?.personal_info?.name?.middle_name,
            spouse_last_name: applicant_details?.personal_info?.name?.last_name,
            spouse_dob: applicant_details?.personal_info?.dob,
            spouse_age: applicant_details?.personal_info?.age,
            spouse_gender: applicant_details?.personal_info?.gender,
            spouse_marital_status:
              applicant_details?.personal_info?.marital_status,
            spouse_adhar_number: applicant_details?.kyc_info[0]?.id_value,
            spouse_voter_id: "",
            spouse_driving_license: "",
            spouse_passport: "",
            spouse_pan: applicant_details?.kyc_info[1]?.id_value,
            spouse_ration_card: "",
            spouse_mgnrega_id: "",

            //sopouse mailing address
            spouse_mailing_house_no: "",
            spouse_mailing_house_street: "",
            spouse_mailing_landmark: "",
            spouse_mailing_locality: "",
            spouse_mailing_pincode: "",
            spouse_mailing_state: "",
            spouse_mailing_district: "",
            spouse_mailing_city: "",
            spouse_mailing_mobile_no: "",

            //5 Bank Details
            customer_bank_name: "",
            customer_bank_account_number: "",
            customer_bank_account_holder_name: "",
            customer_bank_branch: "",
            customer_bank_account_type: "",
            customer_bank_ifsc_code: "",
            customer_bank_operating_since: "",

            // Coborrower Details
            co_borrower_first_name:
              applicant_details?.personal_info?.name?.first_name,
            co_borrower_middle_name:
              applicant_details?.personal_info?.name?.middle_name,
            co_borrower_last_name:
              applicant_details?.personal_info?.name?.last_name,
            co_borrower_dob: applicant_details?.personal_info?.dob,
            co_borrower_age: applicant_details?.personal_info?.age,
            co_borrower_gender: applicant_details?.personal_info?.gender,
            co_borrower_marital_status:
              applicant_details?.personal_info?.marital_status,
            co_borrower_aadhar_no: applicant_details?.kyc_info[0]?.id_value,
            co_borrower_voter_id: "",
            co_borrower_driving_licence: "",
            co_borrower_passport: "",
            co_borrower_pan: applicant_details?.kyc_info[1]?.id_value,
            co_borrower_ration_card: "",
            co_borrower_mgnrega_id: "",

            //co borrower mailing address
            co_borrower_mailing_house_no: "",
            co_borrower_mailing_house_street: "",
            co_borrower_mailing_landmark: "",
            co_borrower_mailing_locality: "",
            co_borrower_mailing_pincode: "",
            co_borrower_mailing_state: "",
            co_borrower_mailing_district: "",
            co_borrower_mailing_city: "",
            co_borrower_mailing_mobile_no: "",

            //co_borrower Official Address
            co_borrower_official_house_no: "",
            co_borrower_official_house_street: "",
            co_borrower_official_landmark: "",
            co_borrower_official_locality: "",
            co_borrower_official_pincode: "",
            co_borrower_official_state: "",
            co_borrower_official_district: "",
            co_borrower_official_city: "",
            co_borrower_official_mobile_no: "",
          }}
          enableReinitialize={data ? true : false}
          validationSchema={validate}
          onSubmit={(values, { resetForm }) => {
            debugger;
            const payload = {
              ...values,
              co_borrower_dob: moment(values.co_borrower_dob).format(
                "DD/MM/YYYY"
              ),
              customer_dob: moment(values.customer_dob).format("DD/MM/YYYY"),
              spouse_dob: moment(values.spouse_dob).format("DD/MM/YYYY"),
              update_type: "update_application_loan_details",
            };
            postApplicationAllDetails(payload);
            console.log("payload", payload);
            selectRef1.current.select.clearValue();
            selectRef2.current.select.clearValue();
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
                <Card className="mb-0">
                  <CardHeader>
                    <div className="mainaHeading">Applicant Details</div>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <div className="container">
                        <div className="accordion" id="accordionExample">
                          <div className="card">
                            <div
                              className="card-head headBar rounded"
                              id="headingOne"
                            >
                              <h4
                                className="mb-0 collapsed"
                                data-toggle="collapse"
                                data-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                              >
                                KYC Details
                              </h4>
                            </div>

                            <div
                              id="collapseOne"
                              className="collapse "
                              aria-labelledby="headingOne"
                              data-parent="#accordionExample"
                            >
                              <div className="card-body">
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_first_name"
                                    id="customer_first_name"
                                    label="First name"
                                    placeholder="First name"
                                    type="text"
                                    maxLength="50"
                                    value={values.customer_first_name || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_middle_name"
                                    id="customer_middle_name"
                                    label="Middle name"
                                    placeholder="Middle name"
                                    type="text"
                                    maxLength="50"
                                    value={values.customer_middle_name || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_last_name"
                                    id="customer_last_name"
                                    label="Last name"
                                    placeholder="Last name"
                                    type="text"
                                    maxLength="50"
                                    value={values.customer_last_name || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <ApplicationDatePicker
                                    name="customer_dob"
                                    label="Date of birth"
                                    value={values.customer_dob}
                                    dateFormat="dd-MM-yyyy"
                                    placeholderText="Date of birth"
                                    autoComplete="off"
                                    customClassName={
                                      errors.customer_dob &&
                                      touched.customer_dob &&
                                      "border-red"
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_age"
                                    id="customer_age"
                                    label="Age"
                                    placeholder="Age"
                                    type="text"
                                    maxLength="50"
                                    value={values.customer_age || ""}
                                    disabled
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <SelectDropDown
                                    label="Gender"
                                    name="customer_gender"
                                    options={freqDat}
                                    placeholder="Gender"
                                    ref={selectRef1}
                                    classNamePrefix="select"
                                    onBlur={handleBlur}
                                    onChange={(option) => {
                                      if (option) {
                                        setFieldValue(
                                          "customer_gender",
                                          option.value
                                        );
                                      } else {
                                        setFieldValue("customer_gender", "");
                                      }
                                    }}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <SelectDropDown
                                    label="Marital Status"
                                    name="customer_marital_status"
                                    options={freqDat}
                                    placeholder="Marital Status"
                                    ref={selectRef2}
                                    classNamePrefix="select"
                                    onBlur={handleBlur}
                                    onChange={(option) => {
                                      if (option) {
                                        setFieldValue(
                                          "customer_marital_status",
                                          option.value
                                        );
                                      } else {
                                        setFieldValue(
                                          "customer_marital_status",
                                          ""
                                        );
                                      }
                                    }}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_aadhar_no"
                                    id="customer_aadhar_no"
                                    label="Adhar Number"
                                    placeholder="Adhar Number"
                                    type="text"
                                    // maxLength="50"
                                    value={values.customer_aadhar_no || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_voter_id"
                                    id="customer_voter_id"
                                    label="Voter ID"
                                    placeholder="Voter ID"
                                    type="text"
                                    // maxLength="50"
                                    value={values.customer_voter_id || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_driving_license"
                                    id="customer_driving_license"
                                    label="Driving Licence"
                                    placeholder="Driving Licence"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.customer_driving_license || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_passport"
                                    id="customer_passport"
                                    label="Passport"
                                    placeholder="Passport"
                                    type="text"
                                    // maxLength="50"
                                    value={values.customer_passport || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_pan"
                                    id="customer_pan"
                                    label="Pan Number"
                                    placeholder="Pan Number"
                                    type="text"
                                    // maxLength="50"
                                    value={values.customer_pan || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_ration_card"
                                    id="customer_ration_card"
                                    label="Ration Card"
                                    placeholder="Ration Card"
                                    type="text"
                                    // maxLength="50"
                                    value={values.customer_ration_card || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_mgnrega_id"
                                    id="customer_mgnrega_id"
                                    label="Mgnrega Card"
                                    placeholder="Mgnrega Card"
                                    type="text"
                                    // maxLength="50"
                                    value={values.customer_mgnrega_id || ""}
                                  />
                                </Col>
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div
                              className="card-head headBar rounded"
                              id="headingTwo"
                            >
                              <h4
                                className="mb-0 collapsed"
                                data-toggle="collapse"
                                data-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                              >
                                Mailing Address
                              </h4>
                            </div>
                            <div
                              id="collapseTwo"
                              className="collapse"
                              aria-labelledby="headingTwo"
                              data-parent="#accordionExample"
                            >
                              <div className="card-body">
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_mailing_house_no"
                                    id="customer_mailing_house_no"
                                    label="Plot/House No."
                                    placeholder="Plot/House No."
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.customer_mailing_house_no || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_mailing_house_street"
                                    id="customer_mailing_house_street"
                                    label="House Street"
                                    placeholder="House Street"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.customer_mailing_house_street || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_mailing_landmark"
                                    id="customer_mailing_landmark"
                                    label="landmark"
                                    placeholder="landmark"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.customer_mailing_landmark || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_mailing_locality"
                                    id="customer_mailing_locality"
                                    label="locality"
                                    placeholder="locality"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.customer_mailing_locality || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_mailing_pincode"
                                    id="customer_mailing_pincode"
                                    label="pincode"
                                    placeholder="pincode"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.customer_mailing_pincode || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_mailing_state"
                                    id="customer_mailing_state"
                                    label="state"
                                    placeholder="state"
                                    type="text"
                                    // maxLength="50"
                                    value={values.customer_mailing_state || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_mailing_district"
                                    id="customer_mailing_district"
                                    label="district"
                                    placeholder="district"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.customer_mailing_district || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_mailing_city"
                                    id="customer_mailing_city"
                                    label="city"
                                    placeholder="city"
                                    type="text"
                                    // maxLength="50"
                                    value={values.customer_mailing_city || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_mailing_mobile_no"
                                    id="customer_mailing_mobile_no"
                                    label="Mobile Number"
                                    placeholder="Mobile Number"
                                    type="number"
                                    maxLength="10"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={
                                      values.customer_mailing_mobile_no || ""
                                    }
                                  />
                                </Col>
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div
                              className="card-head headBar rounded"
                              id="headingThree"
                            >
                              <h4
                                className="mb-0 collapsed"
                                data-toggle="collapse"
                                data-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree"
                              >
                                Permanent Address
                              </h4>
                            </div>
                            <div
                              id="collapseThree"
                              className="collapse"
                              aria-labelledby="headingThree"
                              data-parent="#accordionExample"
                            >
                              <div className="card-body">
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_permanent_house_no"
                                    id="customer_permanent_house_no"
                                    label="Plot/House No."
                                    placeholder="Plot/House No."
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.customer_permanent_house_no || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_permanent_house_street"
                                    id="customer_permanent_house_street"
                                    label="Street"
                                    placeholder="Street"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.customer_permanent_house_street ||
                                      ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_permanent_landmark"
                                    id="customer_permanent_landmark"
                                    label="landmark"
                                    placeholder="landmark"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.customer_permanent_landmark || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_permanent_locality"
                                    id="customer_permanent_locality"
                                    label="locality"
                                    placeholder="locality"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.customer_permanent_locality || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_permanent_pincode"
                                    id="customer_permanent_pincode"
                                    label="pincode"
                                    placeholder="pincode"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.customer_permanent_pincode || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_permanent_state"
                                    id="customer_permanent_state"
                                    label="state"
                                    placeholder="state"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.customer_permanent_state || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_permanent_district"
                                    id="customer_permanent_district"
                                    label="district"
                                    placeholder="district"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.customer_permanent_district || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_permanent_city"
                                    id="customer_permanent_city"
                                    label="city"
                                    placeholder="city"
                                    type="text"
                                    // maxLength="50"
                                    value={values.customer_permanent_city || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_permanent_mobile_no"
                                    id="customer_permanent_mobile_no"
                                    label="Mobile Number"
                                    placeholder="Mobile Number"
                                    type="text"
                                    maxLength="10"
                                    value={
                                      values.customer_permanent_mobile_no || ""
                                    }
                                  />
                                </Col>
                              </div>
                            </div>
                          </div>

                          <div className="card">
                            <div
                              className="card-head headBar rounded"
                              id="headingFour"
                            >
                              <h4
                                className="mb-0 collapsed"
                                data-toggle="collapse"
                                data-target="#collapseFour"
                                aria-expanded="false"
                                aria-controls="collapseFour"
                              >
                                Official Address
                              </h4>
                            </div>

                            <div
                              id="collapseFour"
                              className="collapse"
                              aria-labelledby="headingFour"
                              data-parent="#accordionExample"
                            >
                              <div className="card-body">
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_official_house_no"
                                    id="customer_official_house_no"
                                    label="Plot/House No."
                                    placeholder="Plot/House No."
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.customer_official_house_no || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_official_house_street"
                                    id="customer_official_house_street"
                                    label="Street"
                                    placeholder="Street"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.customer_official_house_street ||
                                      ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_official_landmark"
                                    id="customer_official_landmark"
                                    label="landmark"
                                    placeholder="landmark"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.customer_official_landmark || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_official_locality"
                                    id="customer_official_locality"
                                    label="locality"
                                    placeholder="locality"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.customer_official_locality || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_official_pincode"
                                    id="customer_official_pincode"
                                    label="pincode"
                                    placeholder="pincode"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.customer_official_pincode || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_official_state"
                                    id="customer_official_state"
                                    label="state"
                                    placeholder="state"
                                    type="text"
                                    // maxLength="50"
                                    value={values.customer_official_state || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_official_district"
                                    id="customer_official_district"
                                    label="district"
                                    placeholder="district"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.customer_official_district || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_official_city"
                                    id="customer_official_city"
                                    label="city"
                                    placeholder="city"
                                    type="text"
                                    // maxLength="50"
                                    value={values.customer_official_city || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_official_mobile_no"
                                    id="customer_official_mobile_no"
                                    label="Mobile Number"
                                    placeholder="Mobile Number"
                                    type="number"
                                    maxLength="10"
                                    value={
                                      values.customer_official_mobile_no || ""
                                    }
                                  />
                                </Col>
                              </div>
                            </div>
                          </div>
                          <div className="mainaHeading">Spouse Details - 1</div>
                          <div className="card">
                            <div
                              className="card-head headBar rounded"
                              id="headingfive"
                            >
                              <h4
                                className="mb-0 collapsed"
                                data-toggle="collapse"
                                data-target="#collapsefive"
                                aria-expanded="false"
                                aria-controls="collapsefive"
                              >
                                KYC Details
                              </h4>
                            </div>

                            <div
                              id="collapsefive"
                              className="collapse"
                              aria-labelledby="headingfive"
                              data-parent="#accordionExample"
                            >
                              <div className="card-body">
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="spouse_first_name"
                                    id="spouse_first_name"
                                    label="First name"
                                    placeholder="First name"
                                    type="text"
                                    maxLength="50"
                                    value={values.spouse_first_name || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="spouse_middle_name"
                                    id="spouse_middle_name"
                                    label="Middle name"
                                    placeholder="Middle name"
                                    type="text"
                                    maxLength="50"
                                    value={values.spouse_middle_name || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="spouse_last_name"
                                    id="spouse_last_name"
                                    label="Last name"
                                    placeholder="Last name"
                                    type="text"
                                    maxLength="50"
                                    value={values.spouse_last_name || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <ApplicationDatePicker
                                    name="spouse_dob"
                                    label="Date of birth"
                                    value={values.activation_date}
                                    dateFormat="dd-MM-yyyy"
                                    placeholderText="Date of birth"
                                    autoComplete="off"
                                    customClassName={
                                      errors.activation_date &&
                                      touched.activation_date &&
                                      "border-red"
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="spouse_age"
                                    id="spouse_age"
                                    label="Age"
                                    placeholder="Age"
                                    type="text"
                                    maxLength="50"
                                    value={values.spouse_age || ""}
                                    disabled
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <SelectDropDown
                                    label="Gender"
                                    name="spouse_gender"
                                    options={freqDat}
                                    placeholder="Gender"
                                    ref={selectRef1}
                                    classNamePrefix="select"
                                    onBlur={handleBlur}
                                    onChange={(option) => {
                                      if (option) {
                                        setFieldValue(
                                          "spouse_gender",
                                          option.value
                                        );
                                      } else {
                                        setFieldValue("spouse_gender", "");
                                      }
                                    }}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <SelectDropDown
                                    label="Marital Status"
                                    name="spouse_marital_status"
                                    options={freqDat}
                                    placeholder="Marital Status"
                                    ref={selectRef2}
                                    classNamePrefix="select"
                                    onBlur={handleBlur}
                                    onChange={(option) => {
                                      if (option) {
                                        setFieldValue(
                                          "spouse_marital_status",
                                          option.value
                                        );
                                      } else {
                                        setFieldValue(
                                          "spouse_marital_status",
                                          ""
                                        );
                                      }
                                    }}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="spouse_adhar_number"
                                    id="spouse_adhar_number"
                                    label="Adhar Number"
                                    placeholder="Adhar Number"
                                    type="text"
                                    // maxLength="50"
                                    value={values.spouse_adhar_number || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="spouse_voter_id"
                                    id="spouse_voter_id"
                                    label="Voter ID"
                                    placeholder="Voter ID"
                                    type="text"
                                    // maxLength="50"
                                    value={values.spouse_voter_id || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="spouse_driving_license"
                                    id="spouse_driving_license"
                                    label="Driving Licence"
                                    placeholder="Driving Licence"
                                    type="text"
                                    // maxLength="50"
                                    value={values.spouse_driving_license || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="spouse_passport"
                                    id="spouse_passport"
                                    label="Passport"
                                    placeholder="Passport"
                                    type="text"
                                    // maxLength="50"
                                    value={values.spouse_passport || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="spouse_pan"
                                    id="spouse_pan"
                                    label="Pan Number"
                                    placeholder="Pan Number"
                                    type="text"
                                    // maxLength="50"
                                    value={values.spouse_pan || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="spouse_ration_card"
                                    id="spouse_ration_card"
                                    label="Ration Card"
                                    placeholder="Ration Card"
                                    type="text"
                                    // maxLength="50"
                                    value={values.spouse_ration_card || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="spouse_mgnrega_id"
                                    id="spouse_mgnrega_id"
                                    label="Mgnrega Card"
                                    placeholder="Mgnrega Card"
                                    type="text"
                                    // maxLength="50"
                                    value={values.spouse_mgnrega_id || ""}
                                  />
                                </Col>
                              </div>
                            </div>
                          </div>

                          <div className="card">
                            <div
                              className="card-head headBar rounded"
                              id="headingSix"
                            >
                              <h4
                                className="mb-0 collapsed"
                                data-toggle="collapse"
                                data-target="#collapseSix"
                                aria-expanded="false"
                                aria-controls="collapseSix"
                              >
                                Spouse Mailing Address
                              </h4>
                            </div>

                            <div
                              id="collapseSix"
                              className="collapse"
                              aria-labelledby="headingSix"
                              data-parent="#accordionExample"
                            >
                              <div className="card-body">
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="spouse_mailing_house_no"
                                    id="spouse_mailing_house_no"
                                    label="Plot/House No."
                                    placeholder="Plot/House No."
                                    type="text"
                                    // maxLength="50"
                                    value={values.spouse_mailing_house_no || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="spouse_mailing_house_street"
                                    id="spouse_mailing_house_street"
                                    label="House Street"
                                    placeholder="House Street"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.spouse_mailing_house_street || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="spouse_mailing_landmark"
                                    id="spouse_mailing_landmark"
                                    label="landmark"
                                    placeholder="landmark"
                                    type="text"
                                    // maxLength="50"
                                    value={values.spouse_mailing_landmark || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="spouse_mailing_locality"
                                    id="spouse_mailing_locality"
                                    label="locality"
                                    placeholder="locality"
                                    type="text"
                                    // maxLength="50"
                                    value={values.spouse_mailing_locality || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="spouse_mailing_pincode"
                                    id="spouse_mailing_pincode"
                                    label="pincode"
                                    placeholder="pincode"
                                    type="text"
                                    // maxLength="50"
                                    value={values.spouse_mailing_pincode || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="spouse_mailing_state"
                                    id="spouse_mailing_state"
                                    label="state"
                                    placeholder="state"
                                    type="text"
                                    // maxLength="50"
                                    value={values.spouse_mailing_state || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="spouse_mailing_district"
                                    id="spouse_mailing_district"
                                    label="district"
                                    placeholder="district"
                                    type="text"
                                    // maxLength="50"
                                    value={values.spouse_mailing_district || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="spouse_mailing_city"
                                    id="spouse_mailing_city"
                                    label="city"
                                    placeholder="city"
                                    type="text"
                                    // maxLength="50"
                                    value={values.spouse_mailing_city || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="spouse_mailing_mobile_no"
                                    id="spouse_mailing_mobile_no"
                                    label="Mobile Number"
                                    placeholder="Mobile Number"
                                    type="number"
                                    maxLength="10"
                                    value={
                                      values.spouse_mailing_mobile_no || ""
                                    }
                                  />
                                </Col>
                              </div>
                            </div>
                          </div>

                          <div className="card">
                            <div
                              className="card-head headBar rounded"
                              id="headingSeven"
                            >
                              <h4
                                className="mb-0 collapsed"
                                data-toggle="collapse"
                                data-target="#collapseSeven"
                                aria-expanded="false"
                                aria-controls="collapseSeven"
                              >
                                Bank Details
                              </h4>
                            </div>

                            <div
                              id="collapseSeven"
                              className="collapse"
                              aria-labelledby="headingSeven"
                              data-parent="#accordionExample"
                            >
                              <div className="card-body">
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_bank_name"
                                    id="customer_bank_name"
                                    label="Bank Name"
                                    placeholder="Bank Name"
                                    type="text"
                                    // maxLength="50"
                                    value={values.customer_bank_name || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_bank_account_number"
                                    id="customer_bank_account_number"
                                    label="Account Number"
                                    placeholder="Account Number"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.customer_bank_account_number || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_bank_account_holder_name"
                                    id="customer_bank_account_holder_name"
                                    label="Account Holder Name"
                                    placeholder="Account Holder Name"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.customer_bank_account_holder_name ||
                                      ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_bank_branch"
                                    id="customer_bank_branch"
                                    label="Branch"
                                    placeholder="Branch"
                                    type="text"
                                    // maxLength="50"
                                    value={values.customer_bank_branch || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <SelectDropDown
                                    label="Account type"
                                    name="customer_bank_account_type"
                                    options={freqDat}
                                    placeholder="Account type"
                                    ref={selectRef2}
                                    classNamePrefix="select"
                                    onBlur={handleBlur}
                                    onChange={(option) => {
                                      if (option) {
                                        setFieldValue(
                                          "customer_bank_account_type",
                                          option.value
                                        );
                                      } else {
                                        setFieldValue(
                                          "customer_bank_account_type",
                                          ""
                                        );
                                      }
                                    }}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="customer_bank_ifsc_code"
                                    id="customer_bank_ifsc_code"
                                    label="IFSC Code"
                                    placeholder="IFSC Code"
                                    type="text"
                                    // maxLength="50"
                                    value={values.customer_bank_ifsc_code || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <SelectDropDown
                                    label="Operating Since"
                                    name="customer_bank_operating_since"
                                    options={freqDat}
                                    placeholder="Operating Since"
                                    ref={selectRef2}
                                    classNamePrefix="select"
                                    onBlur={handleBlur}
                                    onChange={(option) => {
                                      if (option) {
                                        setFieldValue(
                                          "customer_bank_operating_since",
                                          option.value
                                        );
                                      } else {
                                        setFieldValue(
                                          "customer_bank_operating_since",
                                          ""
                                        );
                                      }
                                    }}
                                  />
                                </Col>
                              </div>
                            </div>
                          </div>
                          <div className="mainaHeading">
                            Coborrower Details - 1
                          </div>
                          <div className="card">
                            <div
                              className="card-head headBar rounded"
                              id="headingEight"
                            >
                              <h4
                                className="mb-0 collapsed"
                                data-toggle="collapse"
                                data-target="#collapseEight"
                                aria-expanded="false"
                                aria-controls="collapseEight"
                              >
                                KYC Details
                              </h4>
                            </div>

                            <div
                              id="collapseEight"
                              className="collapse"
                              aria-labelledby="headingEight"
                              data-parent="#accordionExample"
                            >
                              <div className="card-body">
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_first_name"
                                    id="co_borrower_first_name"
                                    label="First name"
                                    placeholder="First name"
                                    type="text"
                                    maxLength="50"
                                    value={values.co_borrower_first_name || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_middle_name"
                                    id="co_borrower_middle_name"
                                    label="Middle name"
                                    placeholder="Middle name"
                                    type="text"
                                    maxLength="50"
                                    value={values.co_borrower_middle_name || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_last_name"
                                    id="co_borrower_last_name"
                                    label="Last name"
                                    placeholder="Last name"
                                    type="text"
                                    maxLength="50"
                                    value={values.co_borrower_last_name || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <ApplicationDatePicker
                                    name="co_borrower_dob"
                                    label="Date of birth"
                                    value={values.activation_date}
                                    dateFormat="dd-MM-yyyy"
                                    placeholderText="Date of birth"
                                    autoComplete="off"
                                    customClassName={
                                      errors.activation_date &&
                                      touched.activation_date &&
                                      "border-red"
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_age"
                                    id="co_borrower_age"
                                    label="Age"
                                    placeholder="Age"
                                    type="text"
                                    maxLength="50"
                                    value={values.co_borrower_age || ""}
                                    disabled
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <SelectDropDown
                                    label="Gender"
                                    name="co_borrower_gender"
                                    options={freqDat}
                                    placeholder="Gender"
                                    ref={selectRef1}
                                    classNamePrefix="select"
                                    onBlur={handleBlur}
                                    onChange={(option) => {
                                      if (option) {
                                        setFieldValue(
                                          "co_borrower_gender",
                                          option.value
                                        );
                                      } else {
                                        setFieldValue("co_borrower_gender", "");
                                      }
                                    }}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <SelectDropDown
                                    label="Marital Status"
                                    name="co_borrower_marital_status"
                                    options={freqDat}
                                    placeholder="Marital Status"
                                    ref={selectRef2}
                                    classNamePrefix="select"
                                    onBlur={handleBlur}
                                    onChange={(option) => {
                                      if (option) {
                                        setFieldValue(
                                          "co_borrower_marital_status",
                                          option.value
                                        );
                                      } else {
                                        setFieldValue(
                                          "co_borrower_marital_status",
                                          ""
                                        );
                                      }
                                    }}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_aadhar_no"
                                    id="co_borrower_aadhar_no"
                                    label="Adhar Number"
                                    placeholder="Adhar Number"
                                    type="text"
                                    // maxLength="50"
                                    value={values.co_borrower_aadhar_no || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_voter_id"
                                    id="co_borrower_voter_id"
                                    label="Voter ID"
                                    placeholder="Voter ID"
                                    type="text"
                                    // maxLength="50"
                                    value={values.co_borrower_voter_id || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_driving_licence"
                                    id="co_borrower_driving_licence"
                                    label="Driving Licence"
                                    placeholder="Driving Licence"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.co_borrower_driving_licence || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_passport"
                                    id="co_borrower_passport"
                                    label="Passport"
                                    placeholder="Passport"
                                    type="text"
                                    // maxLength="50"
                                    value={values.co_borrower_passport || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_pan"
                                    id="co_borrower_pan"
                                    label="Pan Number"
                                    placeholder="Pan Number"
                                    type="text"
                                    // maxLength="50"
                                    value={values.co_borrower_pan || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_ration_card"
                                    id="co_borrower_ration_card"
                                    label="Ration Card"
                                    placeholder="Ration Card"
                                    type="text"
                                    // maxLength="50"
                                    value={values.co_borrower_ration_card || ""}
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_mgnrega_id"
                                    id="co_borrower_mgnrega_id"
                                    label="Mgnrega Card"
                                    placeholder="Mgnrega Card"
                                    type="text"
                                    // maxLength="50"
                                    value={values.co_borrower_mgnrega_id || ""}
                                  />
                                </Col>
                              </div>
                            </div>
                          </div>
                          <div className="card">
                            <div
                              className="card-head headBar rounded"
                              id="headingNine"
                            >
                              <h4
                                className="mb-0 collapsed"
                                data-toggle="collapse"
                                data-target="#collapseNine"
                                aria-expanded="false"
                                aria-controls="collapseNine"
                              >
                                Co borrower Mailing Address
                              </h4>
                            </div>

                            <div
                              id="collapseNine"
                              className="collapse"
                              aria-labelledby="headingNine"
                              data-parent="#accordionExample"
                            >
                              <div className="card-body">
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_mailing_house_no"
                                    id="co_borrower_mailing_house_no"
                                    label="Plot/House No."
                                    placeholder="Plot/House No."
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.co_borrower_mailing_house_no || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_mailing_house_street"
                                    id="co_borrower_mailing_house_street"
                                    label="House Street"
                                    placeholder="House Street"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.co_borrower_mailing_house_street ||
                                      ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_mailing_landmark"
                                    id="co_borrower_mailing_landmark"
                                    label="landmark"
                                    placeholder="landmark"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.co_borrower_mailing_landmark || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_mailing_locality"
                                    id="co_borrower_mailing_locality"
                                    label="locality"
                                    placeholder="locality"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.co_borrower_mailing_locality || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_mailing_pincode"
                                    id="co_borrower_mailing_pincode"
                                    label="pincode"
                                    placeholder="pincode"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.co_borrower_mailing_pincode || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_mailing_state"
                                    id="co_borrower_mailing_state"
                                    label="state"
                                    placeholder="state"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.co_borrower_mailing_state || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_mailing_district"
                                    id="co_borrower_mailing_district"
                                    label="district"
                                    placeholder="district"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.co_borrower_mailing_district || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_mailing_city"
                                    id="co_borrower_mailing_city"
                                    label="city"
                                    placeholder="city"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.co_borrower_mailing_city || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_mailing_mobile_no"
                                    id="co_borrower_mailing_mobile_no"
                                    label="Mobile Number"
                                    placeholder="Mobile Number"
                                    type="number"
                                    maxLength="10"
                                    value={
                                      values.co_borrower_mailing_mobile_no || ""
                                    }
                                  />
                                </Col>
                              </div>
                            </div>
                          </div>

                          <div className="card">
                            <div
                              className="card-head headBar rounded"
                              id="headingTen"
                            >
                              <h4
                                className="mb-0 collapsed"
                                data-toggle="collapse"
                                data-target="#collapseTen"
                                aria-expanded="false"
                                aria-controls="collapseTen"
                              >
                                co_borrower Official Address
                              </h4>
                            </div>

                            <div
                              id="collapseTen"
                              className="collapse"
                              aria-labelledby="headingTen"
                              data-parent="#accordionExample"
                            >
                              <div className="card-body">
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_official_house_no"
                                    id="co_borrower_official_house_no"
                                    label="Plot/House No."
                                    placeholder="Plot/House No."
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.co_borrower_official_house_no || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_official_house_street"
                                    id="co_borrower_official_house_street"
                                    label="Street"
                                    placeholder="Street"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.co_borrower_official_house_street ||
                                      ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_official_landmark"
                                    id="co_borrower_official_landmark"
                                    label="landmark"
                                    placeholder="landmark"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.co_borrower_official_landmark || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_official_locality"
                                    id="co_borrower_official_locality"
                                    label="locality"
                                    placeholder="locality"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.co_borrower_official_locality || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_official_pincode"
                                    id="co_borrower_official_pincode"
                                    label="pincode"
                                    placeholder="pincode"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.co_borrower_official_pincode || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_official_state"
                                    id="co_borrower_official_state"
                                    label="state"
                                    placeholder="state"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.co_borrower_official_state || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_official_district"
                                    id="co_borrower_official_district"
                                    label="district"
                                    placeholder="district"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.co_borrower_official_district || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_official_city"
                                    id="co_borrower_official_city"
                                    label="city"
                                    placeholder="city"
                                    type="text"
                                    // maxLength="50"
                                    value={
                                      values.co_borrower_official_city || ""
                                    }
                                  />
                                </Col>
                                <Col md="12" sm="12" className="mb-1">
                                  <TextField
                                    name="co_borrower_official_mobile_no"
                                    id="co_borrower_official_mobile_no"
                                    label="Mobile Number"
                                    placeholder="Mobile Number"
                                    type="number"
                                    maxLength="10"
                                    value={
                                      values.co_borrower_official_mobile_no ||
                                      ""
                                    }
                                  />
                                </Col>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Row>
                  </CardBody>
                  <Row>
                    <Col className="d-flex justify-content-center col-sm-12 col-md-12 mb-2">
                      <button type="submit" className="btn btn-primary">
                        Save
                      </button>
                    </Col>
                  </Row>
                </Card>
              </Form>
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default withRouter(UpdateApplicationDetails);
