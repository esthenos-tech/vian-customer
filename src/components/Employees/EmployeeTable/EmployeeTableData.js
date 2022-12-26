import { Link } from "react-router-dom";
import React from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FaRegTimesCircle, FaRegCheckCircle } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import "./style.css";

export const columns = [
  {
    dataField: "employee_id",
    text: "Id",
  },
  {
    dataField: "name",
    text: "Name",
  },
  {
    dataField: "role",
    text: "Roles",
    classes: "text-uppercase",
  },
  {
    dataField: "email",
    text: "Email",
  },
  {
    dataField: "postal_telephone",
    text: "Phone Number",
    sort: true,
  },
  {
    dataField: "active",
    text: "Active",
    sort: true,
    formatter: (cell, row) => (
      <>
        {row.active ? (
          <div className="d-flex justify-content-center fontSize">
            <FaRegCheckCircle className="active-state-icon" data-tip="Active" />
          </div>
        ) : (
          <div className="d-flex justify-content-center fontSize">
            <FaRegTimesCircle
              className="inactive-state-icon"
              data-tip="Inactive"
            />
          </div>
        )}
        <ReactTooltip />
      </>
    ),
  },
  {
    dataField: "updateEmployee",
    text: "Update",
    sort: true,
    formatter: (cell, row) => (
      <Link
        className="update-icon"
        to={`/organisation/update/${row.employee_id}`}
      >
        <FiEdit className="w-100 d-flex update-icon-box" data-tip="Update" />
      </Link>
    ),
  },
  {
    dataField: "changePassword",
    text: "Change Password",
    sort: true,
    formatter: (cell, row) => (
      <Link to={`/organisation/employee/ChangePassword/${row.employee_id}`}>
        <RiLockPasswordLine
          className="w-100 d-flex password-icon"
          data-tip="Change password"
        />
      </Link>
    ),
  },
];

export const agentColumns = [
  {
    dataField: "user_id",
    text: "Id",
  },
  {
    dataField: "first_name",
    text: "Name",
  },
  {
    dataField: "role",
    text: "Roles",
    classes: "text-uppercase",
  },
  {
    dataField: "email",
    text: "Email",
  },
  {
    dataField: "date_of_birth",
    text: "Date of Birth",
    sort: true,
  },
];
