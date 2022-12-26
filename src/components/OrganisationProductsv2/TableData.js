import React from "react";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

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
    text: "BUREAU NAME",
  },
];
export const columnAndAction = [
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
      <Link
        style={{ cursor: "pointer" }}
        className="w-100 d-flex update-icon-box update-Icon"
        to={`/organisation/updateproduct/${row.code}`}
      >
        <FiEdit className="w-100 d-flex update-icon-box" data-tip="action" />
      </Link>
    ),
  },
];
