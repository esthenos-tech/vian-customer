import React, { Component } from "react";
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Button,
  CardBody,
  CardText,
  Progress,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

class DisbursementChartV2 extends Component {
  render() {
    const data = {
      sessions: 270,
      last_days: ["Last 28 Days", "Last Month", "Last Year"],
      growth: "1910937",
      goal: 100,
      users: 70,
      retention: 90,
      duration: 1,
    };

    const options = {
        chart: {
          sparkline: { enabled: true },
          toolbar: { show: false },
        },
        grid: {
          show: false,
          padding: {
            left: 0,
            right: 0,
          },
        },
        states: {
          hover: {
            filter: "none",
          },
        },
        colors: ["#5ec0db", "#5ec0db", "#5ec0db", "#5ec0db", "#5ec0db"],
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
            borderRadius: [20],
          },
        },
        tooltip: {
          x: { show: false },
        },
        xaxis: {
          type: "numeric",
        },
      },
      series = [
        {
          name: "Disbursement",
          data: [75, 125, 225, 175, 125, 75, 25],
        },
      ];
    return (
      <Card>
        <CardBody>
          <Row className="pb-50">
            <Col
              sm={{ size: 6, order: 1 }}
              xs={{ order: 2 }}
              className="d-flex justify-content-between flex-column mt-lg-0 mt-2"
            >
              <div className="session-info mb-1 mb-lg-0">
                <h2 className="fw-bold mb-25">₹{data.sessions}k</h2>
                <CardText className="fw-bold mb-2">Total Disbursement</CardText>
                <h5 className="font-medium-2">
                  <div className="text-success me-50">₹ {data.growth}</div>
                  <div className="fw-normal">Today's Disbursement</div>
                </h5>
              </div>
              <Button color="primary">Disbursement Details</Button>
            </Col>
            <Col
              sm={{ size: 6, order: 2 }}
              xs={{ order: 1 }}
              className="d-flex justify-content-between flex-column text-end"
            >
              <CardText className="mb-50 p-50 text-right">Last 7 days</CardText>

              <Chart
                options={options}
                series={series}
                type="bar"
                height={200}
              />
            </Col>
          </Row>
          <hr />
          <Row className="pt-50">
            <Col className="mb-2" md="6" sm="12">
              <p className="mb-50">Today's Disbursement: ₹{data.goal}k</p>
              <Progress className=" progress-bar-info mt-25" value="70" />
            </Col>
            <Col className="mb-2" md="6" sm="12">
              <p className="mb-50">Total apps: {data.users}</p>
              <Progress className=" progress-bar-warning mt-25" value="60" />
            </Col>
            <Col md="6" sm="12">
              <p className="mb-50">Retention: {data.retention}%</p>
              <Progress className=" progress-bar-danger mt-25" value="70" />
            </Col>
            <Col md="6" sm="12">
              <p className="mb-50">Duration: {data.duration}yr</p>
              <Progress className=" progress-bar-success mt-25" value="80" />
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default DisbursementChartV2;
