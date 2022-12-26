import React from "react";
import StatisticsCard from "../../../../components/StatisticsCard/StatisticsCard";
import { TrendingUp } from "react-feather";
import moment from "moment";

class DisbursedAmount extends React.Component {
  render() {
    const disbursement1 = {
      datewise: [
        {
          _id: {
            disbursement_date: "2022-06-11",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 434578,
          total_loans: 13,
        },
        {
          _id: {
            disbursement_date: "2022-06-12",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 434578,
          total_loans: 13,
        },
        {
          _id: {
            disbursement_date: "2022-06-13",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 41678,
          total_loans: 13,
        },
        {
          _id: {
            disbursement_date: "2022-06-14",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 21478,
          total_loans: 13,
        },
        {
          _id: {
            disbursement_date: "2022-06-15",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 444678,
          total_loans: 13,
        },
        {
          _id: {
            disbursement_date: "2022-06-16",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 5178,
          total_loans: 13,
        },
        {
          _id: {
            disbursement_date: "2022-06-17",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 310678,
          total_loans: 13,
        },
        {
          _id: {
            disbursement_date: "2022-06-18",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 30078,
          total_loans: 13,
        },
        {
          _id: {
            disbursement_date: "2022-06-19",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 1744578,
          total_loans: 13,
        },
        {
          _id: {
            disbursement_date: "2022-06-20",
            month: 1,
            partner: "mv",
            year: 2022,
          },
          total_amount: 31172,
          total_loans: 6,
        },
      ],
    };
    const customDefaultDate = this.props.customDefaultDate;
    const disbursement = disbursement1.datewise.filter(
      (dt) =>
        dt["_id"].disbursement_date <= customDefaultDate[1] &&
        dt["_id"].disbursement_date >= customDefaultDate[0]
    );
    const totalApps = disbursement.reduce(
      (total, app) => total + app.total_loans,
      0
    );
    const totalAmount = Math.round(
      disbursement.reduce((total, app) => total + app.total_amount, 0)
    ).toLocaleString("en-IN");
    const totalAmountArr = [
      {
        name: "Disbursed Amount",
        data: disbursement.map((amt) => amt.total_amount.toFixed(2)),
      },
    ];
    const disbursedAmt = {
      chart: {
        id: "disbursement",
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
      colors: ["#28C76F"],
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
        categories: disbursement.map((date) =>
          moment(date["_id"]["disbursement_date"]).format("DD/MM/YYYY")
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
        icon={<TrendingUp className="success" size={22} />}
        iconBg="success"
        stat={`\u20B9${totalAmount}`} // "\u20B9" unicode for indian currency
        statTitle={`Total apps: ${totalApps}`}
        options={disbursedAmt}
        series={totalAmountArr}
        type="area"
        cardTitle="Disbursed Amt"
      />
    );
  }
}
export default DisbursedAmount;
