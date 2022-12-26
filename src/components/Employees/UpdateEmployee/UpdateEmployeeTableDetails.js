import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { toast } from "react-toastify";
import { getPerticularEmployeeAccessLocation } from "../../dataLayer/EmployeeLayer";

const UpdateEmployeeTableDetails = ({ propsID }) => {
  const initialFilterForm = {
    loading: true,
    data: [],
  };
  const [{ loading, data }, setFilterCreation] = useState(initialFilterForm);

  const getEmployeeAccessLocation = async (payload) => {
    const response = await getPerticularEmployeeAccessLocation(payload);
    if (
      Array.isArray(response?.data?.results) ||
      (typeof response?.data?.results === "object" &&
        response?.data?.results !== null)
    ) {
      if (response?.data?.results) {
        setFilterCreation((prevState) => ({
          ...prevState,
          loading: false,
          data: response?.data?.results,
        }));
      }
    } else {
      if (response && response?.data) {
        setFilterCreation((pervState) => ({
          ...pervState,
          loading: false,
          data: [],
        }));
        toast.error(response?.data?.message);
      }
    }
  };
  console.log("displayTable", data);

  useEffect(() => {
    getEmployeeAccessLocation(propsID);
  }, [propsID]);

  return (
    <div>
      <hr />
      {loading ? (
        <div className="text-center">
          <Spinner type="grow" color="primary" size="lg" />
        </div>
      ) : (
        <BootstrapTable
          bootstrap4
          keyField="id"
          data={data}
          columns={columns}
          hover
        />
      )}
    </div>
  );
};

export default UpdateEmployeeTableDetails;

const columns = [
  {
    dataField: "id",
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return rowIndex + 1;
    },
    text: "Sr.No",
  },
  {
    dataField: "zones",
    text: "ZONES",
  },
  {
    dataField: "states",
    text: "STATES",
  },
  {
    dataField: "areas",
    text: "AREAS",
  },
  {
    dataField: "clusters",
    text: "CLUSTERS",
  },
  {
    dataField: "branches",
    text: "BRANCHES",
  },
];
