import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, CardBody, Spinner } from "reactstrap";
import {
  generateKitFilterData,
  postGenerateKitData,
} from "../../components/dataLayer/GenerateKit";
import VianTableComponent from "../../components/VianTableComponent";
import CustomFilterWithAppName from "../CustomFilterWithAppName";
import InternalServerError from "../InternalServerError";
import DatePickerComponent from "./DatePickerComponent";

const GenerateKit = () => {
  const initialFilterForm = {
    loading: true,
    data: [],
  };
  const [{ loading, data }, setFilterCreation] = useState(initialFilterForm);
  const initialErrorState = {
    loadingState: false,
    errorData: [],
  };
  const [{ loadingState, errorData }, setErrorControl] = useState(
    initialErrorState
  );

  const handlerSubmitFilterFormDate = async (payload) => {
    const response = await generateKitFilterData(payload);
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
    toast.info("Showing static data...");
  };
  const handlerColumnAction = async (row) => {
    const payload = {
      disburse_date: document.getElementById("activation_date").value,
      application_id: row.applicant_id,
    };
    const response = await postGenerateKitData(payload);
    if (response) {
      console.log("response", response);
    }
  };
  const serverSideColumns = [
    {
      dataField: "applicant_id",
      sort: true,
      name: "APPLICATION ID",
      text: "APPLICATION ID",
      formatter: (cell, row) => (
        <Link to={`/application/form/${row.applicant_id}`}> {cell} </Link>
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
      text: "BRNCH NAME",
    },
    {
      dataField: "rm_name",
      sort: true,
      text: "RM NAME",
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
      dataField: "disburse-date",
      sort: true,
      text: "DISBURSEMENT DATE",
      formatter: (cell, row) => (
        <>
          <DatePickerComponent
            name="activation_date"
            id="activation_date"
            label="Activation Date"
            dateFormat="dd-MM-yyyy"
            placeholderText="Select Date"
            autoComplete="off"
          />
        </>
      ),
    },
    {
      dataField: "action",
      sort: true,
      text: "ACTION",
      formatter: (cell, row) => (
        <>
          <button
            className="btn btn-light"
            onClick={() => handlerColumnAction(row)}
          >
            Action
          </button>
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
                    options={dataSet}
                    keyValue="applicant_id"
                    columns={serverSideColumns}
                    tabletitle=""
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

export default GenerateKit;

const dataSet = [
  {
    applicant_id: "VIAAPP221012000001",
    applicant_name: "Nitin",
    product_name: "KIA Sonet (FOUR_WHEELER)",
    branch_name: "Mankara",
    rm_name: "Mankara RM",
    cm_name: "Mankara CM",
    current_status: "Fees Collection Ready	",
    action: "",
  },
];
