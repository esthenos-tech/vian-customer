import React from "react";
// ** Third Party Components
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import { Card, CardTitle, CardText, CardBody, Row, Col } from "reactstrap";

const FundingSharing = ({ danger }) => {
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
    labels: ["STP", "Deviation", "Third"],
    stroke: { width: 0 },
    colors: ["#f78f8f", "#f7bebe", danger],
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
              label: "",
              formatter() {
                return "33%";
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
          <Col xs="6" className="pr-0" style={{ paddingLeft: "6px" }}>
            <CardTitle className="mb-1">
              Funding
              <br />
              Sharing
            </CardTitle>
            <div className="font-small-2">Average Sharing</div>
            <h5 className="mb-1">₹34873</h5>
            {/* <CardText className='text-muted font-small-2'>
                            <span className='fw-bolder'>68.2%</span>
                            <span> more earnings than last month.</span>
                        </CardText> */}
          </Col>
          <Col xs="6" className="p-0">
            <Chart
              options={options}
              series={[53, 16, 31]}
              type="donut"
              height={120}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default FundingSharing;
