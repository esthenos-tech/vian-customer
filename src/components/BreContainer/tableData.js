import React from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { Edit, MoreVertical, Trash } from "react-feather";
export const breColumnsAndAction = (callback) => {
  return [
    {
      dataField: "hash",

      text: "Sr.No",

      classes: "text-left w-50-cust",

      formatter: (cell, row, rowIndex, formatExtraData) => {
        return rowIndex + 1;
      },
    },

    {
      dataField: "rule_type",

      text: "TYPE",

      classes: "w-auto",

      sort: true,
    },

    {
      dataField: "application_key",

      text: "KEY",

      classes: "w-194-cust",

      sort: true,
    },

    {
      dataField: "rule_value",

      text: "VALUE",

      classes: "w-75-cust",

      sort: true,
    },
    {
      dataField: "rule_level",

      text: "RULE LEVEL ",

      classes: "last-tab-head text-center w-data-cust",

      sort: true,
    },

    {
      dataField: "rule_min",

      text: "MIN",

      classes: "last-tab-head text-center w-data-cust",

      sort: true,
    },
    {
      dataField: "rule_max",

      text: "MAX ",

      classes: "last-tab-head text-center w-data-cust",

      sort: true,
    },
    {
      dataField: "description",

      text: "DESCRIPTION ",

      classes: "last-tab-head text-left w-data-cust",

      sort: true,
    },
    {
      dataField: "EDIT_DEL",
      text: "Action",
      sort: true,
      formatter: (cell, row) => (
        <>
          <UncontrolledDropdown>
            <DropdownToggle
              className="icon-btn hide-arrow"
              color="transparent"
              size="sm"
              caret
            >
              <MoreVertical size={15} />
            </DropdownToggle>

            <DropdownMenu style={{ padding: "10px" }}>
              <DropdownItem
                onClick={() => handlerColumnAction(row, callback, "edit")}
              >
                <Edit /> Edit
              </DropdownItem>
              <DropdownItem onClick={() => handlerColumnAction(row, callback)}>
                <Trash /> Trash
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </>
      ),
    },
  ];
};

const handlerColumnAction = (rowData, callback, type = "delete") => {
  callback(rowData, type);
};
