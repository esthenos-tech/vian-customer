import React, { useEffect, useState } from "react";
import "./OrganisationFileUpload.scss";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import CustomLayout from "../../components/DragAndDropComponent/CustomLayout";
import { TabHeading } from "../../components/Tabs/TabHeading";
import { CSVDumpAllUrl } from "../../components/urlConfiguration";

import { CSVLink } from "react-csv";
import { FaDownload } from "react-icons/fa";

import {
  getCSVTableDetails,
  getPerticularTableData,
  // postOrganisationSCV,
} from "../../components/dataLayer/OrganisationMaster/index";
import { toast } from "react-toastify";
import VianTableComponent from "../../components/VianTableComponent";
import InternalServerError from "../InternalServerError";

function OrganisationFileUpload() {
  const heading = [
    {
      name: "APK",
      value: "APK",
      label: "APK",
      default: true,
      file_category: ["LEAD_APK", "FOS_APK", "COLLECTION_APK"],
      allowed_file_type: ".apk",
      postUrl: CSVDumpAllUrl("upload/files"),
      getUrl: "getUrl1",
    },
    {
      name: "MASTER_DATA",
      value: "MASTER_DATA",
      label: "MASTER_DATA",
      file_category: ["BANK_MASTER", "CITY_MASTER", "STATE_DISTRICT_MASTER"],
      allowed_file_type: ".csv",
      postUrl: CSVDumpAllUrl("upload/files"),
      getUrl: "getUrl2",
    },
    {
      name: "COLLECTION",
      value: "COLLECTION",
      label: "COLLECTION",
      file_category: [],
      allowed_file_type: ".csv , .gzip",
      postUrl: CSVDumpAllUrl("upload/files"),
      getUrl: "getUrl3",
    },
    {
      name: "SYNC_COLLECTION",
      value: "SYNC_COLLECTION",
      label: "SYNC_COLLECTION",
      file_category: [],
      allowed_file_type: "",
      postUrl: CSVDumpAllUrl("upload/files"),
      getUrl: "getUrl4",
    },
    {
      name: "LEAD",
      value: "LEAD",
      label: "LEAD",
      file_category: [],
      allowed_file_type: ".csv,.zip",
      postUrl: CSVDumpAllUrl("upload/files"),
      getUrl: "getUrl5",
    },
    {
      name: "NEFT",
      value: "NEFT",
      label: "NEFT",
      file_category: [],
      allowed_file_type: ".csv",
      postUrl: CSVDumpAllUrl("upload/files"),
      getUrl: "getUrl6",
    },
    {
      name: "SME",
      value: "SME",
      label: "SME",
      file_category: [],
      allowed_file_type: ".csv",
      postUrl: CSVDumpAllUrl("upload/files"),
      getUrl: "getUrl7",
    },
    {
      name: "DISBURSE_ORIGINATOR_LOANS",
      value: "DISBURSE_ORIGINATOR_LOANS",
      label: "DISBURSE_ORIGINATOR_LOANS",
      file_category: [],
      allowed_file_type: ".csv",
      postUrl: CSVDumpAllUrl("upload/files"),
      getUrl: "getUrl8",
    },
    {
      name: "PROCESS_ORIGINATOR_HOLD_LOANS",
      value: "PROCESS_ORIGINATOR_HOLD_LOANS",
      label: "PROCESS_ORIGINATOR_HOLD_LOANS",
      file_category: [],
      allowed_file_type: ".csv",
      postUrl: CSVDumpAllUrl("upload/files"),
      getUrl: "getUrl9",
    },
    {
      name: "UPLOAD_ORIGINATOR_OFFPLATFORM_LOANS",
      value: "UPLOAD_ORIGINATOR_OFFPLATFORM_LOANS",
      label: "UPLOAD_ORIGINATOR_OFFPLATFORM_LOANS",
      file_category: [],
      allowed_file_type: ".csv",
      postUrl: CSVDumpAllUrl("upload/files"),
      getUrl: "getUrl10",
    },
  ];
  const [activeTab, setActiveTab] = useState({
    name: "APK",
    value: "APK",
    default: true,
    label: "Bank Master",
    file_category: ["LEAD_APK", "FOS_APK", "COLLECTION_APK"],
    allowed_file_type: ".apk",
    postUrl: CSVDumpAllUrl("upload/files"),
    getUrl: "getUrl1",
  });
  const [disableFileUpload, setDisableFileUpload] = useState(true);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [fileUploadPayload, setFileUploadPayload] = useState("");
  const initialState = {
    loading: true,
    dropDownData: [],
    tableDataSet: [],
    errorLoading: false,
    dropDownValues: [],
    errorData: "",
    unauthorized: false,
  };
  const [
    {
      loading,
      dropDownData,
      dropDownValues,
      tableDataSet,
      errorLoading,
      errorData,
      unauthorized,
    },
    setInitialValue,
  ] = useState(initialState);
  const maxFiles = "999";
  const handlerActiveTab = (tab, name, allowed_file_type) => {
    setActiveTab({ tab, name, allowed_file_type });
  };
  const handleDisableFileUpload = (props) => {
    setDisableFileUpload(props);
  };
  const submitSubHeading = (perviousSelectValue, subHeading) => {
    const payloadDataSet = [perviousSelectValue, subHeading];
    const subFileName = subHeading.split("_");
    setSubCategoryName(subFileName.join(" "));
    getOrganisationNeftTableDetails(payloadDataSet);
  };

  const getDropDownData = async () => {
    const response = await getPerticularTableData();
    if (response?.response?.status === 500) {
      setInitialValue((prevState) => ({
        ...prevState,
        loading: false,
        errorLoading: true,
        dropDownData: [],
        errorData: response?.response?.data,
        unauthorized: false,
      }));
    } else if (response?.response?.status === 403) {
      toast.info(response?.response?.data?.message);
      setInitialValue((prevState) => ({
        ...prevState,
        loading: true,
        errorLoading: false,
        dropDownData: [],
        errorData: [],
        unauthorized: true,
      }));
    } else if (response) {
      setInitialValue((prevState) => ({
        ...prevState,
        loading: false,
        errorLoading: false,
        dropDownData: response?.data?.results,
        errorData: [],
        dropDownValues: dropDownData.map((item) => {
          return {
            name: item.filetype,
            value: item.filetype,
            label: item.filetype,
            default: true,
            file_category: item.file_category,
            allowed_file_type: item.allowed_file_type,
            postUrl: CSVDumpAllUrl("upload/files"),
            getUrl: "getUrl1",
          };
        }),
      }));
    }
  };
  console.log("dropDownValues", dropDownValues);

  const getOrganisationNeftTableDetails = async (payload) => {
    setFileUploadPayload(payload);
    const [filetype, file_category] = payload;
    if (file_category === "") setSubCategoryName("");
    const payloadData = {
      file_category: file_category,
      filetype: filetype,
    };
    const response = await getPerticularTableData(payloadData);
    if (response?.response?.data?.message) {
      setInitialValue((prevState) => ({
        ...prevState,
        loading: false,
        tableDataSet: [],
      }));
      toast.info(response?.response.data?.message);
    } else {
      setInitialValue((prevState) => ({
        ...prevState,
        loading: false,
        tableDataSet: response?.data?.results,
      }));
    }
  };
  const tableName = [activeTab.name, subCategoryName].join("-");
  useEffect(() => {
    getDropDownData();
  }, []);

  return (
    <div>
      {errorLoading ? (
        <InternalServerError content={errorData} />
      ) : (
        <>
          {unauthorized ? (
            <>
              <Card className="banner">
                <CardHeader>
                  <CardTitle>Not authorized to access resource</CardTitle>
                </CardHeader>
              </Card>
            </>
          ) : (
            <>
              <Card className="banner">
                <CardHeader>
                  <CardTitle>Upload File</CardTitle>
                </CardHeader>
                <div className="row">
                  <div className="col-5  mt-1 ml-2 pl-3 drop-down-banner-image">
                    <TabHeading
                      heading={heading}
                      loading={loading}
                      activeTab={activeTab}
                      handlerActiveTab={handlerActiveTab}
                      submitSubHeading={submitSubHeading}
                      handleDisableFileUpload={handleDisableFileUpload}
                      getOrganisationNeftTableDetails={
                        getOrganisationNeftTableDetails
                      }
                    />
                  </div>
                  <div className="col-6 p-1 ml-2">
                    <CustomLayout
                      activeTabUploaderPostUrl={activeTab.tab}
                      name={activeTab.name}
                      type={activeTab.allowed_file_type}
                      maxFiles={maxFiles}
                      subCategoryName={subCategoryName}
                      disableFileUpload={disableFileUpload}
                      fileUploadPayload={fileUploadPayload}
                    />
                  </div>
                </div>
              </Card>
              <Card>
                <CardBody>
                  <div className="row">
                    <div className="col-12">
                      <VianTableComponent
                        options={tableDataSet}
                        keyValue="hash"
                        columns={columns}
                        tabletitle={tableName}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default OrganisationFileUpload;

export const columns = [
  {
    dataField: "hash",
    text: "Sr.No",
    classes: "text-left w-50-cust",
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return rowIndex + 1;
    },
  },

  {
    dataField: "file_name",

    text: "FILE NAME",

    classes: "w-auto",

    sort: true,
  },

  {
    dataField: "last_updated",

    text: "LAST UPDATED",

    classes: "w-194-cust",

    sort: true,
  },

  {
    dataField: "status",

    text: "STATUS",

    classes: "w-75-cust",

    sort: true,
  },

  {
    dataField: "invalid_file",

    text: "INVALID CSV",

    classes: "shadow-none width-100-per",

    headerAlign: "center",

    sort: true,

    formatter: (cell, row) => (
      <>
        {row.invalid_file === "" ? (
          <div className="d-flex justify-content-center ">
            <p className="m-0">Not Available</p>
          </div>
        ) : (
          <div className="d-flex justify-content-center">
            <CSVLink>
              <p className="m-0 inValid-card">
                <FaDownload className="download-icon" />
                Download File
              </p>
            </CSVLink>
          </div>
        )}
      </>
    ),
  },

  {
    dataField: "row_count",

    text: "TOTAL DATA IN FILE",

    classes: "last-tab-head text-center w-data-cust",

    sort: true,
  },
];
