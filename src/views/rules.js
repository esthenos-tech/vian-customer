import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import React from "react";
import Select from "react-select";
import axios from "axios";
import "./Rules.scss";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  Table,
} from "reactstrap";
import * as Icon from "react-feather";
class Rules extends React.Component {
  state = {
    partner_code: this.props.location.pathname.split("/")[3],
    data: null,
    cell_value: "",
    selectedOptions: [],
    loading: true,
    page: "",
    error: false,
    baseURL: process.env.REACT_APP_BASE_URL,
    modal: this.props.initialModalState,
    fade: true,
    modal1: this.props.initialModalState,
    fade1: true,
    modal2: this.props.initialModalState,
    fade2: true,
  };

  // Table column data from the response
  columns = [
    {
      dataField: "link",
      text: "#",
      formatter: (cell, row, rowIndex) => <p> {rowIndex + 1} </p>,
    },
    {
      dataField: "rule_type",
      text: "Type",
    },
    {
      dataField: "application_key",
      text: "Key",
    },
    {
      dataField: "rule_value",
      text: "Value",
    },
    {
      dataField: "rule_min",
      text: "Min",
    },
    {
      dataField: "rule_max",
      text: "Max",
    },
    {
      dataField: "description",
      text: "Description",
    },
    {
      dataField: "_id.$oid",
      text: "Action",
      formatter: (cell) => (
        <div>
          <Icon.Edit
            style={{ fontSize: 20, color: "green", cursor: "pointer" }}
          />
          <Icon.Trash
            onClick={this.toggle2}
            data-id={cell}
            className="id"
            style={{
              fontSize: 20,
              color: "red",
              marginLeft: "35%",
              cursor: "pointer",
            }}
          />
        </div>
      ),
    },
  ];

  // Toggle for Add rules Modal
  toggle = this.toggle.bind(this);
  toggle() {
    this.setState({
      modal: !this.state.modal,
      fade: !this.state.fade,
    });
  }

  // Toggle for Edit rules Modal
  toggle1 = this.toggle1.bind(this);
  toggle1() {
    this.setState({
      modal1: !this.state.modal1,
      fade1: !this.state.fade1,
    });
  }

  // Toggle for Delete Confirmation Popup
  toggle2 = this.toggle2.bind(this);
  toggle2(event) {
    const rule_id = event.target.getAttribute("data-id");
    console.log(rule_id);
    this.setState({
      modal2: !this.state.modal2,
      fade2: !this.state.fade2,
      ruleId: rule_id,
    });
  }
  callDeleteApi = (event) => {
    axios
      .delete(
        `${this.state.baseURL}/api/rules/${this.state.partner_code}/rule/${this.state.ruleId}`
      )
      .then((res) => {
        window.location.reload();
      });
  };

  async componentDidMount() {
    const { data } = await axios.get(
      `${this.state.baseURL}/api/rules/${this.state.partner_code}`
    );
    const options = data.results.rule_keys.map((d) => ({
      value: d.application_key,
      label: d.application_key,
    }));
    this.setState({ selectOptions: options });
    this.setState({ data, loading: false });
  }

  handleChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const type_of_rule = event.target.options[selectedIndex].getAttribute(
      "data-type"
    );
    const help_text = event.target.options[selectedIndex].getAttribute(
      "data-helptext"
    );
    const description = event.target.options[selectedIndex].getAttribute(
      "data-description"
    );
    this.setState({
      ruleType: type_of_rule,
      helpText: help_text,
      Description: description,
    });
  };

  render() {
    let content;
    if (this.state.loading) {
      content = (
        <div className="text-center" style={{ marginTop: "12rem" }}>
          <h4>
            <b>Rule not configured for this partner</b>
          </h4>
        </div>
      );
      return <div>{content}</div>;
    }
    var obj = this.state.data.results.handcoded_rules;
    var hancodedRule = [];
    for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue;
      hancodedRule.push(obj[i]);
    }
    if (!this.state.data) return null;
    if (this.state.length == 0) {
      return (
        <div>
          <Card>
            <CardBody>
              <div className="text-center" style={{ marginTop: "12rem" }}>
                <h4>
                  <b>Rule not configured for this partner</b>
                </h4>
              </div>
            </CardBody>
          </Card>
        </div>
      );
    }
    return (
      <div>
        {/* The Card design starts here */}
        <Card>
          <CardHeader>
            <CardTitle>{this.state.data.results.name}</CardTitle>
            <Button
              onClick={this.toggle}
              style={{ float: "right", width: "16%", height: "45px" }}
              color="primary"
            >
              <Icon.Plus style={{ height: "1.4rem" }} />
              Add Rules
            </Button>
          </CardHeader>
          <CardBody>
            <BootstrapTable
              bootstrap4
              keyField="id"
              data={this.state.data.results.rules}
              columns={this.columns}
              hover
              pagination={paginationFactory({ sizePerPage: 100 })}
            />
          </CardBody>
        </Card>
        {/* The Card design ends here */}

        {/* This is the Modal for Adding Rule of the partner starts here*/}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggle} className="bg-primary">
            <b>Add Rules</b>
          </ModalHeader>
          <ModalBody>
            <h5 style={{ textAlign: "center" }}>
              <b>{this.state.data.results.name}</b>
            </h5>
            <Row style={{ width: "100%", marginTop: "6%" }}>
              <Col md="6" style={{ marginTop: "7%" }}>
                <h5>
                  Key
                  <Icon.HelpCircle style={{ marginLeft: "5%" }} />
                </h5>
              </Col>
              <Col md="6" style={{ marginTop: "5%" }}>
                <select
                  className="input_class"
                  id="optionID"
                  onChange={this.handleChange}
                >
                  <option selected disabled>
                    {" "}
                    Select Key
                  </option>
                  {this.state.data.results.rule_keys.map((key) => {
                    return (
                      <option
                        value={key.application_key}
                        data-type={key.rule_type}
                        data-description={key.description}
                        data-helptext={key.help_text}
                      >
                        {key.application_key}
                      </option>
                    );
                  })}
                </select>
              </Col>
            </Row>
            <Row style={{ width: "100%" }}>
              <Col md="6" style={{ marginTop: "7%" }}>
                <h5>Type</h5>
              </Col>
              <Col md="6" style={{ marginTop: "5%" }}>
                <input
                  className="input_class"
                  type="text"
                  value={this.state.ruleType}
                />
              </Col>
            </Row>
            <Row style={{ width: "100%" }}>
              <Col md="12" style={{ marginTop: "7%" }}>
                <h5 className="helptext">
                  <b>{this.state.helpText}</b>
                </h5>
              </Col>
            </Row>
            {(() => {
              if (this.state.ruleType === "drop_down") {
                return (
                  <Row style={{ width: "100%" }} id="drop_down">
                    <Col md="6" style={{ marginTop: "7%" }}>
                      <h5>Mutiple</h5>
                    </Col>
                    <Col md="6" style={{ marginTop: "5%" }}>
                      <input className="input_class" type="text" />
                    </Col>
                  </Row>
                );
              }
            })()}
            {(() => {
              if (this.state.ruleType != "drop_down") {
                return (
                  <Row style={{ width: "100%" }} id="range">
                    <Col md="3" style={{ marginTop: "7%" }}>
                      <h5>Minimim</h5>
                    </Col>
                    <Col md="3" style={{ marginTop: "5%" }}>
                      <input className="input_class" type="text" />
                    </Col>
                    <Col md="3" style={{ marginTop: "7%" }}>
                      <h5>Maximum</h5>
                    </Col>
                    <Col md="3" style={{ marginTop: "5%" }}>
                      <input className="input_class" type="text" />
                    </Col>
                  </Row>
                );
              }
            })()}
            {(() => {
              if (this.state.ruleType === "not_in") {
                return (
                  <Row style={{ width: "100%" }} id="threshold">
                    <Col md="6" style={{ marginTop: "7%" }}>
                      <h5>Value</h5>
                    </Col>
                    <Col md="6" style={{ marginTop: "5%" }}>
                      <input className="input_class" type="text" />
                    </Col>
                  </Row>
                );
              }
            })()}
            <Row style={{ width: "100%" }}>
              <Col md="6" style={{ marginTop: "7%" }}>
                <h5>Description</h5>
              </Col>
              <Col md="6" style={{ marginTop: "5%" }}>
                <input
                  className="input_class"
                  type="textarea"
                  value={this.state.Description}
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success">Add Rule</Button>
            <Button color="danger">Cancel</Button>
          </ModalFooter>
        </Modal>
        {/* Modal Ends Here */}

        {/* This is the Modal for Editing Rule of the partner starts here*/}
        <Modal
          isOpen={this.state.modal1}
          toggle={this.toggle1}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggle1} className="bg-primary">
            <b>Edit Rule</b>
          </ModalHeader>
          <ModalBody>
            <h5 style={{ textAlign: "center" }}>
              <b>{this.state.data.results.name}</b>
            </h5>
            <Row style={{ width: "100%", marginTop: "6%" }}>
              <Col md="6" style={{ marginTop: "7%" }}>
                <h5>
                  Key
                  <Icon.HelpCircle style={{ marginLeft: "5%" }} />
                </h5>
              </Col>
              <Col md="6" style={{ marginTop: "5%" }}>
                <Select options={this.state.selectOptions} />
              </Col>
            </Row>
            <Row style={{ width: "100%" }}>
              <Col md="6" style={{ marginTop: "7%" }}>
                <h5>Type</h5>
              </Col>
              <Col md="6" style={{ marginTop: "5%" }}>
                <input className="input_class" type="text" />
              </Col>
            </Row>
            <Row style={{ width: "100%" }}>
              <Col md="12" style={{ marginTop: "7%" }}>
                <h5>helptext</h5>
              </Col>
            </Row>
            <Row style={{ width: "100%" }}>
              <Col md="6" style={{ marginTop: "7%" }}>
                <h5>Mutiple</h5>
              </Col>
              <Col md="6" style={{ marginTop: "5%" }}>
                <Select
                  isMulti
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </Col>
            </Row>
            <Row style={{ width: "100%" }}>
              <Col md="3" style={{ marginTop: "7%" }}>
                <h5>Minimim</h5>
              </Col>
              <Col md="3" style={{ marginTop: "5%" }}>
                <input className="input_class" type="text" />
              </Col>
              <Col md="3" style={{ marginTop: "7%" }}>
                <h5>Maximum</h5>
              </Col>
              <Col md="3" style={{ marginTop: "5%" }}>
                <input className="input_class" type="text" />
              </Col>
            </Row>
            <Row style={{ width: "100%" }}>
              <Col md="6" style={{ marginTop: "7%" }}>
                <h5>Value</h5>
              </Col>
              <Col md="6" style={{ marginTop: "5%" }}>
                <input className="input_class" type="text" />
              </Col>
            </Row>
            <Row style={{ width: "100%" }}>
              <Col md="6" style={{ marginTop: "7%" }}>
                <h5>Description</h5>
              </Col>
              <Col md="6" style={{ marginTop: "5%" }}>
                <input className="input_class" type="textarea" />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="success">Save Rule</Button>
            <Button color="danger">Cancel</Button>
          </ModalFooter>
        </Modal>
        {/* Modal Ends Here */}

        {/* This is the Modal for deleting Rule starts here*/}
        <Modal
          isOpen={this.state.modal2}
          toggle={this.toggle2}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={this.toggle2} className="bg-primary">
            <b>Delete Rule</b>
          </ModalHeader>
          <ModalBody>
            <h5 style={{ textAlign: "center" }}>
              <b>Are you sure to delete this rule?</b>
            </h5>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.callDeleteApi}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
        {/* Modal Ends Here */}

        {/* Table for showing handcoded rules */}
        {(() => {
          if (!this.state.data.results.handcoded_rules == "") {
            return (
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: "#7367f0" }}>
                    Handcoded Rules For {this.state.data.results.name}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Key</th>
                        <th>Description</th>
                        <th>Min</th>
                        <th>Max</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hancodedRule.map((key, index) => (
                        <tr>
                          <td>{key.key}</td>
                          <td>{key.description}</td>
                          <td>{key.min}</td>
                          <td>{key.max}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            );
          }
        })()}
      </div>
    );
  }
}

export default Rules;
