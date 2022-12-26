import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import React from "react";
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
} from "reactstrap";
import Select from "react-select";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const columns = [
  {
    dataField: "customer_id",
    text: "Customer ID",
    sort: true,
    formatter: (cell, row) => <Link to={`/customer/${cell}`}> {cell} </Link>,
  },
  {
    dataField: "customer_name",
    text: "Customer Name",
  },
  {
    dataField: "created_at",
    text: "Date Of Creation",
    sort: true,
  },
  {
    dataField: "partner_customer_id",
    text: "Partner Customer ID",
  },
  {
    dataField: "partner_code",
    text: "Partner Code",
    sort: true,
  },
];
class Customers extends React.Component {
  state = {
    data: null,
    loading: true,
    page: "",
    error: false,
    customerId: "",
    partnerCustomerID: "",
    customerName: "",
    partnerCode: "",
    partnerOptions: "",
    baseURL: process.env.REACT_APP_BASE_URL,
  };
  customerFilterChangeHandler = (event) => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  };

  async componentDidMount() {
    const { data } = await axios.get(
      `${this.state.baseURL}/api/v2/customers/individual`,
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

  partnerSubmitHandler = (event) => {
    event.preventDefault();
    axios({
      method: "Post",
      url: `${this.state.baseURL}/api/v2/customers/individual`,
      data: {
        customer_id: this.state.customerId,
        partner_customer_id: this.state.partnerCustomerID,
        partner_code: this.state.partnerCode,
        customer_name: this.state.customerName,
      },
    }).then((response) => {
      this.setState({
        data: response.data.results,
        customerId: "",
        partnerCustomerID: "",
        customerName: "",
        partnerCode: "",
      });
    });
    this.clearpartnerCodeValue();
  };
  clearpartnerCodeValue = () => {
    this.selectRef.state.value = this.selectRef.props.defaultValue;
  };

  partnerCodeChangeHandler = (partnerLabel) => {
    console.log("selectedOption", partnerLabel);
    this.setState({
      partnerCode: partnerLabel.value,
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
          <Form onSubmit={this.partnerSubmitHandler}>
            <Card className="d-flex justify-content-around align-items-center flex-row">
              <div style={{ width: "200px" }}>
                <Select
                  ref={(ref) => {
                    this.selectRef = ref;
                  }}
                  classNamePrefix="select"
                  options={this.state.partnerOptions}
                  value={this.state.partnerLabel}
                  onChange={this.partnerCodeChangeHandler}
                  placeholder="Search by Partner"
                />
              </div>
              <FormGroup className="form-label-group mt-2">
                <Input
                  type="text"
                  id="SearchByCustomerID"
                  placeholder="Search by Customer ID"
                  name="customerId"
                  value={this.state.customerId}
                  onChange={this.customerFilterChangeHandler}
                />
                <Label for="SearchByCustomerID">Search by Customer ID</Label>
              </FormGroup>
              <FormGroup className="form-label-group mt-2">
                <Input
                  type="text"
                  id="SearchByPartnerCustomerID"
                  placeholder="Search by Partner Customer ID"
                  name="partnerCustomerID"
                  value={this.state.partnerCustomerID}
                  onChange={this.customerFilterChangeHandler}
                />
                <Label for="SearchByPartnerCustomerID">
                  Search by Partner Customer ID
                </Label>
              </FormGroup>
              <FormGroup className="form-label-group mt-2">
                <Input
                  type="text"
                  id="SearchByCustomerName"
                  placeholder="Search by Customer Name"
                  name="customerName"
                  value={this.state.customerName}
                  onChange={this.customerFilterChangeHandler}
                />
                <Label for="SearchByCustomerName">
                  Search by Customer Name
                </Label>
              </FormGroup>
              <Button color="primary">Search</Button>
            </Card>
          </Form>
          <CardHeader>
            <CardTitle>List Of Individual Customers</CardTitle>
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
