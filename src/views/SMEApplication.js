import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Col,
  Row,
} from "reactstrap";
import { FaChartBar, FaImage } from "react-icons/fa";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { Eye } from "react-feather";
import "./SMEApplication.scss";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Accordion } from "react-bootstrap";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class IndividualCustomer extends React.Component {
  state = {
    customer_id: this.props.location.pathname.split("/")[4],
    data: null,
    persons: [],
    TabsBasic: "",
    loading: true,
    page: "",
    modal: this.props.initialModalState,
    modal1: this.props.initialModalState,
    fade: true,
    fade1: true,
    error: false,
    baseURL: process.env.REACT_APP_BASE_URL,
    activeTab: "1",
    active: "1",
  };
  toggle = this.toggle.bind(this);
  toggle() {
    this.setState({
      modal: !this.state.modal,
      fade: !this.state.fade,
    });
  }
  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  toggle1 = (tab) => {
    if (this.state.active !== tab) {
      this.setState({ active: tab });
    }
  };

  togglenew = this.togglenew.bind(this);
  togglenew() {
    this.setState({
      modal1: !this.state.modal1,
      fade1: !this.state.fade1,
    });
  }
  async componentDidMount() {
    const { data } = await axios.get(
      `${this.state.baseURL}/api/application/${this.state.customer_id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "instance-token": cookies.get("user"),
        },
      },
      {}
    );
    this.setState({ data });
    const incorp_date = new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
      .format(
        this.state.data.results.customer_details.customer.incorporation_date
          .$date
      )
      .split("/")
      .reverse()
      .join("-")
      .replace(/(\d*)-(\d*)-(\d*)/, "$1-$3-$2");
    const eligibility1 =
      3 *
        this.state.data.results.application_details.funding_calculation
          .monthly_revenue -
      this.state.data.results.application_details.funding_calculation
        .liabilities.total_current_liability;
    const eligibility2 =
      2 *
      this.state.data.results.application_details.funding_calculation
        .monthly_revenue;
    this.setState({
      incorporationDate: incorp_date,
      eligibility_1: eligibility1,
      eligibility_2: eligibility2,
    });
  }

  render() {
    if (!this.state.data) return null;
    return (
      <>
        <div>
          <Card>
            <CardHeader>
              <span
                className="customer__customerName"
                style={{ width: "100%" }}
              >
                {this.state.data.results.customer_details.customer.company_name}{" "}
                <span style={{ float: "right" }}>
                  <span>
                    <Button
                      onClick={this.toggle}
                      style={{ height: "36px" }}
                      color="primary"
                    >
                      {" "}
                      <FaImage></FaImage>&nbsp;&nbsp;Image (
                      {this.state.data.results.customer_kyc_image.length})
                    </Button>
                  </span>
                  &nbsp;&nbsp;
                  <Link to={`/${this.state.customer_id}/track`}>
                    <Button style={{ height: "36px" }} color="primary">
                      {" "}
                      <FaChartBar></FaChartBar>&nbsp;&nbsp;LOG
                    </Button>
                  </Link>
                </span>
              </span>
              <div>
                <Nav tabs>
                  <NavItem style={{ marginLeft: "3%" }}>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "1",
                      })}
                      onClick={() => {
                        this.toggleTab("1");
                      }}
                    >
                      <Eye size={15} />
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </CardHeader>
            <CardBody className="d-flex">
              <Card className="customer__detailsCard1" style={{ flex: "0.96" }}>
                <CardBody className="customer__detailsCardBody">
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.active === "1",
                            })}
                            onClick={() => {
                              this.toggle1("1");
                            }}
                          >
                            <b>Company Details</b>
                          </NavLink>
                        </NavItem>
                        <NavItem style={{ marginLeft: "3%" }}>
                          <NavLink
                            className={classnames({
                              active: this.state.active === "2",
                            })}
                            onClick={() => {
                              this.toggle1("2");
                            }}
                          >
                            <b>Loan Details</b>
                          </NavLink>
                        </NavItem>
                        {(() => {
                          if (this.state.data.results.partner_code == "ud") {
                            return (
                              <NavItem style={{ marginLeft: "3%" }}>
                                <NavLink
                                  className={classnames({
                                    active: this.state.active === "3",
                                  })}
                                  onClick={() => {
                                    this.toggle1("3");
                                  }}
                                >
                                  <b>Transaction Details</b>
                                </NavLink>
                              </NavItem>
                            );
                          }
                        })()}
                        {(() => {
                          if (this.state.data.results.partner_code == "ud") {
                            return (
                              <NavItem style={{ marginLeft: "3%" }}>
                                <NavLink
                                  className={classnames({
                                    active: this.state.active === "4",
                                  })}
                                  onClick={() => {
                                    this.toggle1("4");
                                  }}
                                >
                                  <b>Credit Details</b>
                                </NavLink>
                              </NavItem>
                            );
                          }
                        })()}
                        {(() => {
                          if (
                            this.state.data.results.partner_code == "lk" ||
                            this.state.data.results.partner_code == "kc"
                          ) {
                            return (
                              <NavItem style={{ marginLeft: "3%" }}>
                                <NavLink
                                  className={classnames({
                                    active: this.state.active === "5",
                                  })}
                                  onClick={() => {
                                    this.toggle1("5");
                                  }}
                                >
                                  <b>Bank Details</b>
                                </NavLink>
                              </NavItem>
                            );
                          }
                        })()}
                        {(() => {
                          if (
                            this.state.data.results.partner_code == "lk" ||
                            this.state.data.results.partner_code == "kc"
                          ) {
                            return (
                              <NavItem style={{ marginLeft: "3%" }}>
                                <NavLink
                                  className={classnames({
                                    active: this.state.active === "6",
                                  })}
                                  onClick={() => {
                                    this.toggle1("6");
                                  }}
                                >
                                  <b>Financial Summaries</b>
                                </NavLink>
                              </NavItem>
                            );
                          }
                        })()}
                        {(() => {
                          if (
                            this.state.data.results.partner_code == "lk" ||
                            this.state.data.results.partner_code == "kc"
                          ) {
                            return (
                              <NavItem style={{ marginLeft: "3%" }}>
                                <NavLink
                                  className={classnames({
                                    active: this.state.active === "7",
                                  })}
                                  onClick={() => {
                                    this.toggle1("7");
                                  }}
                                >
                                  <b>Credit Summaries</b>
                                </NavLink>
                              </NavItem>
                            );
                          }
                        })()}
                        {(() => {
                          if (
                            this.state.data.results.partner_code == "lk" ||
                            this.state.data.results.partner_code == "kc"
                          ) {
                            return (
                              <NavItem style={{ marginLeft: "3%" }}>
                                <NavLink
                                  className={classnames({
                                    active: this.state.active === "8",
                                  })}
                                  onClick={() => {
                                    this.toggle1("8");
                                  }}
                                >
                                  <b>Funding Calculations</b>
                                </NavLink>
                              </NavItem>
                            );
                          }
                        })()}
                        {(() => {
                          if (this.state.data.results.partner_code == "ud") {
                            return (
                              <NavItem style={{ marginLeft: "3%" }}>
                                <NavLink
                                  className={classnames({
                                    active: this.state.active === "9",
                                  })}
                                  onClick={() => {
                                    this.toggle1("9");
                                  }}
                                >
                                  <b>Other Details</b>
                                </NavLink>
                              </NavItem>
                            );
                          }
                        })()}
                        <NavItem style={{ marginLeft: "3%" }}>
                          <NavLink
                            className={classnames({
                              active: this.state.active === "10",
                            })}
                            onClick={() => {
                              this.toggle1("10");
                            }}
                          >
                            <b>Documents</b>
                          </NavLink>
                        </NavItem>
                      </Nav>
                      {/* Details of Tab 1 */}
                      <TabContent
                        className="py-50"
                        activeTab={this.state.active}
                      >
                        <TabPane tabId="1">
                          <Row>
                            <Col
                              md="6"
                              style={{
                                borderRight: "1px solid #dae1e7",
                                padding: "0px",
                              }}
                            >
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Name:
                                </div>
                                <div>
                                  {
                                    this.state.data.results.customer_details
                                      .customer.company_name
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Customer ID:
                                </div>
                                <div>
                                  <Link
                                    to={`/customer/sme/${this.state.data.results.application_details.customer}`}
                                  >
                                    {
                                      this.state.data.results
                                        .partner_customer_id
                                    }
                                  </Link>
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Application ID:
                                </div>
                                <div>
                                  {
                                    this.state.data.results
                                      .partner_application_id
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Partner Code:
                                </div>
                                <div>
                                  {this.state.data.results.partner_code}
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  POA:
                                </div>
                                <div>
                                  {
                                    this.state.data.results.customer_details
                                      .customer.poa
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  PAN Number:
                                </div>
                                <div></div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Previous Company Names :
                                </div>{" "}
                                {this.state.data.results.customer_details.customer.previous_company_names.map(
                                  (name) => (
                                    <div className="space">{name}</div>
                                  )
                                )}
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Industry:
                                </div>
                                <div className="space">
                                  {
                                    this.state.data.results.customer_details
                                      .customer.industry
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Incorporation Type :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.customer_details
                                      .customer.incorporation_type
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Incorporation Date:
                                </div>
                                <div>{this.state.incorporationDate}</div>
                              </div>
                            </Col>
                            <Col md="6" style={{ paddingLeft: "5px" }}>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Registered Address :
                                </div>
                                <div
                                  className="space"
                                  style={{ wordBreak: "break-word" }}
                                >
                                  {this.state.data.results.customer_details
                                    .customer.registered_address.house_street +
                                    " " +
                                    this.state.data.results.customer_details
                                      .customer.registered_address.landmark +
                                    " " +
                                    this.state.data.results.customer_details
                                      .customer.registered_address.locality +
                                    " " +
                                    this.state.data.results.customer_details
                                      .customer.registered_address.city +
                                    " " +
                                    this.state.data.results.customer_details
                                      .customer.registered_address.district +
                                    " " +
                                    this.state.data.results.customer_details
                                      .customer.registered_address.state +
                                    "-" +
                                    this.state.data.results.customer_details
                                      .customer.registered_address.pincode}
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Premise Type :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.customer_details
                                      .customer.registered_address.premise_type
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Address Type :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.customer_details
                                      .customer.registered_address.address_type
                                  }
                                </div>
                              </div>
                              {this.state.data.results.customer_details.customer.other_addresses.map(
                                (address, index) => (
                                  <div className="d-flex customer__info">
                                    <div className="user-info-title font-weight-bold">
                                      Other Address {index + 1}:
                                    </div>
                                    <div
                                      className="space"
                                      style={{ wordBreak: "break-word" }}
                                    >
                                      {address.address.house_street +
                                        " " +
                                        address.address.landmark +
                                        " " +
                                        address.address.locality +
                                        " " +
                                        address.address.city +
                                        " " +
                                        address.address.district +
                                        " " +
                                        address.address.state +
                                        "-" +
                                        address.address.pincode}
                                    </div>
                                  </div>
                                )
                              )}
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  KYC Attestation Type :
                                </div>
                                <div></div>
                              </div>
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>

                      {/* Details of Tab 2 */}

                      <TabContent
                        className="py-50"
                        activeTab={this.state.active}
                      >
                        <TabPane tabId="2">
                          <Row>
                            <Col
                              md="6"
                              style={{
                                borderRight: "1px solid #dae1e7",
                                padding: "0px",
                              }}
                            >
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Requested Loan Amount :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .loan_details.requested_loan_amount
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Total Processing Fees :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .loan_details.total_processing_fee
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Insurance Fees :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .loan_details.insurance_fee
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Insurance Percentage :
                                </div>
                                <div></div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  GST on Insurance Fees :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .loan_details.gst_insurance_fee
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Stamp Duty :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .loan_details.stampduty
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Sanctioned Amount :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .loan_details.sanctioned_loan_amount
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Disbursement Amount :
                                </div>
                                <div></div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Interest Rate :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .loan_details.interest_rate
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Interest Rate Type(Monthly) :
                                </div>
                                <div></div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Schedule Start Date :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .loan_details.schedule_start_date
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  First Installment Date :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .loan_details.first_installment_date
                                  }
                                </div>
                              </div>
                            </Col>
                            <Col md="6" style={{ paddingLeft: "5px" }}>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Loan Cycle :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .loan_details.cycle
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  EMI :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .loan_details.emi_amount
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Repayment Frequency :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .loan_details.repayment_frequency
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Tenure Value :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .loan_details.tenure.value
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Tenure Units :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .loan_details.tenure.units
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Product :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .loan_details.product
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Purpose:
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .loan_details.purpose1
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div
                                  className="user-info-title font-weight-bold"
                                  style={{ wordBreak: "break-word" }}
                                >
                                  Schedule Disbursement Mode :{" "}
                                  <span style={{ fontWeight: "400" }}>
                                    {
                                      this.state.data.results
                                        .application_details.loan_details
                                        .scheduled_disbursement_date
                                    }
                                  </span>
                                </div>
                                <div></div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Disbursement Mode :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .loan_details.disbursement_mode
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Repayment Mode :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .loan_details.repayment_mode
                                  }
                                </div>
                              </div>
                              {(() => {
                                if (
                                  this.state.data.results.partner_code == "ud"
                                ) {
                                  return (
                                    <h4>
                                      <b>Credit Limit Details:</b>
                                    </h4>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code == "ud"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Sanctioned limit:
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details.loan_details
                                            .credit_limit_details
                                            .total_sanctioned_limit
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code == "ud"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Total Utilized limit :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details.loan_details
                                            .credit_limit_details
                                            .total_utilized_limit
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code == "ud"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Calculated on :
                                      </div>
                                      <div></div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code == "ud"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Avg Daily Debits :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details.loan_details
                                            .credit_limit_details
                                            .total_utilized_limit
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code == "ud"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Debit Portion :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details.loan_details
                                            .credit_limit_details.debit_portion
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code == "ud"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        <b>Tenure :</b>
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code == "ud"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Units:
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details.loan_details
                                            .tenure.units
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code == "ud"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Value :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details.loan_details
                                            .tenure.value
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>
                      {/* Details of Tab 3 */}
                      <TabContent
                        className="py-50"
                        activeTab={this.state.active}
                      >
                        <TabPane tabId="3">
                          <Row>
                            <Col md="12">
                              {(() => {
                                if (
                                  this.state.data.results.partner_code == "ud"
                                ) {
                                  return this.state.data.results.application_details.transaction_details.map(
                                    (detail, index) => (
                                      <Accordion>
                                        <Card>
                                          <Accordion.Toggle eventKey="0">
                                            {detail.item}
                                          </Accordion.Toggle>

                                          <Accordion.Collapse eventKey="0">
                                            <CardBody>
                                              <Row>
                                                <Col md="6">
                                                  <div className="d-flex customer__info">
                                                    <div className="user-info-title font-weight-bold">
                                                      Period :
                                                    </div>
                                                    <div>{detail.period}</div>
                                                  </div>
                                                  <div className="d-flex customer__info">
                                                    <div className="user-info-title font-weight-bold">
                                                      Value :
                                                    </div>
                                                    <div>{detail.value}</div>
                                                  </div>
                                                </Col>
                                                <Col md="6">
                                                  <div className="d-flex customer__info">
                                                    <div className="user-info-title font-weight-bold">
                                                      Last Updated At :
                                                    </div>
                                                    <div>
                                                      {new Intl.DateTimeFormat(
                                                        "en-US",
                                                        {
                                                          month: "2-digit",
                                                          day: "2-digit",
                                                          year: "numeric",
                                                        }
                                                      )
                                                        .format(
                                                          detail.last_updated_at
                                                            .$date
                                                        )
                                                        .split("/")
                                                        .reverse()
                                                        .join("-")
                                                        .replace(
                                                          /(\d*)-(\d*)-(\d*)/,
                                                          "$1-$3-$2"
                                                        )}
                                                    </div>
                                                  </div>
                                                </Col>
                                              </Row>
                                            </CardBody>
                                          </Accordion.Collapse>
                                        </Card>
                                      </Accordion>
                                    )
                                  );
                                }
                              })()}
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>
                      {/* Details of Tab 4 */}

                      <TabContent
                        className="py-50"
                        activeTab={this.state.active}
                      >
                        <TabPane tabId="4">
                          <Row>
                            <Col md="12">
                              {this.state.data.results.application_details.credit_details.credit_reports.map(
                                (detail, index) => (
                                  <Accordion>
                                    <Card>
                                      <Accordion.Toggle eventKey="0">
                                        {detail.name} Details
                                      </Accordion.Toggle>

                                      <Accordion.Collapse eventKey="0">
                                        <CardBody>
                                          <Row>
                                            <Col md="6">
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Bureau :
                                                </div>
                                                <div>
                                                  {detail.cb_report.bureau}
                                                </div>
                                              </div>
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Bureau Score :
                                                </div>
                                                <div></div>
                                              </div>
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Dpd in 6 months :
                                                </div>
                                                <div></div>
                                              </div>
                                            </Col>
                                            <Col md="6">
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Report ID :
                                                </div>
                                                <div>
                                                  {detail.cb_report.report_id}
                                                </div>
                                              </div>
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Report Date :
                                                </div>
                                                <div>
                                                  {detail.cb_report.report_date}
                                                </div>
                                              </div>
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Dpd in 12 months :
                                                </div>
                                                <div></div>
                                              </div>
                                            </Col>
                                          </Row>
                                        </CardBody>
                                      </Accordion.Collapse>
                                    </Card>
                                  </Accordion>
                                )
                              )}
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>

                      {/* Details of Tab 5 */}
                      {(() => {
                        if (this.state.data.results.partner_code != "ud") {
                          return (
                            <TabContent
                              className="py-50"
                              activeTab={this.state.active}
                            >
                              <TabPane tabId="5">
                                {(() => {
                                  if (
                                    this.state.data.results.application_details
                                      .consolidated_bank_details
                                  ) {
                                    return (
                                      <Row>
                                        <Col md="12">
                                          <Accordion>
                                            <Card>
                                              <Accordion.Toggle eventKey="0">
                                                Consolidated Bank details
                                              </Accordion.Toggle>

                                              <Accordion.Collapse eventKey="0">
                                                <CardBody>
                                                  <Row>
                                                    <Col md="6">
                                                      <div className="d-flex customer__info">
                                                        <div className="user-info-title font-weight-bold">
                                                          Avg daily balance :
                                                        </div>
                                                        <div>
                                                          {
                                                            this.state.data
                                                              .results
                                                              .application_details
                                                              .consolidated_bank_details
                                                              .avg_daily_balance
                                                          }
                                                        </div>
                                                      </div>
                                                      <div className="d-flex customer__info">
                                                        <div className="user-info-title font-weight-bold">
                                                          Credit amount :
                                                        </div>
                                                        <div>
                                                          {
                                                            this.state.data
                                                              .results
                                                              .application_details
                                                              .consolidated_bank_details
                                                              .credit_amount
                                                          }
                                                        </div>
                                                      </div>
                                                      <div className="d-flex customer__info">
                                                        <div className="user-info-title font-weight-bold">
                                                          Debit Amount :
                                                        </div>
                                                        <div>
                                                          {
                                                            this.state.data
                                                              .results
                                                              .application_details
                                                              .consolidated_bank_details
                                                              .debit_amount
                                                          }
                                                        </div>
                                                      </div>
                                                      <div className="d-flex customer__info">
                                                        <div className="user-info-title font-weight-bold">
                                                          Cash deposits value :
                                                        </div>
                                                        <div>
                                                          {
                                                            this.state.data
                                                              .results
                                                              .application_details
                                                              .consolidated_bank_details
                                                              .cash_deposits_value
                                                          }
                                                        </div>
                                                      </div>
                                                      <div className="d-flex customer__info">
                                                        <div className="user-info-title font-weight-bold">
                                                          Cash deposits count :
                                                        </div>
                                                        <div>
                                                          {
                                                            this.state.data
                                                              .results
                                                              .application_details
                                                              .consolidated_bank_details
                                                              .cash_deposits_count
                                                          }
                                                        </div>
                                                      </div>
                                                    </Col>
                                                    <Col md="6">
                                                      <div className="d-flex customer__info">
                                                        <div className="user-info-title font-weight-bold">
                                                          Cheques issued count :
                                                        </div>
                                                        <div>
                                                          {
                                                            this.state.data
                                                              .results
                                                              .application_details
                                                              .consolidated_bank_details
                                                              .cheques_issued_count
                                                          }
                                                        </div>
                                                      </div>
                                                      <div className="d-flex customer__info">
                                                        <div className="user-info-title font-weight-bold">
                                                          Cheques issued value :
                                                        </div>
                                                        <div>
                                                          {
                                                            this.state.data
                                                              .results
                                                              .application_details
                                                              .consolidated_bank_details
                                                              .cheques_issued_value
                                                          }
                                                        </div>
                                                      </div>
                                                      <div className="d-flex customer__info">
                                                        <div className="user-info-title font-weight-bold">
                                                          Inward Cheque Bounces
                                                          :
                                                        </div>
                                                        <div>
                                                          {
                                                            this.state.data
                                                              .results
                                                              .application_details
                                                              .consolidated_bank_details
                                                              .inward_cheque_bounces
                                                          }
                                                        </div>
                                                      </div>
                                                      <div className="d-flex customer__info">
                                                        <div className="user-info-title font-weight-bold">
                                                          Outward Cheque Bounces
                                                          :
                                                        </div>
                                                        <div>
                                                          {
                                                            this.state.data
                                                              .results
                                                              .application_details
                                                              .consolidated_bank_details
                                                              .outward_cheque_bounces
                                                          }
                                                        </div>
                                                      </div>
                                                    </Col>
                                                  </Row>
                                                  <Row>
                                                    <b
                                                      style={{
                                                        marginTop: "5%",
                                                      }}
                                                    >
                                                      Statements
                                                    </b>
                                                    <Col
                                                      md="12"
                                                      style={{
                                                        marginLeft: "20%",
                                                      }}
                                                    >
                                                      <table className="table table-horizontal-scroll">
                                                        <tbody
                                                          style={{
                                                            border:
                                                              "1px solid #f8f8f8",
                                                          }}
                                                        >
                                                          <tr>
                                                            <th>#</th>
                                                            <th>Month</th>
                                                            <th>
                                                              INWARD CHEQUE
                                                              BOUNCES
                                                            </th>
                                                            <th>
                                                              CREDIT AMOUNT
                                                            </th>
                                                          </tr>
                                                          {this.state.data.results.application_details.consolidated_bank_details.statements.map(
                                                            (
                                                              statement,
                                                              index
                                                            ) => (
                                                              <tr>
                                                                <td
                                                                  style={{
                                                                    textAlign:
                                                                      "center",
                                                                  }}
                                                                >
                                                                  {index + 1}
                                                                </td>
                                                                <td
                                                                  style={{
                                                                    textAlign:
                                                                      "center",
                                                                  }}
                                                                >
                                                                  {
                                                                    statement.month
                                                                  }
                                                                </td>
                                                                <td
                                                                  style={{
                                                                    textAlign:
                                                                      "center",
                                                                  }}
                                                                >
                                                                  {
                                                                    statement.inward_cheque_bounces
                                                                  }
                                                                </td>
                                                                <td
                                                                  style={{
                                                                    textAlign:
                                                                      "center",
                                                                  }}
                                                                >
                                                                  {
                                                                    statement.credit_amount
                                                                  }
                                                                </td>
                                                              </tr>
                                                            )
                                                          )}
                                                        </tbody>
                                                      </table>
                                                    </Col>
                                                  </Row>
                                                </CardBody>
                                              </Accordion.Collapse>
                                            </Card>
                                          </Accordion>
                                        </Col>
                                      </Row>
                                    );
                                  }
                                })()}
                                <Row>
                                  <Col md="12">
                                    {this.state.data.results.application_details.bank_details.map(
                                      (detail, index) => (
                                        <Accordion>
                                          <Card>
                                            <Accordion.Toggle eventKey="0">
                                              Bank Details - (
                                              {new Intl.DateTimeFormat(
                                                "en-US",
                                                {
                                                  month: "2-digit",
                                                  day: "2-digit",
                                                  year: "numeric",
                                                }
                                              )
                                                .format(
                                                  detail.period.from_date.$date
                                                )
                                                .split("/")
                                                .reverse()
                                                .join("-")
                                                .replace(
                                                  /(\d*)-(\d*)-(\d*)/,
                                                  "$1-$3-$2"
                                                )}{" "}
                                              to{" "}
                                              {new Intl.DateTimeFormat(
                                                "en-US",
                                                {
                                                  month: "2-digit",
                                                  day: "2-digit",
                                                  year: "numeric",
                                                }
                                              )
                                                .format(
                                                  detail.period.to_date.$date
                                                )
                                                .split("/")
                                                .reverse()
                                                .join("-")
                                                .replace(
                                                  /(\d*)-(\d*)-(\d*)/,
                                                  "$1-$3-$2"
                                                )}
                                              )
                                            </Accordion.Toggle>

                                            <Accordion.Collapse eventKey="0">
                                              <CardBody>
                                                <Row>
                                                  <Col md="6">
                                                    <div className="d-flex customer__info">
                                                      <div className="user-info-title font-weight-bold">
                                                        Account Holder Name :
                                                      </div>
                                                      <div>
                                                        {
                                                          detail.account_holder_name
                                                        }
                                                      </div>
                                                    </div>
                                                    <div className="d-flex customer__info">
                                                      <div className="user-info-title font-weight-bold">
                                                        Bank Name :
                                                      </div>
                                                      <div>
                                                        {detail.bank_name}
                                                      </div>
                                                    </div>
                                                    <div className="d-flex customer__info">
                                                      <div className="user-info-title font-weight-bold">
                                                        Account Number :
                                                      </div>
                                                      <div>
                                                        {detail.account_number}
                                                      </div>
                                                    </div>
                                                    <div className="d-flex customer__info">
                                                      <div className="user-info-title font-weight-bold">
                                                        Account Type :
                                                      </div>
                                                      <div>
                                                        {detail.account_type}
                                                      </div>
                                                    </div>
                                                    <div className="d-flex customer__info">
                                                      <div className="user-info-title font-weight-bold">
                                                        Avg Daily Balance :
                                                      </div>
                                                      <div>
                                                        {
                                                          detail.avg_daily_balance
                                                        }
                                                      </div>
                                                    </div>
                                                    <div className="d-flex customer__info">
                                                      <div className="user-info-title font-weight-bold">
                                                        Credit Amount :
                                                      </div>
                                                      <div>
                                                        {detail.credit_amount}
                                                      </div>
                                                    </div>
                                                    <div className="d-flex customer__info">
                                                      <div className="user-info-title font-weight-bold">
                                                        Debit Amount :
                                                      </div>
                                                      <div>
                                                        {detail.debit_amount}
                                                      </div>
                                                    </div>
                                                  </Col>
                                                  <Col md="6">
                                                    <div className="d-flex customer__info">
                                                      <div className="user-info-title font-weight-bold">
                                                        Cash Deposit Count :
                                                      </div>
                                                      <div>
                                                        {
                                                          detail.cash_deposits_count
                                                        }
                                                      </div>
                                                    </div>
                                                    <div className="d-flex customer__info">
                                                      <div className="user-info-title font-weight-bold">
                                                        Cash Deposit Value :
                                                      </div>
                                                      <div>
                                                        {
                                                          detail.cash_deposits_value
                                                        }
                                                      </div>
                                                    </div>
                                                    <div className="d-flex customer__info">
                                                      <div className="user-info-title font-weight-bold">
                                                        Cheques Issued Count :
                                                      </div>
                                                      <div>
                                                        {
                                                          detail.cheques_issued_count
                                                        }
                                                      </div>
                                                    </div>
                                                    <div className="d-flex customer__info">
                                                      <div className="user-info-title font-weight-bold">
                                                        Cheques Issued Value :
                                                      </div>
                                                      <div>
                                                        {
                                                          detail.cheques_issued_value
                                                        }
                                                      </div>
                                                    </div>
                                                    <div className="d-flex customer__info">
                                                      <div className="user-info-title font-weight-bold">
                                                        Inward Cheque Bounces :
                                                      </div>
                                                      <div>
                                                        {
                                                          detail.inward_cheque_bounces
                                                        }
                                                      </div>
                                                    </div>
                                                    <div className="d-flex customer__info">
                                                      <div className="user-info-title font-weight-bold">
                                                        Outward Cheque Bounces :
                                                      </div>
                                                      <div>
                                                        {
                                                          detail.outward_cheque_bounces
                                                        }
                                                      </div>
                                                    </div>
                                                  </Col>
                                                </Row>
                                                {(() => {
                                                  if (detail.statements) {
                                                    return (
                                                      <Row>
                                                        <b
                                                          style={{
                                                            marginTop: "5%",
                                                          }}
                                                        >
                                                          Statements
                                                        </b>
                                                        <Col
                                                          md="12"
                                                          style={{
                                                            marginLeft: "20%",
                                                          }}
                                                        >
                                                          <table className="table table-horizontal-scroll">
                                                            <tbody
                                                              style={{
                                                                border:
                                                                  "1px solid #f8f8f8",
                                                              }}
                                                            >
                                                              <tr>
                                                                <th>#</th>
                                                                <th>Month</th>
                                                                <th>
                                                                  INWARD CHEQUE
                                                                  BOUNCES
                                                                </th>
                                                                <th>
                                                                  CREDIT AMOUNT
                                                                </th>
                                                              </tr>
                                                              {detail.statements.map(
                                                                (
                                                                  statement,
                                                                  index
                                                                ) => (
                                                                  <tr>
                                                                    <td
                                                                      style={{
                                                                        textAlign:
                                                                          "center",
                                                                      }}
                                                                    >
                                                                      {index +
                                                                        1}
                                                                    </td>
                                                                    <td
                                                                      style={{
                                                                        textAlign:
                                                                          "center",
                                                                      }}
                                                                    >
                                                                      {
                                                                        statement.month
                                                                      }
                                                                    </td>
                                                                    <td
                                                                      style={{
                                                                        textAlign:
                                                                          "center",
                                                                      }}
                                                                    >
                                                                      {
                                                                        statement.inward_cheque_bounces
                                                                      }
                                                                    </td>
                                                                    <td
                                                                      style={{
                                                                        textAlign:
                                                                          "center",
                                                                      }}
                                                                    >
                                                                      {
                                                                        statement.credit_amount
                                                                      }
                                                                    </td>
                                                                  </tr>
                                                                )
                                                              )}
                                                            </tbody>
                                                          </table>
                                                        </Col>
                                                      </Row>
                                                    );
                                                  }
                                                })()}
                                              </CardBody>
                                            </Accordion.Collapse>
                                          </Card>
                                        </Accordion>
                                      )
                                    )}
                                  </Col>
                                </Row>
                              </TabPane>
                            </TabContent>
                          );
                        }
                      })()}
                      {/* Details of Tab 6 */}
                      {(() => {
                        if (this.state.data.results.partner_code != "ud") {
                          return (
                            <TabContent
                              className="py-50"
                              activeTab={this.state.active}
                            >
                              <TabPane tabId="6">
                                <Row>
                                  <Col md="12">
                                    {this.state.data.results.application_details.financial_summaries.map(
                                      (detail, index) => (
                                        <Accordion>
                                          <Card>
                                            {(() => {
                                              if (detail.time_period) {
                                                return (
                                                  <Accordion.Toggle eventKey="0">
                                                    Summary - (
                                                    {new Intl.DateTimeFormat(
                                                      "en-US",
                                                      {
                                                        month: "2-digit",
                                                        day: "2-digit",
                                                        year: "numeric",
                                                      }
                                                    )
                                                      .format(
                                                        detail.time_period
                                                          .from_date.$date
                                                      )
                                                      .split("/")
                                                      .reverse()
                                                      .join("-")
                                                      .replace(
                                                        /(\d*)-(\d*)-(\d*)/,
                                                        "$1-$3-$2"
                                                      )}{" "}
                                                    to{" "}
                                                    {new Intl.DateTimeFormat(
                                                      "en-US",
                                                      {
                                                        month: "2-digit",
                                                        day: "2-digit",
                                                        year: "numeric",
                                                      }
                                                    )
                                                      .format(
                                                        detail.time_period
                                                          .to_date.$date
                                                      )
                                                      .split("/")
                                                      .reverse()
                                                      .join("-")
                                                      .replace(
                                                        /(\d*)-(\d*)-(\d*)/,
                                                        "$1-$3-$2"
                                                      )}
                                                    )
                                                  </Accordion.Toggle>
                                                );
                                              } else {
                                                return (
                                                  <Accordion.Toggle eventKey="0">
                                                    Summary
                                                  </Accordion.Toggle>
                                                );
                                              }
                                            })()}
                                            <Accordion.Collapse eventKey="0">
                                              <CardBody>
                                                <Row>
                                                  <Col md="6">
                                                    <div className="d-flex customer__info">
                                                      <div className="user-info-title font-weight-bold">
                                                        Turnover :
                                                      </div>
                                                      <div>
                                                        {detail.turnover}
                                                      </div>
                                                    </div>
                                                    <div className="d-flex customer__info">
                                                      <div className="user-info-title font-weight-bold">
                                                        Debt Equity Ratio :
                                                      </div>
                                                      <div>
                                                        {
                                                          detail.debt_equity_ratio
                                                        }
                                                      </div>
                                                    </div>
                                                    <div className="d-flex customer__info">
                                                      <div className="user-info-title font-weight-bold">
                                                        Gross Profit Margin :
                                                      </div>
                                                      <div>
                                                        {
                                                          detail.gross_profit_margin
                                                        }
                                                      </div>
                                                    </div>
                                                    <div className="d-flex customer__info">
                                                      <div className="user-info-title font-weight-bold">
                                                        Net Profit Margin :
                                                      </div>
                                                      <div>
                                                        {
                                                          detail.net_profit_margin
                                                        }
                                                      </div>
                                                    </div>
                                                    <div className="d-flex customer__info">
                                                      <div className="user-info-title font-weight-bold">
                                                        Cash Profit Margin :
                                                      </div>
                                                      <div>
                                                        {
                                                          detail.cash_profit_margin
                                                        }
                                                      </div>
                                                    </div>
                                                  </Col>
                                                  <Col md="6">
                                                    <div className="d-flex customer__info">
                                                      <div className="user-info-title font-weight-bold">
                                                        Sales Growth :
                                                      </div>
                                                      <div>
                                                        {detail.sales_growth}
                                                      </div>
                                                    </div>
                                                    <div className="d-flex customer__info">
                                                      <div className="user-info-title font-weight-bold">
                                                        Pat Growth :
                                                      </div>
                                                      <div>
                                                        {detail.pat_growth}
                                                      </div>
                                                    </div>
                                                    <div className="d-flex customer__info">
                                                      <div className="user-info-title font-weight-bold">
                                                        Average Collection
                                                        Period :
                                                      </div>
                                                      <div>
                                                        {
                                                          detail.avg_collection_period
                                                        }
                                                      </div>
                                                    </div>
                                                    <div className="d-flex customer__info">
                                                      <div className="user-info-title font-weight-bold">
                                                        Average Debtor days :
                                                      </div>
                                                      <div>
                                                        {detail.avg_debtor_days}
                                                      </div>
                                                    </div>
                                                  </Col>
                                                </Row>
                                              </CardBody>
                                            </Accordion.Collapse>
                                          </Card>
                                        </Accordion>
                                      )
                                    )}
                                  </Col>
                                </Row>
                              </TabPane>
                            </TabContent>
                          );
                        }
                      })()}
                      {/* Details of Tab 7 */}
                      <TabContent
                        className="py-50"
                        activeTab={this.state.active}
                      >
                        <TabPane tabId="7">
                          <Row>
                            <Col md="12">
                              {this.state.data.results.application_details.credit_details.credit_reports.map(
                                (detail, index) => (
                                  <Accordion>
                                    <Card>
                                      <Accordion.Toggle eventKey="0">
                                        Entity - {detail.name} Details
                                      </Accordion.Toggle>

                                      <Accordion.Collapse eventKey="0">
                                        <CardBody>
                                          <b>Credit Score details</b>
                                          <Row className="rowBottom">
                                            <Col md="6">
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Bureau :
                                                </div>
                                                <div>
                                                  {detail.cb_report.bureau}
                                                </div>
                                              </div>
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Report Date :
                                                </div>
                                                <div>
                                                  {detail.cb_report.report_date}
                                                </div>
                                              </div>
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Partner Score :
                                                </div>
                                                <div>
                                                  {
                                                    detail.cb_report
                                                      .partner_score
                                                  }
                                                </div>
                                              </div>
                                            </Col>
                                            <Col md="6">
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Report Id :
                                                </div>
                                                <div>
                                                  {detail.cb_report.report_id}
                                                </div>
                                              </div>
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Bureau Score :
                                                </div>
                                                <div>
                                                  {
                                                    detail.cb_report
                                                      .bureau_score
                                                  }
                                                </div>
                                              </div>
                                            </Col>
                                          </Row>
                                          <b>Credit Accounts Summary</b>
                                          <Row className="rowBottom">
                                            <Col md="6">
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Current Balance :
                                                </div>
                                                <div>
                                                  {
                                                    detail.cb_report
                                                      .account_summary
                                                      .current_balance
                                                  }
                                                </div>
                                              </div>
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Total Active Accounts :
                                                </div>
                                                <div>
                                                  {
                                                    detail.cb_report
                                                      .account_summary
                                                      .active_accounts
                                                  }
                                                </div>
                                              </div>
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Credit Card Loans :
                                                </div>
                                                <div>
                                                  {
                                                    detail.cb_report
                                                      .account_summary
                                                      .credit_card_loans
                                                  }
                                                </div>
                                              </div>
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Home Loans :
                                                </div>
                                                <div>
                                                  {
                                                    detail.cb_report
                                                      .account_summary
                                                      .home_loans
                                                  }
                                                </div>
                                              </div>
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Closed Loans :
                                                </div>
                                                <div>
                                                  {
                                                    detail.cb_report
                                                      .account_summary
                                                      .closed_loans
                                                  }
                                                </div>
                                              </div>
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Overdue Loan Accounts :
                                                </div>
                                                <div></div>
                                              </div>
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Sanctioned Balance :
                                                </div>
                                                <div></div>
                                              </div>
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Outstanding Balance :
                                                </div>
                                                <div></div>
                                              </div>
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Written Off Loan Accounts :
                                                </div>
                                                <div></div>
                                              </div>
                                            </Col>
                                            <Col md="6">
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Total Accounts :
                                                </div>
                                                <div>
                                                  {
                                                    detail.cb_report
                                                      .account_summary
                                                      .total_accounts
                                                  }
                                                </div>
                                              </div>
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Auto Loans :
                                                </div>
                                                <div>
                                                  {
                                                    detail.cb_report
                                                      .account_summary
                                                      .auto_loans
                                                  }
                                                </div>
                                              </div>
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Gold Loans :
                                                </div>
                                                <div>
                                                  {
                                                    detail.cb_report
                                                      .account_summary
                                                      .gold_loans
                                                  }
                                                </div>
                                              </div>
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Personal Loans :
                                                </div>
                                                <div>
                                                  {
                                                    detail.cb_report
                                                      .account_summary
                                                      .personal_loans
                                                  }
                                                </div>
                                              </div>
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Red Flag Accounts :
                                                </div>
                                                <div>
                                                  {
                                                    detail.cb_report
                                                      .account_summary
                                                      .red_flag_accounts
                                                  }
                                                </div>
                                              </div>
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Overdue Loan Amount :
                                                </div>
                                                <div></div>
                                              </div>
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Outstanding Accounts :
                                                </div>
                                                <div></div>
                                              </div>
                                              <div className="d-flex customer__info">
                                                <div className="user-info-title font-weight-bold">
                                                  Settled Loan Accounts :
                                                </div>
                                                <div></div>
                                              </div>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <b>Accounts Statements</b>
                                            <Col md="12">
                                              <table className="table table-horizontal-scroll">
                                                <tbody>
                                                  <tr>
                                                    <th>Loan Type</th>
                                                    <th>Ownership</th>
                                                    <th>Opening Date</th>
                                                    <th>Last Payment Date</th>
                                                    <th>Current Balance</th>
                                                    <th>High Credit</th>
                                                    <th>DPD</th>
                                                    <th>Amount Overdue</th>
                                                    <th>Status</th>
                                                  </tr>
                                                  {detail.cb_report.account_statements.map(
                                                    (statement, index) => (
                                                      <tr>
                                                        <td>
                                                          {statement.loan_type}
                                                        </td>
                                                        <td>
                                                          {statement.ownership}
                                                        </td>
                                                        <td>
                                                          {
                                                            statement.opening_date
                                                          }
                                                        </td>
                                                        <td>
                                                          {
                                                            statement.last_payment_date
                                                          }
                                                        </td>
                                                        <td>
                                                          {
                                                            statement.current_balance
                                                          }
                                                        </td>
                                                        <td>
                                                          {
                                                            statement.high_credit
                                                          }
                                                        </td>
                                                        <td>{statement.dpd}</td>
                                                        <td>
                                                          {
                                                            statement.amount_overdue
                                                          }
                                                        </td>
                                                        <td>
                                                          {statement.status}
                                                        </td>
                                                      </tr>
                                                    )
                                                  )}
                                                </tbody>
                                              </table>
                                            </Col>
                                          </Row>
                                        </CardBody>
                                      </Accordion.Collapse>
                                    </Card>
                                  </Accordion>
                                )
                              )}
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>
                      {/* Details of Tab 8 */}
                      {(() => {
                        if (this.state.data.results.partner_code != "ud") {
                          return (
                            <TabContent
                              className="py-50"
                              activeTab={this.state.active}
                            >
                              <TabPane tabId="8">
                                <Row style={{ marginTop: "-12%" }}>
                                  <Col
                                    md="6"
                                    style={{
                                      borderRight: "1px solid #dae1e7",
                                      padding: "0px",
                                    }}
                                  >
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        LK Score :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details.credit_details
                                            .lk_score
                                        }
                                      </div>
                                    </div>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        LK Bucket :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details.credit_details
                                            .lk_bucket
                                        }
                                      </div>
                                    </div>
                                    <div
                                      className="d-flex customer__info"
                                      style={{ marginBottom: "7%" }}
                                    >
                                      <div className="user-info-title font-weight-bold">
                                        Monthly Revenue(3 Month Average) :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .funding_calculation.monthly_revenue
                                        }
                                      </div>
                                    </div>
                                    <b>Liabilities</b>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Term Loan Outstanding :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .funding_calculation.liabilities
                                            .term_loan_outstanding
                                        }
                                      </div>
                                    </div>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Term Loan Sanctioned Amount :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .funding_calculation.liabilities
                                            .term_loan_sanctioned_amount
                                        }
                                      </div>
                                    </div>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Current Business Loan Outstanding :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .funding_calculation.liabilities
                                            .current_business_loan_outstanding
                                        }
                                      </div>
                                    </div>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Non-Current business Loan Outstanding :
                                      </div>
                                      {
                                        this.state.data.results
                                          .application_details
                                          .funding_calculation.liabilities
                                          .non_current_business_loan_outstanding
                                      }
                                    </div>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        CC/OD Loan Outstanding :
                                      </div>
                                      <div className="space">
                                        {
                                          this.state.data.results
                                            .application_details
                                            .funding_calculation.liabilities
                                            .cc_od_loan_outstanding
                                        }
                                      </div>
                                    </div>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Inland Bill Outstanding :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .funding_calculation.liabilities
                                            .inland_bill_outstanding
                                        }
                                      </div>
                                    </div>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Other Loan Outstanding :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .funding_calculation.liabilities
                                            .other_loan_outstanding
                                        }
                                      </div>
                                    </div>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Total Current Liability:
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .funding_calculation.liabilities
                                            .total_current_liability
                                        }
                                      </div>
                                    </div>
                                  </Col>
                                  <Col md="6" style={{ paddingLeft: "5px" }}>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        90Days Adb adjusted :
                                      </div>
                                      <div></div>
                                    </div>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Eligibility 1
                                        (3*MonthlyRevenue-CurrentLiability):
                                      </div>
                                      <div>{this.state.eligibility_1}</div>
                                    </div>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Eligibility 2 (2 * MonthlyRevenue ) :
                                      </div>
                                      <div>{this.state.eligibility_2}</div>
                                    </div>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Eligibility 3 (90Days Adb
                                        adjusted*Multiplier):
                                      </div>
                                      <div></div>
                                    </div>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Loan Eligibility :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .funding_calculation
                                            .loan_eligibility
                                        }
                                      </div>
                                    </div>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Calculated Loan Eligibility :
                                      </div>
                                      <div></div>
                                    </div>
                                    <div
                                      className="d-flex customer__info"
                                      style={{ marginBottom: "7%" }}
                                    >
                                      <div className="user-info-title font-weight-bold">
                                        Multiplier :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .funding_calculation.multiplier
                                        }
                                      </div>
                                    </div>
                                    <b>Repayment Capacity</b>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        DSCR Pre :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .repayment_capacity.dscr_pre
                                        }
                                      </div>
                                    </div>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        DSCR Post :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .repayment_capacity.dscr_post
                                        }
                                      </div>
                                    </div>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Debt to Equity Post :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .repayment_capacity
                                            .debt_to_equity_post
                                        }
                                      </div>
                                    </div>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Ratio of Insufficient Balance :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .funding_calculation
                                            .ratio_insufficient_balance
                                        }
                                      </div>
                                    </div>
                                  </Col>
                                </Row>
                              </TabPane>
                            </TabContent>
                          );
                        }
                      })()}
                      {/* Details of Tab 9 */}

                      {(() => {
                        if (this.state.data.results.partner_code == "ud") {
                          return (
                            <TabContent
                              className="py-50"
                              activeTab={this.state.active}
                            >
                              <TabPane tabId="9">
                                <Row>
                                  <Col
                                    md="6"
                                    style={{
                                      borderRight: "1px solid #dae1e7",
                                      padding: "0px",
                                    }}
                                  >
                                    <h4>
                                      <b>Store Details</b>
                                    </h4>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Name Board :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details.store_details
                                            .name_board
                                        }
                                      </div>
                                    </div>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Entrance :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details.store_details
                                            .entrance
                                        }
                                      </div>
                                    </div>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Foot Print :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details.store_details
                                            .footprint
                                        }
                                      </div>
                                    </div>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Structure :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details.store_details
                                            .structure
                                        }
                                      </div>
                                    </div>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Brand Endoresement :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details.store_details
                                            .brand_endorsement
                                        }
                                      </div>
                                    </div>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Store Location :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details.store_details
                                            .store_location
                                        }
                                      </div>
                                    </div>
                                  </Col>
                                  <Col md="6" style={{ paddingLeft: "5px" }}>
                                    <h4>
                                      <b>Platform Vintage:</b>
                                    </h4>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Type:
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .platform_vintage.type
                                        }
                                      </div>
                                    </div>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Units :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .platform_vintage.units
                                        }
                                      </div>
                                    </div>
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Values :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .platform_vintage.value
                                        }
                                      </div>
                                    </div>
                                  </Col>
                                </Row>
                              </TabPane>
                            </TabContent>
                          );
                        }
                      })()}

                      {/* Details of Tab  10*/}
                      <TabContent
                        className="py-50"
                        activeTab={this.state.active}
                      >
                        <TabPane tabId="10">
                          <Row>
                            <div>
                              <span>
                                {this.state.data.results.app_docs.map(
                                  (url, index) => (
                                    <Button
                                      className="text-bold-600 align-self-center"
                                      href={url.key}
                                      style={{
                                        marginBottom: "2%",
                                        width: "32%",
                                        marginRight: "5px",
                                        paddingLeft: "7px",
                                        paddingRight: "7px",
                                      }}
                                      download
                                      color="primary"
                                    >
                                      Download {url.tag}
                                    </Button>
                                  )
                                )}
                              </span>
                            </div>
                          </Row>
                        </TabPane>
                      </TabContent>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </CardBody>
          </Card>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className="modal-dialog-centered"
          >
            <ModalHeader toggle={this.toggle} className="bg-primary">
              <b>Applicant KYC</b>
            </ModalHeader>
            <ModalBody className="modal-dialog-centered">
              <Carousel showStatus={false} showThumbs={false}>
                {this.state.data.results.customer_kyc_image.map((image) => {
                  return (
                    <div>
                      <img
                        src={image.url}
                        alt="Applicant KYC"
                        style={{
                          width: "94%",
                          marginTop: "43px",
                          height: "28rem",
                        }}
                      />
                      <p class="top-center">{image.type}</p>
                    </div>
                  );
                })}
              </Carousel>
            </ModalBody>
          </Modal>
          <Modal
            isOpen={this.state.modal1}
            toggle={this.togglenew}
            className="modal-dialog-centered"
            scrollable={true}
          >
            <ModalHeader toggle={this.togglenew} className="bg-primary">
              <b>Downloadable Documents</b>
            </ModalHeader>
            <ModalBody style={{ height: "27rem" }}>
              {/* {this.state.data.results.document_links.map(
                (url, index) => (
                  <div className="customer__btn" style={{ marginLeft: "4%" }}>
                    <Button
                      href={url.key}
                      download
                      className="mr-1 mb-1 bg-gradient-info"
                      color="none"
                      style={{ width: "100%" }}
                    >
                      Download {url.tag}
                    </Button>
                  </div>
                )
              )}
              {this.state.data.results.app_docs.map(
                (url, index) => (
                  <div className="customer__btn" style={{ marginLeft: "4%" }}>
                    <Button
                      href={url.key}
                      download
                      className="mr-1 mb-1 bg-gradient-info"
                      color="none"
                      style={{ width: "100%" }}
                    >
                      Download {url.tag}
                    </Button>
                  </div>
                )
              )} */}
            </ModalBody>
          </Modal>
        </div>
      </>
    );
  }
}
export default IndividualCustomer;
