import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import ReactApexChart from "react-apexcharts";

class PartnerCreatedChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
          data: [
            {
              x: "Andhra Pradesh",
              y: "123",
            },
            {
              x: "Arunachal Pradesh",
              y: "133",
            },
            {
              x: "Assam",
              y: "223",
            },
            {
              x: "Chhattisgarh",
              y: "173",
            },
            {
              x: "Goa",
              y: "183",
            },
            {
              x: "Gujrat",
              y: "231",
            },
            {
              x: "Himachal Pradesh",
              y: "89",
            },
            {
              x: "Jammu and Kashmir",
              y: "67",
            },
            {
              x: "Jharkhand",
              y: "167",
            },
            {
              x: "Karnataka",
              y: "256",
            },
            {
              x: "Kerala",
              y: "345",
            },
            {
              x: "Madhya Pradesh",
              y: "348",
            },
            {
              x: "Maharashtra",
              y: "290",
            },
            {
              x: "Manipur",
              y: "43",
            },
            {
              x: "Meghalaya",
              y: "76",
            },
            {
              x: "Mizoram",
              y: "456",
            },
            {
              x: "Nagaland",
              y: "24",
            },
            {
              x: "Odisha",
              y: "10",
            },
            {
              x: "Sikkim",
              y: "567",
            },
            {
              x: "Punjab",
              y: "234",
            },
            {
              x: "Tamil Nadu",
              y: "378",
            },
            {
              x: "Rajasthan",
              y: "678",
            },
            {
              x: "Chandigarh",
              y: "187",
            },
            {
              x: "Delhi",
              y: "678",
            },
            {
              x: "Lakshadweep",
              y: "278",
            },
            {
              x: "Puducherry",
              y: "12",
            },
          ],
        },
      ],
      options: {
        legend: {
          show: false,
        },
        chart: {
          height: 350,
          type: "treemap",
        },
        colors: [
          "#3194f5",
          "#57d8f7",
          "#8d9996",
          "#31e088",
          "#c899f7",
          "#f2f266",
          "#f7b768",
          "#fc9595",
          "#8693bf",
          "#a9bd84",
          "#f57c5d",
          "#e3a74d",
          "#75d674",
          "#238ffc",
          "#ff6161",
          "#a3a3c2",
          "#56c765",
        ],
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false,
          },
        },
      },
    };
  }

  render() {
    // var partner = {
    //     "es": "Early Salary",
    //     "ud": "UDAAN",
    //     "ziel": "Ziel finance",
    //     "zm": "Zest Money",
    //     "bb": "Black Buck",
    //     "oy": "Oye Fintech",
    //     "ps": "Paysense",
    //     "no": "NOCPL",
    //     "smc": "Smart Coin",
    //     "moc": "Money on Click",
    //     "mv": "Money View",
    //     "kb": "Krazy Bee",
    //     "slice": "Slice Pay",
    //     "lk": "Lending Kart",
    //     "chqbook": "Chqbook"
    // }
    // var newObj = {};
    // this.props.partner_created.datewise.forEach(function (obj) {
    //     var par = obj._id.partner
    //     if (partner[par]) {
    //         par = partner[par]
    //     }
    //     if (par in newObj) {
    //         newObj[par] += obj.total_amount;
    //     } else {
    //         newObj[par] = obj.total_amount;
    //     }
    // });
    // const partner_wise_data = Object.entries(newObj).map(([k, v]) => ({ x: k, y: v }));
    // const data = [
    //     {
    //         data: partner_wise_data
    //     }
    // ]

    return (
      <Card>
        <CardHeader>
          <CardTitle>State Wise Applied Applications</CardTitle>
        </CardHeader>
        <CardBody>
          <div id="chart">
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="treemap"
              height={350}
            />
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default PartnerCreatedChart;
