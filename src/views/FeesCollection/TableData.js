import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export const breColumnsAndAction = (callback) => {
  return [
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
      dataField: "action",
      sort: true,
      text: "ACTION",
      formatter: (cell, row) => (
        <>
          <button
            className="btn btn-light"
            onClick={() => handlerColumnAction(row, callback)}
          >
            Action
          </button>
        </>
      ),
    },
  ];
};

const handlerColumnAction = (rowData, callback) => {
  callback(rowData);
};

export const dataSet = [
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
