import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, CardBody, Spinner } from "reactstrap";
import {
  getDisbursementData,
  postDisbursementData,
} from "../../components/dataLayer/Disbursement";
import VianTableComponent from "../../components/VianTableComponent";
import CustomFilterWithAppName from "../CustomFilterWithAppName";
import InternalServerError from "../InternalServerError";
import ReactTooltip from "react-tooltip";

const Disbursement = () => {
  const initialFilterForm = {
    loading: true,
    data: [],
  };
  const initialErrorState = {
    loadingState: false,
    errorData: [],
  };
  const [{ loadingState, errorData }, setErrorControl] = useState(
    initialErrorState
  );
  const [{ loading, data }, setFilterCreation] = useState(initialFilterForm);

  const handlerSubmitFilterFormDate = async (payload) => {
    const response = await getDisbursementData(payload);

    if (response?.response?.status === 403) {
      toast.info(response?.response?.data?.message);
    }
    if (response?.response?.status === 500)
      setErrorControl((prevState) => ({
        ...prevState,
        loadingState: true,
        errorData: response?.response?.data,
      }));
    if (response?.response?.status === 404)
      toast.info(response?.response?.data?.results);
    setFilterCreation((prevState) => ({
      ...prevState,
      loading: false,
      data: [],
    }));
    if (response?.results) {
      setFilterCreation((prevState) => ({
        ...prevState,
        loading: false,
        data: response?.results,
      }));
    }
  };

  const handleSubmitDisbursementResponce = async (payload) => {
    const response = await postDisbursementData(payload.application_id);
    if (response?.response?.status === 500)
      setErrorControl((prevState) => ({
        ...prevState,
        loadingState: true,
        errorData: response?.response?.data,
      }));
    if (response?.response?.status === 404)
      toast.info(response?.response?.data?.results);
    setFilterCreation((prevState) => ({
      ...prevState,
      loading: false,
      data: [],
    }));
    if (response.results) toast.info(response.results);
  };
  const serverSideColumns = [
    {
      dataField: "application_id",
      sort: true,
      name: "APPLICATION ID",
      text: "APPLICATION ID",
      formatter: (cell, row) => (
        <Link to={`/application/form/${row.application_id}`}> {cell} </Link>
      ),
    },
    {
      dataField: "applicant_name",
      sort: true,
      text: "APPLICANT NAME",
    },
    {
      dataField: "product_name",
      sort: true,
      text: "PRODUCT NAME",
    },
    {
      dataField: "branch_name",
      sort: true,
      text: "BRANCH NAME",
    },
    {
      dataField: "cm_name",
      sort: true,
      text: "CM NAME",
    },
    {
      dataField: "current_status",
      sort: true,
      text: "CURRENT STATUS",
    },
    {
      dataField: "action",
      sort: true,
      text: "Action",
      formatter: (cell, row) => (
        <>
          {row.status === 130 ? (
            <button
              className="btn btn-outline-success"
              onClick={() => handleSubmitDisbursementResponce(row)}
            >
              Disburse
            </button>
          ) : (
            <>
              <span data-tip="Already disbursed...">
                <button className="btn btn-outline-danger" disabled>
                  Disbursed
                </button>
              </span>
              <ReactTooltip />
            </>
          )}
        </>
      ),
    },
  ];

  useEffect(() => {
    handlerSubmitFilterFormDate();
  }, []);
  return (
    <div>
      {loadingState ? (
        <InternalServerError content={errorData} />
      ) : (
        <>
          {loading ? (
            <div className="text-center">
              <Spinner type="grow" color="primary" size="lg" />
            </div>
          ) : (
            <>
              <CustomFilterWithAppName
                handlerSubmitFilterDate={handlerSubmitFilterFormDate}
              />
              <Card>
                <CardBody>
                  <VianTableComponent
                    options={data}
                    keyValue="application_id"
                    columns={serverSideColumns}
                    tabletitle="Disbursement Ready - Individual Category"
                  />
                </CardBody>
              </Card>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Disbursement;
