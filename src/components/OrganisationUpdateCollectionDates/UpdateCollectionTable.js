import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Card, CardBody, CardTitle } from "reactstrap";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

export const columns = [
  {
    dataField: "id",
    text: "Sr.No",
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return rowIndex + 1;
    },
  },
  {
    dataField: "state_name",
    text: "STATES",
    sort: true,
  },
  {
    dataField: "collection_dates",
    text: "DATES",
  },
];

const { SearchBar } = Search;
const UpdateCollectionTable = (data) => {
  return (
    <Card>
      <CardBody>
        <ToolkitProvider
          keyField="id"
          data={data.collection_dates}
          columns={columns}
          search
        >
          {(props) => (
            <Card>
              <CardBody>
                <CardTitle className="m-0">Update Collection Dates</CardTitle>
                <div className="row">
                  <div className="col-md-12 col-lg-12 p-0">
                    <div className="w-100 d-flex justify-content-end mb-1">
                      <SearchBar
                        placeholder="Type to search..."
                        className="mr-1"
                        {...props.searchProps}
                      />
                    </div>
                    <BootstrapTable
                      bootstrap4
                      keyField="id"
                      {...props.baseProps}
                      hover
                      pagination={paginationFactory({ sizePerPage: 25 })}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          )}
        </ToolkitProvider>
      </CardBody>
    </Card>
  );
};

export default UpdateCollectionTable;
