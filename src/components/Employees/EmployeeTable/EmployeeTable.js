import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import paginationFactory from "react-bootstrap-table2-paginator";
import VianTableComponent from "../../VianTableComponent";
// import { columns } from "./EmployeeTableData";

function EmployeeTable({ employeeCreationData, columns, title }) {
  return (
    <div>
      <Card>
        <CardBody>
          <VianTableComponent
            options={employeeCreationData}
            keyValue="employee_id"
            columns={columns}
            tabletitle={title}
          />
        </CardBody>

        {/* <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="row">
            <div className="col-md-12 col-lg-12 p-0">
              <BootstrapTable
                bootstrap4
                keyField="employee_id"
                data={employeeCreationData}
                columns={columns}
                hover
                pagination={paginationFactory({ sizePerPage: 25 })}
              />
            </div>
          </div>
        </CardBody> */}
      </Card>
    </div>
  );
}

export default EmployeeTable;
