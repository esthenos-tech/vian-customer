import React from "react";
import Chart from "react-apexcharts";
import { Card, CardTitle, CardBody, Row, Col } from "reactstrap";

const IncomeToEmi = ({ success }) => {
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
    labels: ["-20k", "20-35k", "35k+"],
    stroke: { width: 0 },
    colors: ["#00FF7F", "#9FE2BF", success],
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
                return "53%";
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
      <CardBody style={{ paddingBottom: "10px" }}>
        <CardTitle> EMI to Income Ratio</CardTitle>
        <Row>
          <Col xs="4">
            <Chart
              options={options}
              series={[53, 16, 31]}
              type="donut"
              height={120}
            />
          </Col>
          <Col xs="8">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">20K -</th>
                  <th scope="col">20-35K</th>
                  <th scope="col">35K +</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>37578</td>
                  <td>82687</td>
                  <td>13222</td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default IncomeToEmi;
