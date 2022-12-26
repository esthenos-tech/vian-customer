import React, { useState } from "react";
import { Row } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import * as Yup from "yup";
import { Formik } from "formik";
import { TextField } from "./TextField";
import { Col, Label } from "reactstrap";
import { BiRupee } from "react-icons/bi";

const validate = Yup.object().shape({
  processing_fees: Yup.string().required("This field is required"),
  insurance_fees: Yup.string().required("This field is required"),
  legal_charge: Yup.string().required("This field is required"),
  valuation_charge: Yup.string().required("This field is required"),
  imd_charge: Yup.string().required("This field is required"),
  cattle_insurance_premium: Yup.string().required("This field is required"),
});

const FeesCollectionForm = ({ applicant_id, handleFormData }) => {
  return (
    <Formik
      initialValues={{
        processing_fees: "",
        insurance_fees: "",
        legal_charge: "",
        valuation_charge: "",
        imd_charge: "",
        cattle_insurance_premium: "",
      }}
      validationSchema={validate}
      onSubmit={(formData, { resetForm }) => {
        const payload = {
          ...formData,
          application_id: applicant_id,
          action: "Collect_Fees",
        };
        handleFormData(payload);
        resetForm();
      }}
      handleChange={(formData) => {
        console.log("formData", formData);
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
          <form onSubmit={handleSubmit} onChange={handleChange}>
            <Row>
              <Col sm={12} md={12}>
                <TextField
                  name="processing_fees"
                  id="processing_fees"
                  label="Processing Fees"
                  placeholder="Processing Fees"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.processing_fees || ""}
                />
              </Col>
              <Col sm={12} md={12}>
                <TextField
                  name="insurance_fees"
                  id="insurance_fees"
                  label="Insurance Fees"
                  placeholder="Insurance Fees"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.insurance_fees || ""}
                />
              </Col>
              <Col sm={12} md={12}>
                <TextField
                  name="legal_charge"
                  id="legal_charge"
                  label="Legal Charge"
                  placeholder="Legal Charge"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.legal_charge || ""}
                />
              </Col>
              <Col sm={12} md={12}>
                <TextField
                  name="valuation_charge"
                  id="valuation_charge"
                  label="Valuation Charge"
                  placeholder="Valuation Charge"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.valuation_charge || ""}
                />
              </Col>
              <Col sm={12} md={12}>
                <TextField
                  name="imd_charge"
                  id="imd_charge"
                  label="IMD Charge"
                  placeholder="IMD Charge"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.imd_charge || ""}
                />
              </Col>
              <Col sm={12} md={12}>
                <TextField
                  name="cattle_insurance_premium"
                  id="cattle_insurance_premium"
                  label="Cattle Insurance Premium"
                  placeholder="Cattle Insurance Premium"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.cattle_insurance_premium || ""}
                />
              </Col>
            </Row>
            <Row>
              <DisplayData {...formik} />
            </Row>
            <Row className="d-flex justify-content-center">
              <button className=" btn btn-primary " color="none" type="submit">
                Submit
              </button>
            </Row>

            <ReactTooltip />
          </form>
        );
      }}
    </Formik>
  );
};

const DisplayData = (formik) => {
  const style = {
    fontSize: "18px",
    fontWeight: "700",
  };
  const sum =
    formik.values.processing_fees +
    formik.values.insurance_fees +
    formik.values.legal_charge +
    formik.values.valuation_charge +
    formik.values.imd_charge +
    formik.values.cattle_insurance_premium;
  return (
    <>
      <Col md={12} className="d-flex justify-content-between">
        <Label className="p-2" style={style}>
          Total Fees Collected
        </Label>
        <div className="py-2 pr-3" style={style}>
          {sum !== "" ? (
            <>
              <BiRupee />
              {sum}
            </>
          ) : (
            <>
              <BiRupee />0
            </>
          )}
        </div>
      </Col>
    </>
  );
};
export default FeesCollectionForm;
