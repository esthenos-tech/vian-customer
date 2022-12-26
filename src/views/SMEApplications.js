import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Spinner } from "reactstrap";
import "./Customers.scss";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const columns = [
  {
    dataField: "partner_application_id",
    text: "Partner Application ID",
    sort: true,
    formatter: (cell, row) => (
      <Link to={`/v2/application/sme/${cell}`}> {cell} </Link>
    ),
  },
  {
    dataField: "customer_name",
    text: "Customer Name",
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
    dataField: "loan_details.requested_loan_amount",
    text: "Loan Amount",
  },
  {
    dataField: "disbursement_time",
    text: "Date Of disbursement ",
  },
  {
    dataField: "current_status",
    text: "Current Status",
  },
];
class Customers extends React.Component {
  state = {
    data: null,
    loading: true,
    page: "",
    error: false,
    baseURL: process.env.REACT_APP_BASE_URL,
  };

  async componentDidMount() {
    const { data } = await axios.get(
      `${this.state.baseURL}/api/v2/applications/sme`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "instance-token": cookies.get("user"),
        },
      }
    );
    this.setState({ data, loading: false });
    console.log({ data });
  }

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
          {/* <CustomersFilter /> */}
          <CardHeader>
            <CardTitle>List Of SME Loans</CardTitle>
          </CardHeader>
          <CardBody>
            <BootstrapTable
              bootstrap4
              keyField="id"
              data={this.state.data.results}
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
