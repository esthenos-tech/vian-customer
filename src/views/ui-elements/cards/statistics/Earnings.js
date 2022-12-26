// ** Third Party Components
import Chart from "react-apexcharts";
import React from "react";
// ** Reactstrap Imports
import { Card, CardTitle, CardText, CardBody, Row, Col } from "reactstrap";

const Earnings = ({ success }) => {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: { show: false },
    comparedResult: [2, -3, 8],
    labels: ["650-", "650-700", "700+"],
    stroke: { width: 0 },
    colors: ["#28c76f66", "#28c76f33", success],
    grid: {
      padding: {
        right: -20,
        bottom: -8,
        left: -20,
      },
    },
    plotOptions: {
      pie: {
        startAngle: -10,
        donut: {
          labels: {
            show: true,
            name: {
              offsetY: 15,
            },
            value: {
              offsetY: -15,
              formatter(val) {
                return `${parseInt(val)} %`;
              },
            },
            total: {
              show: true,
              offsetY: 15,
              label: "700+",
              formatter() {
                return "45%";
              },
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 1325,
        options: {
          chart: {
            height: 100,
          },
        },
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 120,
          },
        },
      },
      {
        breakpoint: 1065,
        options: {
          chart: {
            height: 100,
          },
        },
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 120,
          },
        },
      },
    ],
  };

  return (
    <Card className="earnings-card">
      <CardBody>
        <Row>
          <Col xs="6">
            <CardTitle className="mb-1">Gender Wise Stats</CardTitle>
            <div className="font-small-2">This Month</div>
            <h5 className="mb-1">₹4055.56</h5>
            <CardText className="text-muted font-small-2">
              <h5 className="mb-1">68.2%</h5>
              <span className="fw-bolder"></span>
              <span> more borrower than last month.</span>
            </CardText>
          </Col>
          <Col xs="12" style={{ padding: "1px" }}>
            <CardTitle className="mb-1"></CardTitle>
            <h6 className="pl-1"> Credit Score</h6>
            <div className="font-small-2">This Month</div>
            <h5 className="mb-1">₹4055.56</h5>
            <CardText className="text-muted font-small-2">
              <h5 className="mb-1">68.2%</h5>
              <span className="fw-bolder"></span>
              <span> more borrower than last month.</span>
            </CardText>
            <Chart
              options={options}
              series={[30, 53, 45]}
              type="donut"
              height={120}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Earnings;
