import React from "react";
import Chart from "react-apexcharts";
import {
  FcOrganization,
  FcNews,
  FcGraduationCap,
  FcLink,
  FcPositiveDynamic,
} from "react-icons/fc";
import { Row, Col, Card, CardBody, CardTitle, CardHeader } from "reactstrap";

const LoanProductWise = ({ colors, trackBgColor }) => {
  const statesArr = [
    {
      avatar: "",
      title: "Enterprise Loans",
      value: "54.4%",
      icon: <FcOrganization size={32} />,
      chart: {
        type: "radialBar",
        series: [54.4],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15,
            },
          },
          colors: [colors.primary.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: "22%",
              },
              track: {
                background: trackBgColor,
              },
              dataLabels: {
                showOn: "always",
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },
            },
          },
          stroke: {
            lineCap: "round",
          },
        },
      },
    },
    {
      avatar: "",
      title: "Education Loans",
      value: "34.2%",
      icon: <FcGraduationCap size={32} />,
      chart: {
        type: "radialBar",
        series: [34.2],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15,
            },
          },
          colors: [colors.info.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: "22%",
              },
              track: {
                background: trackBgColor,
              },
              dataLabels: {
                showOn: "always",
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },
            },
          },
          stroke: {
            lineCap: "round",
          },
        },
      },
    },
    {
      avatar: "",
      title: "Micro Loans",
      value: "46.1%",
      icon: <FcNews size={32} />,
      chart: {
        type: "radialBar",
        series: [46.1],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15,
            },
          },
          colors: [colors.warning.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: "22%",
              },
              track: {
                background: trackBgColor,
              },
              dataLabels: {
                showOn: "always",
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },
            },
          },
          stroke: {
            lineCap: "round",
          },
        },
      },
    },
    {
      avatar: "",
      title: "Supply Chain Loans",
      value: "68.4%",
      icon: <FcPositiveDynamic size={32} />,
      chart: {
        type: "radialBar",
        series: [68.4],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15,
            },
          },
          colors: [colors.danger.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: "22%",
              },
              track: {
                background: trackBgColor,
              },
              dataLabels: {
                showOn: "always",
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },
            },
          },
          stroke: {
            lineCap: "round",
          },
        },
      },
    },
    {
      avatar: "",
      title: "Two Wheeler Loans",
      value: "74.6%",
      icon: <FcLink size={32} color="#198754" />,
      chart: {
        type: "radialBar",
        series: [74.6],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15,
            },
          },
          colors: [colors.success.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: "22%",
              },
              track: {
                background: trackBgColor,
              },
              dataLabels: {
                showOn: "always",
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },
            },
          },
          stroke: {
            lineCap: "round",
          },
        },
      },
    },
  ];

  const renderStates = () => {
    return statesArr.map((state, index) => {
      return (
        <Row className="match-height" key={index}>
          <Col sm="2 mb-1 pt-1">{state.icon}</Col>
          <Col sm="6 mb-1 pt-2" style={{ paddingRight: "1px" }}>
            <h6>{state.title}</h6>
          </Col>
          <Col sm="2 mb-1 p-0 pt-2 text-right">
            <h6>{state.value}</h6>
          </Col>
          <Col sm="2 mb-1 pt-1">
            <Chart
              options={state.chart.options}
              series={state.chart.series}
              type={state.chart.type}
              height={state.chart.height}
              width={state.chart.width}
            />
          </Col>
        </Row>
      );
    });
  };

  return (
    <Card className="card-browser-states">
      <CardHeader style={{ paddingRight: "10px" }}>
        <div>
          <CardTitle tag="h4">Loan Product Wise Status</CardTitle>
        </div>
      </CardHeader>
      <CardBody>{renderStates()}</CardBody>
    </Card>
  );
};

export default LoanProductWise;
