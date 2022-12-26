import React from "react";
import CollectionAmount from "../ui-elements/cards/statistics/CollectionAmount";
import DisbursedAmount from "../ui-elements/cards/statistics/DisbursedAmount";
import SanctionedAmount from "../ui-elements/cards/statistics/SanctionedAmount";
import AppliedAmount from "../ui-elements/cards/statistics/AppliedAmount";
import ConversionRatio from "../ui-elements/cards/analytics/ConversionRatio";
import DashboardFilter from "./DashboardFilter";
import axios from "axios";
import moment from "moment";
import { Row, Col } from "reactstrap";
import "../../assets/scss/plugins/charts/apex-charts.scss";
import "flatpickr/dist/themes/light.css";
import LoanProductWise from "../ui-elements/cards/statistics/LoanProductWise";
import PartnerTable from "../ui-elements/cards/statistics/PartnerTable";
import CreditScore from "../ui-elements/cards/statistics/CreditScore";
import IncomeChart from "../ui-elements/cards/statistics/IncomeChart";
import GenderChart from "../ui-elements/cards/statistics/GenderChart";
import EducationChart from "../ui-elements/cards/statistics/EducationChart";
import AverageRunningLoan from "../ui-elements/cards/statistics/AverageRunningLoan";
import IncomeToEmi from "../ui-elements/cards/statistics/IncomeToEmi";
import NewChart from "../ui-elements/cards/statistics/NewChart";
import Echart from "../ui-elements/cards/statistics/Echart";
import WelcomeCard from "../ui-elements/cards/statistics/WelcomeCard";
import StatsCard from "../ui-elements/cards/statistics/StatsCard";
import GraphSection from "../ui-elements/cards/statistics/GraphSection";


let $success = "#28C76F",
  $stroke_color = "#b9c3cd";
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
class Dashboard extends React.Component {
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
      sanction,
      applied,
      collection,
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
          <Col lg="12" md="12" sm="12">
           <GraphSection />
          </Col>
          <Col lg="6" md="6" sm="6">
            <WelcomeCard></WelcomeCard>
          </Col>
          <Col lg="6" md="6" sm="6">
            <StatsCard cols={{ xl: "4", sm: "4" }} />
          </Col>
        </Row>
        <Row className="match-height">
          {/* {applied && applied.datewise && applied.datewise.length > 0 ? ( */}
          <Col lg="3" md="6" sm="6">
            <AppliedAmount
              applied={applied}
              customDefaultDate={customDefaultDate}
            />
          </Col>
          {/* ) : null} */}

          {/* {sanction && sanction.datewise && sanction.datewise.length > 0 ? ( */}
          <Col lg="3" md="6" sm="6">
            <SanctionedAmount
              sanction={sanction}
              customDefaultDate={customDefaultDate}
            />
          </Col>
          {/* ) : null} */}

          {/* {disbursement &&
            disbursement.datewise &&
            disbursement.datewise.length > 0 ? ( */}
          <Col lg="3" md="6" sm="6">
            <DisbursedAmount
              disbursement={disbursement}
              customDefaultDate={customDefaultDate}
            />
          </Col>
          {/* ) : null} */}

          {/* {collection &&
            collection.datewise &&
            collection.datewise.length > 0 ? ( */}
          <Col lg="3" md="6" sm="6">
            <CollectionAmount
              collection={collection}
              customDefaultDate={customDefaultDate}
            />
          </Col>
          {/* ) : null} */}
        </Row>
        <Row className="match-height">
          <Col sm="6">
            <IncomeToEmi success={colors.success.main} />
          </Col>
          <Col sm="6">
            <AverageRunningLoan></AverageRunningLoan>
          </Col>
        </Row>
        <Row className="match-height">
          <Col lg="4" md="6" sm="12">
            {/* {disbursement &&
              disbursement.datewise &&
              disbursement.datewise.length > 0 &&
              applied &&
              applied.datewise &&
              applied.datewise.length > 0 ? ( */}
            <Row className="match-height">
              <Col lg="12" md="12" xs="12">
                <CreditScore></CreditScore>
              </Col>
              <Col lg="12" md="12" xs="12" style={{ marginTop: "-20px" }}>
                <IncomeChart></IncomeChart>
              </Col>
              <Col lg="12" md="3" xs="6" style={{ marginTop: "-20px" }}>
                <GenderChart></GenderChart>
              </Col>
              <Col lg="12" md="3" xs="6" style={{ marginTop: "-20px" }}>
                <EducationChart></EducationChart>
              </Col>
            </Row>
            {/* ) : null} */}
          </Col>
          <Col lg="4" md="4" sm="4">
            <ConversionRatio
              strokeColor={$stroke_color}
              success={$success}
              customDefaultDate={customDefaultDate}
              disbursement={disbursement}
              applied={applied}
            />
          </Col>
          <Col lg="4" md="4" sm="4">
            <LoanProductWise colors={colors} trackBgColor={trackBgColor} />
          </Col>
        </Row>
        <Row className="match-height">
          <Col lg="8" md="8" sm="8">
            <NewChart></NewChart>
          </Col>
          <Col lg="4" md="4" sm="4">
            <Echart></Echart>
          </Col>
        </Row>
        <Row className="match-height">
          <Col lg="12" md="12" sm="12">
            <PartnerTable
              colors={colors}
              trackBgColor={trackBgColor}
            ></PartnerTable>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Dashboard;
