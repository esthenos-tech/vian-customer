import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Button } from "reactstrap";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  createFilterFormData,
  getCaptainListDetails,
} from "../../../components/dataLayer/ApplicationLayer";

const UpdateStatusForm = ({
  handleSubmitUpdateData,
  leadId,
  dropDownNames,
  menuPlacementMainDropDown,
  menuPlacementSubDropDown,
}) => {
  console.log("leadId", leadId);
  const [SelectName1, SelectName2, btnName] = dropDownNames;
  const validate = Yup.object({
    branch_code: Yup.string().required("This field is required"),
    agent_id: Yup.string().required("This field is required"),
  });
  const [handleDisabled, setHandleDisabled] = useState(true);

  const selectRef = useRef();
  const selectRef1 = useRef();

  const initialFilterForm = {
    loading: true,
    loading1: false,
    branch_code_data: [],
    agent_code_data: [],
  };

  const [
    { loading, loading1, branch_code_data, agent_code_data },
    setFilterCreation,
  ] = useState(initialFilterForm);

  const handlerSubmitFilterFormDate = async (payload) => {
    const response = await createFilterFormData(payload);
    if (response?.results) {
      setFilterCreation((prevState) => ({
        ...prevState,
        loading: false,
        branch_code_data: response?.results.map((item) => {
          return { value: item.branch_code, label: item.branch_name };
        }),
      }));
    }
  };

  const getRMList = async (payload) => {
    const response = await getCaptainListDetails(payload);
    if (response?.data?.results) {
      setFilterCreation((prevState) => ({
        ...prevState,
        loading1: false,
        agent_code_data: response?.data?.results.map((item) => {
          return { value: item.Agent_id, label: item.Agent_Name };
        }),
      }));
    }
    if (response?.data?.results.length === 0) {
      setHandleDisabled(true);
      toast.warn("No data found");
      selectRef1.current.select.clearValue();
      setFilterCreation((prevState) => ({
        ...prevState,
        loading1: false,
        agent_code_data: [],
      }));
    }
  };

  useEffect(() => {
    handlerSubmitFilterFormDate();
  }, []);

  return (
    <Formik
      initialValues={{
        branch_code: "",
        agent_id: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        handleSubmitUpdateData(values);
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
            <Row>
              <Col className="mb-1" md="5" sm="12">
                <div className=" d-flex justify-content-start align-items-center">
                  <h5>{SelectName1}</h5>
                </div>
                <Select
                  className="react-select "
                  classNamePrefix="select"
                  name="branch_code"
                  options={branch_code_data}
                  isClearable={true}
                  placeholder="Select State"
                  menuPlacement={menuPlacementMainDropDown}
                  isLoading={loading}
                  onChange={(option) => {
                    if (option) {
                      setFieldValue("branch_code", option.value);
                      getRMList(option.value);
                      setHandleDisabled(false);
                    } else {
                      setFieldValue("branch_code", "");
                      setHandleDisabled(true);
                      selectRef1.current.select.clearValue();
                    }
                  }}
                  onBlur={handleBlur}
                  ref={selectRef}
                />
                <ErrorMessage
                  name="branch_code"
                  component="div"
                  style={{
                    color: "red",
                    fontSize: ".8rem",
                    position: "absolute",
                    bottom: "-16px",
                  }}
                />
              </Col>
              <Col className="mb-1" md="5" sm="12">
                <div className=" d-flex justify-content-start align-items-center">
                  <h5>{SelectName2}</h5>
                </div>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  name="agent_id"
                  options={agent_code_data}
                  placeholder="Select State"
                  isDisabled={handleDisabled}
                  isLoading={loading1}
                  menuPlacement={menuPlacementSubDropDown}
                  onChange={(option) => {
                    if (option) {
                      setFieldValue("agent_id", option.value);
                    } else {
                      setFieldValue("agent_id", "");
                    }
                  }}
                  onBlur={handleBlur}
                  ref={selectRef1}
                />
                <ErrorMessage
                  name="agent_id"
                  component="div"
                  style={{
                    color: "red",
                    fontSize: ".8rem",
                    position: "absolute",
                    bottom: "-16px",
                  }}
                />
              </Col>
              <Col md="2" sm="12" className=" d-flex align-items-center">
                <Button color="primary" type="submit">
                  {btnName}
                </Button>
              </Col>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UpdateStatusForm;
