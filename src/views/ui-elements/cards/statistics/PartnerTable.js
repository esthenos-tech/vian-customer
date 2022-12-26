import React from "react";
import { Table, Card } from "reactstrap";
import "./CompanyTable.scss";
import Chart from "react-apexcharts";
import {
  Monitor,
  Coffee,
  Watch,
  TrendingUp,
  TrendingDown,
} from "react-feather";
import { FcOrganization, FcGraduationCap, FcGenealogy } from "react-icons/fc";
import { RiMotorbikeFill } from "react-icons/ri";

const PartnerTable = ({ colors, trackBgColor }) => {
  const data = [
    {
      img: <FcOrganization size={32} />,
      name: "Early Salary",
      email: "meguc@ruj.io",
      icon: <Monitor size={18} />,
      category: "Loan",
      views: "23.4k",
      time: "24 hours",
      revenue: "891.2",
      sales: "68",
      goal: "24.5 Cr",
      ach: "87%",
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
      img: <RiMotorbikeFill size={32} color="#198754" />,
      name: "UDAAN",
      email: "vecav@hodzi.co.uk",
      icon: <Coffee size={18} />,
      category: "Insurance",
      views: "78k",
      time: "2 days",
      revenue: "668.51",
      sales: "97",
      goal: "20.3 Cr",
      salesUp: true,
      ach: "79%",
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
                    label: "20k-",
                    formatter() {
                      return "53%";
                    },
                  },
                },
              },
            },
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
      img: <FcGraduationCap size={32} />,
      name: "Ziel finance",
      email: "davcilse@is.gov",
      icon: <Watch size={18} />,
      category: "Money Transfer",
      views: "162",
      time: "5 days",
      revenue: "522.29",
      sales: "62",
      salesUp: true,
      goal: "17.8 Cr",
      ach: "78%",
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
    {
      img: <FcGenealogy size={32} />,
      name: "Zest Money",
      email: "us@cuhil.gov",
      icon: <Monitor size={18} />,
      category: "Insurance",
      views: "214",
      time: "24 hour",
      revenue: "291.01",
      sales: "88",
      salesUp: true,
      goal: "15.4 Cr",
      ach: "67%",
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
      img: <RiMotorbikeFill size={32} color="#198754" />,
      name: "Black Buck",
      email: "pudais@jife.com",
      icon: <Coffee size={18} />,
      category: "Money Transfer",
      views: "208",
      time: "1 week",
      revenue: "783.93",
      sales: "16",
      goal: "30.1 Cr",
      ach: "73%",
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
  ];

  const renderData = () => {
    return data.map((col) => {
      const IconTag = col.salesUp ? (
        <TrendingUp size={15} className="text-success" />
      ) : (
        <TrendingDown size={15} className="text-danger" />
      );

      return (
        <tr key={col.name}>
          <td>
            <div className="d-flex align-items-center">
              <div>
                <div className="mr-2">{col.img}</div>
              </div>
              <div>
                <div className="fw-bolder">{col.name}</div>
                <div className="font-small-2 text-muted">{col.email}</div>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex align-items-center">
              {/* <Avatar className='me-1'> */}

              {/* </Avatar> */}
              <span>{col.category}</span>
            </div>
          </td>

          <td>{col.goal}</td>
          <td className="text-nowrap">
            <div className="d-flex flex-column">
              <span className="fw-bolder mb-25"> {col.ach}</span>
              <span className="font-small-2 text-muted">in {col.time}</span>
            </div>
          </td>
          <td className="text-nowrap">
            <div className="d-inline-flex pl-2">
              {/* <span className='fw-bolder mb-25'>{col.views}</span> */}
              <Chart
                options={col.chart.options}
                series={col.chart.series}
                type={col.chart.type}
                height={col.chart.height}
                width={col.chart.width}
              />
              <small className="p-1 pt-0">45%</small>
            </div>
          </td>
          <td>₹{col.revenue}</td>
          <td>
            <div className="d-flex align-items-center">
              <span className="fw-bolder me-1 mr-2 ml-1">{col.sales}%</span>
              {IconTag}
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <Card className="card-company-table">
      <Table responsive>
        <thead>
          <tr>
            <th>PARTNER</th>
            <th>CATEGORY </th>
            <th>GOAL</th>
            <th>ACHIEVED</th>
            <th>COLLECTION</th>
            <th>REVENUE</th>
            <th>MOM GROWTH</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </Table>
    </Card>
  );
};

export default PartnerTable;
