import React, { useEffect, useRef, useState } from "react";
import { Card, Button, FormGroup, Label, Input } from "reactstrap";
// ** Reactstrap Imports
import { CardHeader, CardTitle, CardBody, Row, Col } from "reactstrap";
import Select from "react-select";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  getAllArealocation,
  getAllBranchlocation,
  getAllClusterlocation,
  getAllStatelocation,
  getAllZonelocation,
} from "../components/dataLayer/OrganisationUpdateLocation/index";
import { TextField } from "../components/CommonComponents/TextField";
// import { selectThemeColors } from '@utils'

const CustomersFilter = ({ handlerSubmitFilterDate }) => {
  const selectRef = useRef();
  const selectRef1 = useRef();
  const selectRef2 = useRef();
  const selectRef3 = useRef();
  const selectRef4 = useRef();

  const validate = Yup.object({
    zone_code: Yup.string(),
    state_code: Yup.string(),
    area_code: Yup.string(),
    cluster_code: Yup.string(),
    branch_code: Yup.string(),
    application_id: Yup.string(),
  });

  const initialStatusCreation = {
    loading: true,
    zonedata: [],
    stateData: [],
    areaData: [],
    clusterData: [],
    branchData: [],
  };
  const [
    { loading, zonedata, stateData, areaData, clusterData, branchData },
    setStateCreation,
  ] = useState(initialStatusCreation);

  const getAllStateValues = async () => {
    const response = await getAllStatelocation();
    if (response?.status === 200)
      if (response?.data?.results) {
        setStateCreation((prevState) => ({
          ...prevState,
          loading: false,
          stateData: response?.data?.results,
        }));
      } else {
        return;
      }
  };

  const getAllZoneValues = async () => {
    const response = await getAllZonelocation();
    if (response?.status === 200)
      if (response?.data?.results) {
        setStateCreation((prevState) => ({
          ...prevState,
          loading: false,
          zonedata: response?.data?.results,
        }));
      } else {
        return;
      }
  };
  const getAllAreaValues = async () => {
    const response = await getAllArealocation();
    if (response?.status === 200)
      if (response?.data?.results) {
        setStateCreation((prevState) => ({
          ...prevState,
          loading: false,
          areaData: response?.data?.results,
        }));
      } else {
        return;
      }
  };
  const getAllClusterValues = async () => {
    const response = await getAllClusterlocation();
    if (response?.status === 200)
      if (response?.data?.results) {
        setStateCreation((prevState) => ({
          ...prevState,
          loading: false,
          clusterData: response?.data?.results,
        }));
      } else {
        return;
      }
  };
  const getAllBranchValues = async () => {
    const response = await getAllBranchlocation();
    if (response?.status === 200)
      if (response?.data?.results) {
        setStateCreation((prevState) => ({
          ...prevState,
          loading: false,
          branchData: response?.data?.results,
        }));
      } else {
        return;
      }
  };
  const zone = zonedata.map((item) => {
    return { value: item.code, label: item.name };
  });
  const state = stateData.map((item) => {
    return { value: item.code, label: item.name };
  });
  const area = areaData.map((item) => {
    return { value: item.code, label: item.name };
  });
  const cluster = clusterData.map((item) => {
    return { value: item.code, label: item.name };
  });
  const branch = branchData.map((item) => {
    return { value: item.code, label: item.name };
  });

  useEffect(() => {
    getAllStateValues();
    getAllZoneValues();
    getAllAreaValues();
    getAllClusterValues();
    getAllBranchValues();
  }, []);

  return (
    <Formik
      initialValues={{
        zone_code: "",
        state_code: "",
        area_code: "",
        cluster_code: "",
        branch_code: "",
        application_id: "",
      }}
      validationSchema={validate}
      onSubmit={(values, { resetForm }) => {
        handlerSubmitFilterDate(values);
        selectRef.current.select.clearValue();
        selectRef1.current.select.clearValue();
        selectRef2.current.select.clearValue();
        selectRef3.current.select.clearValue();
        selectRef4.current.select.clearValue();
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
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      name="zone_code"
                      options={zone}
                      placeholder="Select region"
                      isClearable={true}
                      onChange={(option) => {
                        if (option) {
                          setFieldValue("zone_code", option.value);
                        } else {
                          setFieldValue("zone_code", "");
                        }
                      }}
                      ref={selectRef}
                      onBlur={handleBlur}
                    />
                  </Col>
                  <Col className="mb-1" md="4" sm="12">
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      name="state_code"
                      options={state}
                      isClearable={true}
                      placeholder="Select State"
                      onChange={(option) => {
                        if (option) {
                          setFieldValue("state_code", option.value);
                        } else {
                          setFieldValue("state_code", "");
                        }
                      }}
                      onBlur={handleBlur}
                      ref={selectRef1}
                    />
                  </Col>
                  <Col className="mb-1" md="4" sm="12">
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      name="area_code"
                      options={area}
                      isClearable={true}
                      placeholder="Select Area"
                      onChange={(option) => {
                        if (option) {
                          setFieldValue("area_code", option.value);
                        } else {
                          setFieldValue("area_code", "");
                        }
                      }}
                      onBlur={handleBlur}
                      ref={selectRef2}
                    />
                  </Col>
                  <Col className="mb-1" md="4" sm="12">
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      name="cluster_code"
                      options={cluster}
                      isClearable={true}
                      placeholder="Select Cluster"
                      onChange={(option) => {
                        if (option) {
                          setFieldValue("cluster_code", option.value);
                        } else {
                          setFieldValue("cluster_code", "");
                        }
                      }}
                      ref={selectRef3}
                      onBlur={handleBlur}
                    />
                  </Col>
                  <Col className="mb-1" md="4" sm="12">
                    <Select
                      className="react-select"
                      classNamePrefix="select"
                      name="branch_code"
                      options={branch}
                      isClearable={true}
                      value={branch.value}
                      placeholder="Select Branch"
                      onChange={(option) => {
                        if (option) {
                          setFieldValue("branch_code", option.value);
                        } else {
                          setFieldValue("branch_code", "");
                        }
                      }}
                      onBlur={handleBlur}
                      ref={selectRef4}
                    />
                  </Col>
                  <Col className="mb-1" md="4" sm="12">
                    <TextField
                      type="text"
                      // id="basicInput"
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

export default CustomersFilter;
