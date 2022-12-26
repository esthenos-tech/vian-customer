import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import ReactApexChart from "react-apexcharts";

class PartnerDisbursedV2 extends React.Component {
  constructor(props) {
    super(props);
  }

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
    const data = {
      series: total_amount,
      labels: partner_name,
      chart: {
        type: "polarArea",
      },
      stroke: {
        colors: ["#fff"],
      },
      fill: {
        opacity: 0.8,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
    return (
      <Card>
        <CardHeader>
          <CardTitle>Partner Wise Disbursement</CardTitle>
        </CardHeader>
        <CardBody>
          <div id="chart">
            <ReactApexChart
              options={data}
              series={data.series}
              type="polarArea"
            />
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default PartnerDisbursedV2;
