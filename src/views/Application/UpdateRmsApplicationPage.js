import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, CardBody } from "reactstrap";
import {
  getCaptainListDetails,
  getteStatusDropdown,
  putUpdateApplicationAllFormData,
  submitUpdateFormData,
} from "../../components/dataLayer/ApplicationLayer";
import ApplicationForcefullyUpdateCbFailed from "./components/ApplicationForcefullyUpdateCbFailed";
import UpdateAgentRejectApplication from "./components/UpdateAgentRejectApplication";
import UpdateAgent from "./components/UpdateAgent";
import UpdateRegistrationReadyForm from "./components/UpdateRegistrationReadyForm";
import UpdateStatusForm from "./components/UpdateStatusForm";

const UpdateRmsApplicationPage = (props) => {
  const application_id = props.match.params.id;
  const status_Id = props.match.params.st;
  const lablenames = ["Branch Re-assignment", "RM Re-assignment", "Re-Assign"];
  const numbers = [50, 51, 70, 71, 72, 73, 80, 81];
  const RMincludes = [10, 20, 21, 30, 31, 32, 40, 41, 60, 61, 62, 63];
  const handleSubmitUpdateData = async (payloadData) => {
    const payload = {
      ...payloadData,
      update_type: "application_reassignment",
    };
    const response = await submitUpdateFormData(application_id, payload);
    if (response) {
      toast.warn("Technical issue detected");
    }
  };
  const initialstatusCreation = {
    loading: true,
    status: [],
  };
  const [{ loading, status }, setStateCreation] = useState(
    initialstatusCreation
  );
  const initialState = {
    loading: true,
    RmData: [],
  };
  const [{ loading1, RmData }, setState] = useState(initialState);
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
  const getRmDetailsList = async () => {
    const response = await getCaptainListDetails(props.match.params.br);
    if (response && response?.data && response?.data?.results) {
      setState((pervState) => ({
        ...pervState,
        loading1: false,
        RmData: response?.data?.results.map((item) => {
          return { value: item.Agent_id, label: item.Agent_Name };
        }),
      }));
    }
  };

  const handlerSubmitApplicationUpdatePerticularStatus = async (value) => {
    const response = await putUpdateApplicationAllFormData(
      application_id,
      value
    );
    {
      if (response) toast.info(response.results);
    }
    console.log(value);
  };
  const handlerSubmitApplicationUpdateRMStatus = async (value) => {
    const response = await putUpdateApplicationAllFormData(
      application_id,
      value
    );
    {
      if (response) toast.info(response.results);
    }
    console.log(value);
  };
  const handlerSubmitApplicationUpdateCmStatus = async (value) => {
    const response = await putUpdateApplicationAllFormData(
      application_id,
      value
    );
    {
      if (response) toast.info(response.results);
    }
    console.log(value);
  };
  const handlerSubmitApplicationForcefullyCbFailedStatus = async (value) => {
    const response = await putUpdateApplicationAllFormData(
      application_id,
      value
    );
    {
      if (response) toast.info(response.results);
    }
    console.log(value);
  };
  const handlerSubmitRegistrationReady = async (value) => {
    const response = await putUpdateApplicationAllFormData(
      application_id,
      value
    );
    {
      if (response) toast.info(response.results);
    }
    console.log(value);
  };
  const handlerApplicationRejectData = async (value) => {
    const response = await putUpdateApplicationAllFormData(
      application_id,
      value
    );
    {
      if (response) toast.info(response.results);
    }
    console.log(value);
  };

  useEffect(() => {
    getOrganisationstatusDetails();
    getRmDetailsList();
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div className="d-flex justify-content-end mb-2 mr-1">
            <Link to={`/application/${application_id}/update_loan_details`}>
              <button className="btn btn-primary">
                Update Application Details
              </button>
            </Link>
          </div>
          <Card className="p-1 px-5">
            <UpdateAgent
              handlerSubmitApplicationUpdateStatus={
                handlerSubmitApplicationUpdatePerticularStatus
              }
              data={status}
              loading={loading}
              heading="Application Status"
              update_type_Value="application_status"
              placeHolder="Select Status"
              inetialValues={{
                "app-status": "",
              }}
              namedValues="app-status"
            />
          </Card>
        </div>

        {RMincludes.includes(status_Id) ? (
          <div className="col-md-12 col-sm-12">
            <Card className="p-1 px-5">
              <UpdateAgent
                handlerSubmitApplicationUpdateStatus={
                  handlerSubmitApplicationUpdateRMStatus
                }
                data={RmData}
                loading={loading1}
                heading="Reassign RM"
                placeHolder="Select RM"
                update_type_Value="application_reassign_rm"
                inetialValues={{
                  rm_id: "",
                }}
                namedValues="rm_id"
              />
            </Card>
          </div>
        ) : (
          <></>
        )}
        {numbers.includes(status_Id) ? (
          <div className="col-md-12 col-sm-12">
            <Card className="p-1 px-5">
              <UpdateAgent
                handlerSubmitApplicationUpdateStatus={
                  handlerSubmitApplicationUpdateCmStatus
                }
                data={RmData}
                loading1={loading1}
                heading="Reassign CM"
                placeHolder="Select CM"
                update_type_Value="application_reassign_cm"
                inetialValues={{
                  cm_id: "",
                }}
                namedValues="cm_id"
              />
            </Card>
          </div>
        ) : (
          <></>
        )}
        {status_Id === 32 ? (
          <div className="col-md-12 col-sm-12">
            <Card className="p-1 px-5">
              <ApplicationForcefullyUpdateCbFailed
                handlerSubmitApplicationUpdateStatus={
                  handlerSubmitApplicationForcefullyCbFailedStatus
                }
                placeHolder="Select..."
                textAreaPlaceHolder="Give personal reason..."
                texthead="Application Forcefully Update CB Failed"
                update_type_Value="application_forcefully_update_cb_failed"
                inetialValues={{
                  update_reason: "",
                  other_reason: "",
                }}
              />
            </Card>
          </div>
        ) : (
          <></>
        )}
        {status_Id > 61 ? (
          <div className="col-md-12 col-sm-12">
            <Card className="p-1 px-5">
              <UpdateRegistrationReadyForm
                handlerSubmitRegistrationReady={handlerSubmitRegistrationReady}
                update_type="registration_ready_reflow"
                inetialValues={{
                  cm_comments: "",
                }}
              />
            </Card>
          </div>
        ) : (
          <></>
        )}
        {status_Id < 130 ? (
          <div className="col-md-12 col-sm-12">
            <Card className="p-1 px-5">
              <UpdateAgentRejectApplication
                handlerApplicationRejectData={handlerApplicationRejectData}
                texthead="Reject Application"
                placeHolder="Please select the Reason for Rejection"
                btnName="Reject"
                update_type="application_rejection"
                inetialValues={{
                  rejection_remark: "",
                  rejection_comments: "",
                }}
              />
            </Card>
          </div>
        ) : (
          <></>
        )}
      </div>
      <hr className="p-0 m-0 mb-1" />
      <Card className="row">
        <CardBody className="col-12">
          <UpdateStatusForm
            application_id={application_id}
            handleSubmitUpdateData={handleSubmitUpdateData}
            dropDownNames={lablenames}
            menuPlacementMainDropDown="auto"
            menuPlacementSubDropDown="top"
          />
        </CardBody>
      </Card>
    </>
  );
};

export default withRouter(UpdateRmsApplicationPage);
