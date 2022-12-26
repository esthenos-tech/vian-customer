import React, { Fragment, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Alert, Card, CardBody, CardTitle, Spinner } from "reactstrap";
import paginationFactory from "react-bootstrap-table2-paginator";
import { breColumnsAndAction } from "./tableData";
import Button from "react-bootstrap/Button";
import { BreActionModalContainer } from "./BreActionModalContainer";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { deletePerticularBRERule } from "../dataLayer/BreRules";
import VianTableComponent from "../VianTableComponent";

const { SearchBar } = Search;
const BreContainer = ({
  category_hardcoded_rules,
  commoncategoryDropDown,
  perticularDataSet,
  handleBreFormData,
  loading2,
  catogeryID,
  catogeryNameText,
  updateBreTableData,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [breTwlDetails, setBreTwlDetails] = useState("");
  const [actionType, setActionType] = useState("add");
  const tableName = ["Hardcoded rules for", catogeryNameText].join(" - ");
  const handlerShowModal = (data, type) => {
    setModalShow(true);
    setActionType(type);
    if (type === "edit" || type === "delete") {
      setBreTwlDetails(data);
      return;
    }
  };

  const modalHeaderTitle = (type) => {
    if (type === "edit") {
      return "Edit rule";
    }
    if (type === "delete") {
      return "Confirm your choice..";
    }
    return "Add rule";
  };

  const submitDeleteForm = async (breTwlDetails) => {
    const ruleId = breTwlDetails.rule_id;
    const response = await deletePerticularBRERule(catogeryID, ruleId);
    toast.success(response?.data.message);
    updateBreTableData();
    setModalShow(false);
    return response;
  };
  const showModalDataAfterSubmit = () => {
    debugger;
    setModalShow(false);
  };

  return (
    <div>
      <ToolkitProvider
        keyField="rule_id"
        data={perticularDataSet}
        columns={breColumnsAndAction(handlerShowModal)}
        search
      >
        {(props) => (
          <Card>
            <CardBody>
              <div className="d-flex justify-content-end">
                <Modal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  backdrop="static"
                  keyboard={false}
                  aria-labelledby="contained-modal-title-vcenter"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      {modalHeaderTitle(actionType)}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="show-grid">
                    {actionType === "delete" ? (
                      <Fragment>
                        <p> Are you sure want to delete the rule?</p>
                        <Alert color="primary">
                          <h4 className="alert-heading">
                            Rule ID: {breTwlDetails.rule_id}
                          </h4>
                          <div className="alert-body">
                            Application Key: {breTwlDetails.application_key}
                          </div>
                        </Alert>

                        <div className="d-flex justify-content-end">
                          <button
                            className="btn btn-primary"
                            onClick={() => submitDeleteForm(breTwlDetails)}
                          >
                            Confirm
                          </button>
                        </div>
                      </Fragment>
                    ) : (
                      <BreActionModalContainer
                        modaldata={actionType === "edit" ? breTwlDetails : ""}
                        methodAction={actionType === "edit" ? "put" : "post"}
                        buttonNameAction={
                          actionType === "edit" ? "Update Rule" : "Add Rule"
                        }
                        commoncategoryDropDown={commoncategoryDropDown}
                        handleBreFormData={handleBreFormData}
                        catogeryID={catogeryID}
                        showModalDataAfterSubmit={showModalDataAfterSubmit}
                      />
                    )}
                  </Modal.Body>
                  <Modal.Footer></Modal.Footer>
                </Modal>
              </div>
              <CardTitle className="m-0">
                Product Category: {catogeryNameText}
              </CardTitle>
              <div className="row">
                <div className="col-md-12 col-lg-12 p-0">
                  <div className="w-100 d-flex justify-content-end mb-1">
                    <SearchBar
                      placeholder="Type to search..."
                      className="mr-1"
                      {...props.searchProps}
                    />
                    <Button
                      className="btn btn-primary justify-content-end mx-2"
                      onClick={() => handlerShowModal("", "add")}
                    >
                      Add rule
                    </Button>
                    <Button
                      className="btn btn-primary justify-content-end mr-2"
                      onClick={() => {
                        toast.info("This page is unavailabel at the moment...");
                      }}
                    >
                      Settings
                    </Button>
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
      {loading2 ? (
        <div className="text-center" style={{ marginTop: "12rem" }}>
          <Spinner type="grow" color="primary" size="lg" />
        </div>
      ) : (
        <Card>
          <CardBody>
            <VianTableComponent
              options={category_hardcoded_rules}
              keyValue="KEY"
              columns={columns}
              tabletitle={tableName}
            />
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default BreContainer;

const columns = [
  {
    dataField: "key",

    text: "KEY",

    classes: "text-left w-50-cust",
  },

  {
    dataField: "description",

    text: "DESCRIPTION",

    classes: "w-auto",

    sort: true,
  },

  {
    dataField: "min",

    text: "MIN",

    classes: "w-194-cust",

    sort: true,
  },

  {
    dataField: "rule_level",

    text: "RULE LEVEL",

    classes: "w-75-cust",

    sort: true,
  },
];
