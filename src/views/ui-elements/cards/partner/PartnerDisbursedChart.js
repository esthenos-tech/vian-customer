// ** Third Party Components
import React, { Component } from "react";
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardSubtitle,
} from "reactstrap";

class PartnerDisbursedChart extends Component {
  render() {
    var partner = {
      es: "Early Salary",
      ud: "UDAAN",
      ziel: "Ziel finance",
      zm: "Zest Money",
      bb: "Black Buck",
      oy: "Oye Fintech",
      ps: "Paysense",
      no: "NOCPL",
      smc: "Smart Coin",
      moc: "Money on Click",
      mv: "Money View",
      kb: "Krazy Bee",
      slice: "Slice Pay",
      lk: "Lending Kart",
      chqbook: "Chqbook",
    };
    var newObj = {};
    const partner_name = [];
    const total_amount = [];
    this.props.disbursement.datewise.forEach(function (obj) {
      var par = obj._id.partner;
      if (partner[par]) {
        par = partner[par];
      }
      if (par in newObj) {
        newObj[par] += obj.total_amount;
      } else {
        newObj[par] = obj.total_amount;
      }
    });
    for (var prop in newObj) {
      partner_name.push(prop);
      total_amount.push(newObj[prop]);
    }
    const donutColors = {
      series1: "#3194f5",
      series2: "#57d8f7",
      series3: "#8d9996",
      series4: "#31e088",
      series5: "#c899f7",
      series6: "#f2f266",
      series7: "#f7b768",
      series8: "#fc9595",
      series9: "#8693bf",
      series10: "#a9bd84",
      series11: "#f57c5d",
      series12: "#e3a74d",
      series13: "#75d674",
      series14: "#238ffc",
      series15: "#ff6161",
    };

    // ** Chart Options
    const options = {
      legend: {
        show: true,
        position: "bottom",
      },
      labels: partner_name,

      colors: [
        donutColors.series1,
        donutColors.series5,
        donutColors.series3,
        donutColors.series2,
        donutColors.series4,
        donutColors.series6,
        donutColors.series7,
        donutColors.series8,
        donutColors.series9,
        donutColors.series10,
        donutColors.series11,
        donutColors.series12,
        donutColors.series13,
        donutColors.series14,
        donutColors.series15,
      ],
      dataLabels: {
        enabled: true,
        formatter(val) {
          return `${parseInt(val)}%`;
        },
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                fontSize: "2rem",
                fontFamily: "Montserrat",
              },
              value: {
                fontSize: "1rem",
                fontFamily: "Montserrat",
                formatter(val) {
                  return `₹ ${parseInt(val)}`;
                },
              },
              total: {
                show: true,
                fontSize: "1.2rem",
                colors: "#000000",
                label: "₹" + " " + this.props.disbursement.total_amount,
                formatter() {
                  return "";
                },
              },
            },
          },
        },
      },
      responsive: [
        {
          breakpoint: 992,
          options: {
            chart: {
              height: 380,
            },
            legend: {
              position: "bottom",
            },
          },
        },
        {
          breakpoint: 576,
          options: {
            chart: {
              height: 320,
            },
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                    name: {
                      fontSize: "1.5rem",
                    },
                    value: {
                      fontSize: "1rem",
                    },
                    total: {
                      fontSize: "1.5rem",
                    },
                  },
                },
              },
            },
          },
        },
      ],
    };

    // ** Chart Series
    const series = total_amount;

    return (
      <Card>
        <CardHeader>
          <div>
            <CardTitle className="mb-75" tag="h4">
              Partner Wise Disbursement
            </CardTitle>
          </div>
        </CardHeader>
        <CardBody>
          <Chart options={options} series={series} type="donut" height={350} />
        </CardBody>
      </Card>
    );
  }
}

export default PartnerDisbursedChart;
