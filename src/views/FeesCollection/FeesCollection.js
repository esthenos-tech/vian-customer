import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardTitle } from "reactstrap";
import {
  feesCollectionData,
  submitFeesCollectionData,
} from "../../components/dataLayer/FeesCollection";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import CustomFilterWithAppName from "../CustomFilterWithAppName";
import InternalServerError from "../../views/InternalServerError";
import { Modal } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { breColumnsAndAction, dataSet } from "./TableData";
import FeesCollectionForm from "./Filters/FeesCollectionForm";

const FeesCollection = () => {
  //table contents
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
  const { SearchBar } = Search;

  //================================

  const initialFilterForm = {
    errorLoading: true,
    errorResponse: "",
    loading: true,
    data: [],
  };
  const [
    { loading, data, errorLoading, errorResponse },
    setFilterCreation,
  ] = useState(initialFilterForm);

  const handlerSubmitFilterFormDate = async (payload) => {
    const response = await feesCollectionData(payload);
    if (response?.response.status === 500)
      setFilterCreation((prevState) => ({
        ...prevState,
        errorLoading: false,
        errorResponse: response?.response?.data,
      }));
    toast.error("Data not present");
  };
  const [modalShow, setModalShow] = useState(false);

  const [applicant_id, setApplicant_id] = useState("");

  const handlerShowModal = (data, type) => {
    setApplicant_id(data.applicant_id);
    setModalShow(true);
  };
  const handleFormData = async (payload) => {
    const response = await submitFeesCollectionData(payload);
    setModalShow(false);
    if (response.response.status === 500)
      setFilterCreation((prevState) => ({
        ...prevState,
        errorLoading: false,
        errorResponse: response?.response?.data,
      }));
  };
  useEffect(() => {
    handlerSubmitFilterFormDate();
  }, []);
  return (
    <div>
      {errorLoading ? (
        <>
          <CustomFilterWithAppName
            handlerSubmitFilterDate={handlerSubmitFilterFormDate}
          />

          <ToolkitProvider
            bootstrap4
            keyField="applicant_id"
            data={dataSet}
            columns={breColumnsAndAction(handlerShowModal)}
            search
          >
            {(props) => (
              <Card>
                <CardBody>
                  <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    backdrop="static"
                    keyboard={false}
                    aria-labelledby="contained-modal-title-vcenter"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter">
                        Fees Collection
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="show-grid">
                      <Fragment>
                        <FeesCollectionForm
                          applicant_id={applicant_id}
                          handleFormData={handleFormData}
                        />
                      </Fragment>
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                  </Modal>
                  <div className="row">
                    <div className="col d-flex justify-content-start ml-2 align-items-center">
                      <CardTitle className="m-0">Individual Category</CardTitle>
                    </div>
                    <div className="col d-flex justify-content-end">
                      <SearchBar {...props.searchProps} />
                    </div>
                  </div>
                  <hr />
                  <BootstrapTable
                    wrapperClasses="table-responsive" // This is the style provided by bootstrap 4, this will set the parent div with that class
                    defaultSorted={defaultSorted}
                    pagination={pagination}
                    {...props.baseProps}
                    hover
                  />
                </CardBody>
              </Card>
            )}
          </ToolkitProvider>
        </>
      ) : (
        <>
          <InternalServerError content={errorResponse} />
        </>
      )}
    </div>
  );
};

export default FeesCollection;
