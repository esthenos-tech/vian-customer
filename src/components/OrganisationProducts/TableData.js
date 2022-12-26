import React from "react";
import { FiEdit } from "react-icons/fi";

export const columns = [
  {
    dataField: "name",
    text: "	CATEGORY NAME",
    sort: true,
  },
  {
    dataField: "code",
    text: "CATEGORY CODE",
  },
  {
    dataField: "bureau_type",
    text: "Bureau Name",
  },
];
export const columnAndAction = (callback) => {
  return [
    {
      dataField: "name",
      text: "PRODUCT NAME",
      sort: true,
    },
    {
      dataField: "code",
      text: "PRODUCT CODE",
    },
    {
      dataField: "frequency",
      text: "FREQUENCY",
    },
    {
      dataField: "amount",
      text: "AMOUNT (Min - Max)",
    },
    {
      dataField: `interest_rate`,
      text: "INTEREST RATE (Min - Max)",
    },
    {
      dataField: "installment",
      text: "INSTALLMENT (Min - Max)",
    },
    {
      dataField: "tenure",
      text: "TENURE (Min - Max)",
    },
    {
      dataField: "action",
      text: "ACTION",
      formatter: (cell, row) => (
        <FiEdit
          style={{ cursor: "pointer" }}
          className="w-100 d-flex update-icon-box update-Icon"
          data-tip="Update"
          onClick={() => editAction(row, callback)}
        />
      ),
    },
  ];
};

const editAction = (tableRowData, renderCallback) => {
  console.log("Table row data", tableRowData);
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  renderCallback(tableRowData);
};
