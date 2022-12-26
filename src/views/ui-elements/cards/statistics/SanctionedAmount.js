import React from "react";
import StatisticsCard from "../../../../components/StatisticsCard/StatisticsCard";
import { CheckCircle } from "react-feather";
import moment from "moment";

class SanctionedAmount extends React.Component {
  render() {
    const sanction1 = {
      datewise: [
        {
          _id: {
            sanction_date: "2022-06-07",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 25678,
          total_loans: 23,
        },
        {
          _id: {
            sanction_date: "2022-06-08",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 3578,
          total_loans: 13,
        },
        {
          _id: {
            sanction_date: "2022-06-09",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 765467,
          total_loans: 13,
        },
        {
          _id: {
            sanction_date: "2022-06-10",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 5878,
          total_loans: 13,
        },
        {
          _id: {
            sanction_date: "2022-06-11",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 295878,
          total_loans: 13,
        },
        {
          _id: {
            sanction_date: "2022-06-12",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 52878,
          total_loans: 13,
        },
        {
          _id: {
            sanction_date: "2022-06-13",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 42678,
          total_loans: 13,
        },
        {
          _id: {
            sanction_date: "2022-06-14",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 21678,
          total_loans: 13,
        },
        {
          _id: {
            sanction_date: "2022-06-15",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 454678,
          total_loans: 13,
        },
        {
          _id: {
            sanction_date: "2022-06-16",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 5178,
          total_loans: 13,
        },
        {
          _id: {
            sanction_date: "2022-06-17",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 315678,
          total_loans: 13,
        },
        {
          _id: {
            sanction_date: "2022-06-18",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 30578,
          total_loans: 13,
        },
        {
          _id: {
            sanction_date: "2022-06-19",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 1764578,
          total_loans: 13,
        },
        {
          _id: {
            sanction_date: "2022-06-20",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 33172,
          total_loans: 13,
        },
      ],
    };
    const customDefaultDate = this.props.customDefaultDate;
    const sanction = sanction1.datewise.filter(
      (dt) =>
        dt["_id"].sanction_date <= customDefaultDate[1] &&
        dt["_id"].sanction_date >= customDefaultDate[0]
    );
    const totalApps = sanction.reduce(
      (total, app) => total + app.total_loans,
      0
    );
    const totalAmount = Math.round(
      sanction.reduce((total, app) => total + app.total_amount, 0)
    ).toLocaleString("en-IN");
    const totalAmountArr = [
      {
        name: "Sanctioned Amount",
        data: sanction.map((amt) => amt.total_amount.toFixed(2)),
      },
    ];
    const sanctionedAmt = {
      chart: {
        id: "sanction",
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true,
        },
      },
      grid: {
        show: false,
      },
      colors: ["#EA5455"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2.5,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0.9,
          opacityFrom: 0.7,
          opacityTo: 0.5,
          stops: [0, 80, 100],
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
        categories: sanction.map((date) =>
          moment(date["_id"]["sanction_date"]).format("DD/MM/YYYY")
        ),
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      tooltip: {
        x: {
          show: true,
        },
        y: [
          {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return `\u20B9` + y.toFixed(2);
              }
              return y;
            },
          },
        ],
      },
    };

    return (
      <StatisticsCard
        icon={<CheckCircle className="danger" size={22} />}
        iconBg="danger"
        stat={`\u20B9${totalAmount}`} // "\u20B9" unicode for indian currency
        statTitle={`Total apps: ${totalApps}`}
        options={sanctionedAmt}
        series={totalAmountArr}
        type="area"
        cardTitle="Sanctioned Amt"
      />
    );
  }
}
export default SanctionedAmount;
