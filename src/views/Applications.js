import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Spinner } from "reactstrap";
import "./Customers.scss";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  CardTitle,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";
import Select from "react-select";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const statusOptions = [
  { value: "", label: "Search by Status" },
  { value: "121", label: "Sanction Pass" },
  { value: "122", label: "Sanction Fail" },
  { value: "123", label: "Sanction Hold" },
  { value: "131", label: "Disbursement Ready" },
  { value: "132", label: "Disbursement Pending" },
  { value: "135", label: "Post Disbursement Data Pending" },
  { value: "133", label: "Disbursement Failed" },
  { value: "200", label: "Active Loan" },
  { value: "250", label: "Loan Close" },
  { value: "300", label: "Loan Cancel" },
];

const columns = [
  {
    dataField: "partner_application_id",
    text: "Partner Application ID",
    sort: true,
    formatter: (cell, row) => (
      <Link to={`/v2/application/${cell}`}> {cell} </Link>
    ),
  },
  {
    dataField: "partner_customer_id",
    text: "Partner Customer ID",
  },
  {
    dataField: "created_at",
    text: "Date Of Creation",
    sort: true,
  },
  {
    dataField: "requested_loan_amount",
    text: "Loan Amount",
    sort: true,
  },
  {
    dataField: "disbursement_time",
    text: "Date Of disbursement ",
  },
  {
    dataField: "current_status",
    text: "Current Status",
  },
  // {
  //     dataField: 'application_id',
  //     text: 'LOG',
  //     formatter: (cell, row) => {
  //         return (
  //             <Link to={`/v2/${cell}/track`}>
  //                 <Button color="primary" size="sm">LOG</Button>
  //             </Link>
  //         )
  //     }
  // }
];
class Customers extends React.Component {
  state = {
    data: null,
    loading: true,
    page: "",
    error: false,
    partnerLabel: "",
    partnerCode: "",
    customerId: "",
    partnerCustomerID: "",
    applicationID: "",
    partnerApplicationID: "",
    statusLabel: "",
    statusCode: "",
    partnerOptions: "",
    baseURL: process.env.REACT_APP_BASE_URL,
  };

  async componentDidMount() {
    const { data } = await axios.get(
      `${this.state.baseURL}/api/v2/applications/individual`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "instance-token": cookies.get("user"),
        },
      }
    );
    this.setState({
      data: data.results,
      loading: false,
      partnerOptions: data.partner_code,
    });
  }

  applicationFilterChangeHandler = (event) => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  };
  applicationFilterSubmitHandler = (event) => {
    event.preventDefault();
    axios({
      method: "Post",
      url: `${this.state.baseURL}/api/v2/applications/individual`,
      data: {
        customer_id: this.state.customerId,
        partner_customer_id: this.state.partnerCustomerID,
        partner_code: this.state.partnerCode,
        application_id: this.state.applicationID,
        partner_application_id: this.state.partnerApplicationID,
        status_code: this.state.statusCode,
      },
    }).then((response) => {
      this.setState({
        data: response.data.results,
        partnerLabel: "",
        partnerCode: "",
        customerId: "",
        partnerCustomerID: "",
        applicationID: "",
        partnerApplicationID: "",
        statusLabel: "",
        statusCode: "",
      });
    });
    this.clearpartnerCodeValue();
    this.clearStatusValue();
  };

  clearpartnerCodeValue = () => {
    this.selectRef.state.value = this.selectRef.props.defaultValue;
  };

  clearStatusValue = () => {
    this.selectStatusRef.state.value = this.selectStatusRef.props.defaultValue;
  };

  partnerCodeChangeHandler = (partnerLabel) => {
    this.setState({
      partnerCode: partnerLabel.value,
      partnerLabel: partnerLabel.label,
    });
  };

  statusCodeChangeHandler = (statusLabel) => {
    this.setState({
      statusCode: statusLabel.value,
      statusLabel: statusLabel.label,
    });
  };

  render() {
    let content;
    if (this.state.loading) {
      content = (
        <div className="text-center" style={{ marginTop: "12rem" }}>
          <Spinner type="grow" color="primary" size="lg" />
        </div>
      );
      return <div>{content}</div>;
    }
    if (!this.state.data) return null;
    return (
      <div>
        <Card>
          <Form onSubmit={this.applicationFilterSubmitHandler}>
            <Card className="p-2">
              <Row>
                <Col md="4" sm="12">
                  <div className="mb-2">
                    <Select
                      ref={(ref) => {
                        this.selectRef = ref;
                      }}
                      classNamePrefix="select"
                      options={this.state.partnerOptions}
                      value={this.state.partnerOptions.value}
                      onChange={this.partnerCodeChangeHandler}
                      placeholder="Search by Partner"
                    />
                  </div>
                  <FormGroup className="form-label-group">
                    <Input
                      type="text"
                      id="SearchByCustomerID"
                      placeholder="Search by Customer ID"
                      name="customerId"
                      value={this.state.customerId}
                      onChange={this.applicationFilterChangeHandler}
                    />
                    <Label for="SearchByCustomerID">
                      Search by Customer ID
                    </Label>
                  </FormGroup>
                </Col>
                <Col md="4" sm="12">
                  <FormGroup className="form-label-group">
                    <Input
                      type="text"
                      id="SearchByPartnerCustomerID"
                      placeholder="Search by Partner Customer ID"
                      name="partnerCustomerID"
                      value={this.state.partnerCustomerID}
                      onChange={this.applicationFilterChangeHandler}
                    />
                    <Label for="SearchByPartnerCustomerID">
                      Search by Partner Customer ID
                    </Label>
                  </FormGroup>
                  <FormGroup className="form-label-group">
                    <Input
                      type="text"
                      id="SearchByApplicationID"
                      placeholder="Search by Application ID"
                      name="applicationID"
                      value={this.state.applicationID}
                      onChange={this.applicationFilterChangeHandler}
                    />
                    <Label for="SearchByApplicationID">
                      Search by Application ID
                    </Label>
                  </FormGroup>
                </Col>
                <Col md="4" sm="12">
                  <FormGroup className="form-label-group">
                    <Input
                      type="text"
                      id="SearchByPartnerApplicationID"
                      placeholder="Search by Partner Application ID"
                      name="partnerApplicationID"
                      value={this.state.partnerApplicationID}
                      onChange={this.applicationFilterChangeHandler}
                    />
                    <Label for="SearchByPartnerApplicationID">
                      Search by Partner Application ID
                    </Label>
                  </FormGroup>
                  <div>
                    <Select
                      ref={(ref) => {
                        this.selectStatusRef = ref;
                      }}
                      classNamePrefix="select"
                      defaultValue={statusOptions[0]}
                      options={statusOptions}
                      value={statusOptions.value}
                      onChange={this.statusCodeChangeHandler}
                    />
                  </div>
                </Col>
                <Col md="4" sm="12">
                  <Button color="primary">Search</Button>
                </Col>
              </Row>
            </Card>
          </Form>
          <CardHeader>
            <CardTitle>List Of Individual Loans</CardTitle>
          </CardHeader>
          <CardBody>
            <BootstrapTable
              bootstrap4
              keyField="id"
              data={this.state.data}
              columns={columns}
              hover
              pagination={paginationFactory({ sizePerPage: 100 })}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Customers;
