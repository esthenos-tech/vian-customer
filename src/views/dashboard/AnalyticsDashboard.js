import React from "react";
import DisbursementChart from "../ui-elements/cards/analytics/DisbursementChart";
import DashboardFilter from "./DashboardFilter";

import axios from "axios";
import moment from "moment";
import { Row, Col } from "reactstrap";
import "../../assets/scss/plugins/charts/apex-charts.scss";
import "flatpickr/dist/themes/light.css";
import RepaymentMode from "../ui-elements/cards/statistics/RepaymentMode";
import PaymentData from "../ui-elements/cards/statistics/PaymentData";
import Rate from "../ui-elements/cards/statistics/Rate";
import Data2 from "../ui-elements/cards/statistics/Data2";
import SMAChart from "../ui-elements/cards/statistics/SMAChart";
import TAT from "../ui-elements/cards/statistics/TAT";
import SalesChart from "../ui-elements/cards/statistics/SalesChart";
import SimpleScatterChart from "../ui-elements/cards/statistics/SimpleScatterChart";
import ScatterDisbursement from "../ui-elements/cards/statistics/ScatterDisbursement";
import IncomeSource from "../ui-elements/cards/statistics/IncomeSource";
import EarningMember from "../ui-elements/cards/statistics/EarningMember";
import CustomerType from "../ui-elements/cards/statistics/CustomeType";
import FundingSharing from "../ui-elements/cards/statistics/FundingSharing";
import FailureReasonChart from "../ui-elements/cards/statistics/FailureReasonChart";

let $primary = "#7367F0",
  $danger_light = "#f29292",
  $label_color = "#e7eef7",
  $line_color = "#ffa51f";
const colors = {
  primary: {
    main: "#1976D2",
  },
  secondary: {
    main: "#424242",
  },
  success: {
    main: "#4CAF50",
  },
  danger: {
    main: "#FF5252",
  },
  warning: {
    main: "#FFC107",
  },
  info: {
    main: "#2196F3",
  },
  dark: {
    main: "#002884",
  },
};

const trackBgColor = "#e9ecef";

class AnalyticsDashboard extends React.Component {
  state = {
    loading: false,
    baseURL: process.env.REACT_APP_BASE_URL,
    disbursement: {},
    sanction: {},
    applied: {},
    collection: {},
    defaultTimeFilter: "seven_days_stats",
    customDefaultDate: [
      moment().subtract(7, "days").format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD"),
    ],
    customDateSelected: false,
  };

  componentDidMount() {
    axios
      .get(`${this.state.baseURL}/api/dashboard`)
      .then((response) => {
        this.setState({
          disbursement: response.data.results.stats.disbursement,
          sanction: response.data.results.stats.sanction,
          applied: response.data.results.stats.submission,
          collection: response.data.results.stats.collection,
        });
        sessionStorage.setItem(
          "user",
          response.data.results.user.first_name +
            " " +
            response.data.results.user.last_name
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  dateChangeHandler = (id, days) => {
    this.setState({
      defaultTimeFilter: id,
      customDefaultDate: [
        moment().subtract(days, "days").format("YYYY-MM-DD"),
        moment().format("YYYY-MM-DD"),
      ],
      customDateSelected: false,
    });
  };

  customDateChangeHandler = (date) => {
    // this.setState({
    //   preloadRange: date,
    // });
    date = date.map((dt) => moment(dt).format("YYYY-MM-DD"));
    if (date.length === 2) {
      this.setState({
        customDefaultDate: date,
        customDateSelected: true,
      });
    }
  };

  render() {
    let {
      disbursement,
      defaultTimeFilter,
      customDefaultDate,
      customDateSelected,
    } = this.state;
    return (
      <React.Fragment>
        <DashboardFilter
          defaultTimeFilter={defaultTimeFilter}
          customDefaultDate={customDefaultDate}
          dateChangeHandler={this.dateChangeHandler}
          customDateChangeHandler={this.customDateChangeHandler}
          customDateSelected={customDateSelected}
        />
        <Row className="match-height">
          <Col lg="3" md="3" sm="3">
            <IncomeSource success={colors.success.main} />
          </Col>
          <Col lg="3" md="3" sm="3">
            <EarningMember warning={colors.warning.main} />
          </Col>
          <Col lg="3" md="3" sm="3">
            <CustomerType primary={colors.primary.main} />
          </Col>
          <Col lg="3" md="3" sm="3">
            <FundingSharing danger={colors.danger.main} />
          </Col>
        </Row>
        <Row className="match-height">
          <Col lg="8" md="6" sm="12">
            {/* {disbursement &&
              disbursement.datewise &&
              disbursement.datewise.length > 0 ? ( */}
            <DisbursementChart
              primary={$primary}
              dangerLight={$danger_light}
              strokeColor={$line_color}
              labelColor={$label_color}
              disbursement={disbursement}
              customDefaultDate={customDefaultDate}
            />
            {/* ) : null} */}
          </Col>

          <Col lg="4" md="4" sm="4">
            <RepaymentMode></RepaymentMode>
          </Col>
        </Row>
        <Row className="match-height">
          <Col lg="4" md="4" sm="4">
            <PaymentData></PaymentData>
          </Col>
          <Col lg="4" md="4" sm="4">
            <Rate></Rate>
          </Col>
          <Col lg="4" md="4" sm="4">
            <SMAChart></SMAChart>
          </Col>
          <Col lg="6" md="6" sm="6">
            <Data2></Data2>
          </Col>
          <Col lg="6" md="6" sm="6">
            <TAT primary={colors.primary.main} danger={colors.danger.main} />
          </Col>
          <Col lg="12" md="12" sm="12">
            <SalesChart></SalesChart>
          </Col>
          <Col lg="12" md="12" sm="12">
            <ScatterDisbursement
              primary={colors.primary.main}
              success={colors.success.main}
              warning={colors.warning.main}
            />
          </Col>
          <Col lg="12" md="12" sm="12">
            <SimpleScatterChart
              primary={colors.primary.main}
              success={colors.success.main}
              warning={colors.warning.main}
            />
          </Col>

          <Col lg="8" md="8" sm="8">
            <FailureReasonChart />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default AnalyticsDashboard;
