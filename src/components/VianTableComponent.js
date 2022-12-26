import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { CardTitle } from "reactstrap";
import "./VianTableComponent.scss";

const VianTableComponent = ({
  options,
  keyValue,
  tabletitle,
  columns,
  custClass,
}) => {
  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });
  // const leng = options.length;
  // console.log("first", leng);

  const { SearchBar } = Search;
  return (
    <div className={custClass || ""}>
      <ToolkitProvider
        bootstrap4
        keyField={keyValue}
        data={options}
        columns={columns}
        search
      >
        {(props) => (
          <div>
            <div className="row">
              <div className="col d-flex justify-content-start ml-2 align-items-center">
                <CardTitle className="m-0">{tabletitle}</CardTitle>
              </div>
              <div className="col d-flex justify-content-end">
                <SearchBar {...props.searchProps} />
              </div>
            </div>
            <hr />
            <BootstrapTable
              wrapperClasses="table-responsive" // This is the style provided by bootstrap 4, this will set the parent div with that class
              defaultSorted={defaultSorted}
              hover
              pagination={pagination}
              {...props.baseProps}
            />
          </div>
        )}
      </ToolkitProvider>
    </div>
  );
};

export default VianTableComponent;

// usage this component is easy
// import it and use it and pass bellow variables
// <VianTableComponent options={options} keyValue="//some unique key" columns={columns} tabletitle=""/>
