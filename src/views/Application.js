import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  CardImg,
  Modal,
  Table,
  ModalHeader,
  ModalBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  ModalFooter,
  Col,
  Row,
} from "reactstrap";
import { FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { Eye, Code } from "react-feather";
import "./Customer.scss";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import men from "../assets/img/pages/men.png";
import men from "../assets/img/pages/nitin.jpeg";
import woman from "../assets/img/pages/woman.png";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class IndividualCustomer extends React.Component {
  state = {
    customer_id: this.props.location.pathname.split("/")[2],
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
      `${this.state.baseURL}/api/v2/application/${this.state.customer_id}`,
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
  }

  render() {
    if (!this.state.data) return null;
    return (
      <>
        <div>
          <Card>
            <span class="badge-status mr-1 mb-1 bg-gradient-info">
              <b>
                {this.state.data.results.application_details.status_timeline[
                  this.state.data.results.application_details.status_timeline
                    .length - 1
                ].status_message.replace(/_/g, " ")}
              </b>{" "}
            </span>
            <CardHeader style={{ marginTop: "3%" }}>
              <span
                className="customer__customerName"
                style={{ width: "100%" }}
              >
                {this.state.data.results.customer_details.customer.name
                  .first_name +
                  " " +
                  this.state.data.results.customer_details.customer.name
                    .last_name}{" "}
                <span style={{ float: "right" }}>
                  <Link to={`/v2/${this.state.customer_id}/track`}>
                    <Button style={{ height: "36px" }} color="primary">
                      {" "}
                      <FaChartBar></FaChartBar>&nbsp;&nbsp;LOG
                    </Button>
                  </Link>
                </span>
              </span>
              <div>
                <Nav tabs>
                  <NavItem>
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
              <div className="customer__details">
                {(() => {
                  if (this.state.data.results.customer_image) {
                    return (
                      <CardImg
                        className="img-fluid mb-2"
                        alt="Customer Profile"
                        src={this.state.data.results.customer_image}
                      />
                    );
                  } else if (
                    this.state.data.results.customer_image == "" &&
                    this.state.data.results.customer_details.customer.gender ==
                      "MALE"
                  ) {
                    return (
                      <CardImg
                        className="img-fluid mb-2"
                        alt="Customer Profile"
                        src={men}
                      />
                    );
                  } else if (
                    this.state.data.results.customer_image == "" &&
                    this.state.data.results.customer_details.customer.gender ==
                      "FEMALE"
                  ) {
                    return (
                      <CardImg
                        className="img-fluid mb-2"
                        alt="Customer Profile"
                        src={woman}
                      />
                    );
                  }
                })()}
                <div className="card__right">
                  <div className="customer__btn">
                    <Button
                      className="mr-1 mb-1 bg-gradient-info"
                      color="none"
                      onClick={this.toggle}
                    >
                      Applicant KYC (
                      {this.state.data.results.customer_kyc_image.length})
                    </Button>
                  </div>
                </div>
                <div className="card__right">
                  <div className="customer__btn" style={{ width: "73%" }}>
                    <Button
                      className="mr-1 mb-1 bg-gradient-info"
                      color="none"
                      onClick={this.togglenew}
                      style={{ width: "100%" }}
                    >
                      Documents (
                      {this.state.data.results.document_links.length +
                        this.state.data.results.app_docs.length}
                      )
                    </Button>
                  </div>
                </div>
              </div>
              <Card
                className="customer__detailsCard1"
                style={{ flex: "0.8 1" }}
              >
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
                            <b>Personal Details</b>
                          </NavLink>
                        </NavItem>
                        <NavItem>
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
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.active === "3",
                            })}
                            onClick={() => {
                              this.toggle1("3");
                            }}
                          >
                            <b>Occupation Details</b>
                          </NavLink>
                        </NavItem>
                        <NavItem>
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
                        {(() => {
                          if (this.state.data.results.partner_code == "bb") {
                            return (
                              <NavItem>
                                <NavLink
                                  className={classnames({
                                    active: this.state.active === "5",
                                  })}
                                  onClick={() => {
                                    this.toggle1("5");
                                  }}
                                >
                                  <b>Income Details and Transaction Details</b>
                                </NavLink>
                              </NavItem>
                            );
                          } else {
                            return (
                              <NavItem>
                                <NavLink
                                  className={classnames({
                                    active: this.state.active === "5",
                                  })}
                                  onClick={() => {
                                    this.toggle1("5");
                                  }}
                                >
                                  <b>Income Details</b>
                                </NavLink>
                              </NavItem>
                            );
                          }
                        })()}
                        {(() => {
                          if (this.state.data.results.partner_code == "no") {
                            return (
                              <NavItem>
                                <NavLink
                                  className={classnames({
                                    active: this.state.active === "6",
                                  })}
                                  onClick={() => {
                                    this.toggle1("6");
                                  }}
                                >
                                  <b>Group Details</b>
                                </NavLink>
                              </NavItem>
                            );
                          }
                        })()}
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
                                  {this.state.data.results.customer_details
                                    .customer.name.first_name +
                                    " " +
                                    this.state.data.results.customer_details
                                      .customer.name.last_name}
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Customer ID:
                                </div>
                                <div>
                                  <Link
                                    to={`/v2/customer/${this.state.data.results.customer_details.customer_id}`}
                                  >
                                    {
                                      this.state.data.results.customer_details
                                        .customer_id
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
                                <div>{this.state.data.results.poa}</div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  POI:
                                </div>
                                <div>
                                  {
                                    this.state.data.results.customer_details
                                      .customer.poi
                                  }
                                </div>
                              </div>
                              {(() => {
                                if (
                                  this.state.data.results.customer_details
                                    .customer.email
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Email:
                                      </div>
                                      <div style={{ wordBreak: "break-all" }}>
                                        {
                                          this.state.data.results
                                            .customer_details.customer.email
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Date of Birth:
                                </div>
                                <div>
                                  {
                                    this.state.data.results.customer_details
                                      .customer.dob
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Gender:
                                </div>
                                <div>
                                  {
                                    this.state.data.results.customer_details
                                      .customer.gender
                                  }
                                </div>
                              </div>
                              {this.state.data.results.customer_details.customer.identities.map(
                                (idtype, index) => (
                                  <div className="d-flex customer__info">
                                    <div className="user-info-title font-weight-bold">
                                      ID Type {index + 1}:
                                    </div>
                                    {(() => {
                                      if (idtype.id_type != "AADHAAR") {
                                        return (
                                          <div>
                                            {idtype.id_type} ({idtype.id_value})
                                          </div>
                                        );
                                      } else {
                                        return <div>{idtype.id_type}</div>;
                                      }
                                    })()}
                                  </div>
                                )
                              )}
                            </Col>
                            <Col md="6" style={{ paddingLeft: "5px" }}>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Marital Status:
                                </div>
                                <div>
                                  {
                                    this.state.data.results.customer_details
                                      .marital_status
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Mobile:
                                </div>
                                <div>
                                  {
                                    this.state.data.results.customer_details
                                      .customer.phones[0].number
                                  }
                                </div>
                              </div>
                              {(() => {
                                if (
                                  this.state.data.results.application_details
                                    .cancel_reason
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Loan cancellation reason :
                                      </div>
                                      <div style={{ wordBreak: "break-all" }}>
                                        {
                                          this.state.data.results
                                            .application_details.cancel_reason
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (this.state.data.results.current_residence) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Address:
                                      </div>
                                      <div>
                                        <p
                                          style={{
                                            marginBottom: "2px",
                                            wordBreak: "break-word",
                                          }}
                                        >
                                          {
                                            this.state.data.results
                                              .current_residence.address
                                              .house_street
                                          }
                                        </p>
                                        <p style={{ marginBottom: "2px" }}>
                                          {
                                            this.state.data.results
                                              .current_residence.address
                                              .landmark
                                          }
                                        </p>
                                        <p style={{ marginBottom: "2px" }}>
                                          {
                                            this.state.data.results
                                              .current_residence.address
                                              .locality
                                          }
                                        </p>
                                        <p style={{ marginBottom: "2px" }}>
                                          {
                                            this.state.data.results
                                              .current_residence.address.city
                                          }
                                        </p>
                                        <p style={{ marginBottom: "2px" }}>
                                          {
                                            this.state.data.results
                                              .current_residence.address
                                              .district
                                          }
                                        </p>
                                        <p style={{ marginBottom: "2px" }}>
                                          {
                                            this.state.data.results
                                              .current_residence.address.state
                                          }
                                          {"-"}
                                          {
                                            this.state.data.results
                                              .current_residence.address.pincode
                                          }
                                        </p>
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code == "no"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Geo Type :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .current_residence.address.geo_type
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.application_details
                                    .disbursement
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        <b style={{ color: "#d22b2b" }}>
                                          Disbursement Failure Reason:{" "}
                                        </b>
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details.disbursement
                                            .disbursement_fail_reason
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results
                                    .kyc_attestation_type != null
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        KYC Attestation Type :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .kyc_attestation_type
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.application_details
                                    .rule_status != ""
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        <b style={{ color: " #d22b2b" }}>
                                          Sanction fail reason:{" "}
                                        </b>
                                      </div>
                                      <div style={{ wordBreak: "break-all" }}>
                                        {
                                          this.state.data.results
                                            .application_details.rule_status
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
                                  Pre Emi Amount :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .loan_details.pre_emi_amount
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
                                  GST :
                                </div>
                                <div>
                                  {this.state.data.results.application_details
                                    .loan_details.total_processing_fee * 0.18}
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
                                <div>
                                  {this.state.data.results.application_details
                                    .loan_details.requested_loan_amount -
                                    (this.state.data.results.application_details
                                      .loan_details.total_processing_fee +
                                      this.state.data.results
                                        .application_details.loan_details
                                        .stampduty)}
                                </div>
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
                              {(() => {
                                if (
                                  this.state.data.results.application_details
                                    .loan_details.category
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Loan Category :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details.loan_details
                                            .category
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.application_details
                                    .loan_details.merchant
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Loan Merchant :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details.loan_details
                                            .merchant
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
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
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Available Credit Limit :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .loan_details.available_credit_limit
                                  }
                                </div>
                              </div>
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
                            <Col
                              md="6"
                              style={{
                                borderRight: "1px solid #dae1e7",
                                padding: "0px",
                              }}
                            >
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Occupation Type :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .occupation_details.occupation_type
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Company :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .occupation_details.employer_name
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Duration :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .occupation_details
                                      .employment_duration_in_months
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Salary Mode :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .occupation_details.salary_mode
                                  }
                                </div>
                              </div>
                              {/* {(() => {
                                if (this.state.data.results.partner_code == "kb","mt","mv" && this.state.data.results.partner_code != "no") {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Vintage Unit :
                                      </div>
                                      <div>{this.state.data.results.application_details.vintage.unit}</div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (this.state.data.results.partner_code == "kb","mt","mv" && this.state.data.results.partner_code != "no","smc","es", ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Vintage Value :
                                      </div>
                                      <div>{this.state.data.results.application_details.vintage.value}</div>
                                    </div>
                                  );
                                }
                              })()} */}
                            </Col>
                            <Col md="6" style={{ paddingLeft: "5px" }}>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Relation :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .occupation_details
                                      .applicant_relation_with_company
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Company Email:
                                </div>
                                <div style={{ wordBreak: "break-all" }}>
                                  {
                                    this.state.data.results.application_details
                                      .occupation_details.email
                                  }
                                </div>
                              </div>
                              {(() => {
                                if (
                                  this.state.data.results.application_details
                                    .occupation_details.employer_address
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Address:
                                      </div>
                                      <div>
                                        <p
                                          style={{
                                            marginBottom: "2px",
                                            wordBreak: "break-word",
                                          }}
                                        >
                                          {
                                            this.state.data.results
                                              .application_details
                                              .occupation_details
                                              .employer_address.house_street
                                          }
                                        </p>
                                        <p style={{ marginBottom: "2px" }}>
                                          {
                                            this.state.data.results
                                              .application_details
                                              .occupation_details
                                              .employer_address.landmark
                                          }
                                        </p>
                                        <p style={{ marginBottom: "2px" }}>
                                          {
                                            this.state.data.results
                                              .application_details
                                              .occupation_details
                                              .employer_address.locality
                                          }
                                        </p>
                                        <p style={{ marginBottom: "2px" }}>
                                          {
                                            this.state.data.results
                                              .application_details
                                              .occupation_details
                                              .employer_address.city
                                          }
                                        </p>
                                        <p style={{ marginBottom: "2px" }}>
                                          {
                                            this.state.data.results
                                              .application_details
                                              .occupation_details
                                              .employer_address.district
                                          }
                                        </p>
                                        <p style={{ marginBottom: "2px" }}>
                                          {
                                            this.state.data.results
                                              .application_details
                                              .occupation_details
                                              .employer_address.state
                                          }
                                          {"-"}
                                          {
                                            this.state.data.results
                                              .application_details
                                              .occupation_details
                                              .employer_address.pincode
                                          }
                                        </p>
                                      </div>
                                    </div>
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
                            <Col
                              md="6"
                              style={{
                                borderRight: "1px solid #dae1e7",
                                padding: "0px",
                              }}
                            >
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Bureau :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .credit_report_details.bureau
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Bureau Score :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .credit_report_details.bureau_score
                                  }
                                </div>
                              </div>
                              {(() => {
                                if (
                                  this.state.data.results.partner_code == "bb"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Days Past Due :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .credit_report_details.dpd
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code == "bb"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Max age of commercial or active loan:
                                      </div>
                                      <div></div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code == "bb"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Emi delayed per year in %:
                                      </div>
                                      <div></div>
                                    </div>
                                  );
                                }
                              })()}
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Partner Score :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .credit_report_details.partner_score
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Report ID :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .credit_report_details.report_id
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  FOIR(%) :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .repayment_capacity.foir
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  EMI to net income ratio(%) :
                                </div>
                                <div></div>
                              </div>
                              {(() => {
                                if (
                                  (this.state.data.results.partner_code == "kb",
                                  "mt")
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        DPD in last 3 months :
                                      </div>
                                      <div></div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  (this.state.data.results.partner_code == "kb",
                                  "mt")
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        DPD in last 6 months :
                                      </div>
                                      <div></div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  (this.state.data.results.partner_code == "kb",
                                  "mt")
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        DPD across full history :
                                      </div>
                                      <div></div>
                                    </div>
                                  );
                                }
                              })()}
                            </Col>
                            <Col md="6" style={{ paddingLeft: "5px" }}>
                              {(() => {
                                if (
                                  this.state.data.results.partner_code != "bb"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Loans :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .credit_report_details
                                            .account_summary.total_accounts
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code != "bb"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Credit Card Loans :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .credit_report_details
                                            .account_summary.credit_card_loans
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code != "bb"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Gold Loans :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .credit_report_details
                                            .account_summary.gold_loans
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code != "bb"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Home Loans :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .credit_report_details
                                            .account_summary.home_loans
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code != "bb"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Personal Loans :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .credit_report_details
                                            .account_summary.personal_loans
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code != "bb"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Closed Loans :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .credit_report_details
                                            .account_summary.closed_loans
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code != "bb"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Red Flag Loans :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .credit_report_details
                                            .account_summary.red_flag_accounts
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code == "bb"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Active Accounts :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .credit_report_details
                                            .active_accounts
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code == "bb"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Current Account Balance:
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .credit_report_details.balance
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code == "bb"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Over Due Accounts :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .credit_report_details
                                            .overdue_accounts
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code == "bb"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Over Due Amount :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .credit_report_details
                                            .overdue_amount
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code == "bb"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Over Due Disbursed Amount in %:
                                      </div>
                                      <div></div>
                                    </div>
                                  );
                                }
                              })()}
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>

                      {/* Details of Tab 5 */}

                      <TabContent
                        className="py-50"
                        activeTab={this.state.active}
                      >
                        <TabPane tabId="5">
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
                                  Monthly Salary :
                                </div>
                                <div></div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Annual Salary :
                                </div>
                                <div>
                                  {
                                    this.state.data.results.application_details
                                      .income_details.gross_annual_income
                                  }
                                </div>
                              </div>
                              {(() => {
                                if (
                                  this.state.data.results.partner_code != "bb"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Expense Income Ratio :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details.income_details
                                            .expense_income_ratio
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code != "bb"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Average Banking Balance:
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details.loan_details
                                            .average_banking_balance
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                            </Col>
                            <Col md="6" style={{ paddingLeft: "5px" }}>
                              {(() => {
                                if (
                                  this.state.data.results.partner_code != "bb"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Total No. Of Accounts :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .credit_report_details
                                            .account_summary.total_accounts
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code != "bb"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Active Accounts :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .credit_report_details
                                            .account_summary.active_accounts
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code != "bb"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Current Account Balance :
                                      </div>
                                      <div>
                                        {
                                          this.state.data.results
                                            .application_details
                                            .credit_report_details
                                            .account_summary.current_balance
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.partner_code == "bb"
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <table class="table table-bordered">
                                        <tr style={{ background: "lightgrey" }}>
                                          <th>#</th>
                                          <th>Item</th>
                                          <th>Period</th>
                                          <th>Value</th>
                                        </tr>
                                        {this.state.data.results.application_details.transaction_details.map(
                                          (detail, index) => (
                                            <tr>
                                              <td
                                                style={{
                                                  border: "1px solid lightgrey",
                                                }}
                                              >
                                                {index}
                                              </td>
                                              <td
                                                style={{
                                                  border: "1px solid lightgrey",
                                                }}
                                              >
                                                {detail.item}
                                              </td>
                                              <td
                                                style={{
                                                  border: "1px solid lightgrey",
                                                }}
                                              >
                                                {detail.period}
                                              </td>
                                              <td
                                                style={{
                                                  border: "1px solid lightgrey",
                                                }}
                                              >
                                                {detail.value}
                                              </td>
                                            </tr>
                                          )
                                        )}
                                      </table>
                                    </div>
                                  );
                                }
                              })()}
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>

                      {/* Details of Tab 6 */}
                      <TabContent
                        className="py-50"
                        activeTab={this.state.active}
                      >
                        <TabPane tabId="6">
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
                                  Group ID:
                                </div>
                                <div></div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Number of Applications in Group:
                                </div>
                                <div></div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  CGT1 Date:
                                </div>
                                <div></div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  CGT2 Date:
                                </div>
                                <div></div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  GRT Date:
                                </div>
                                <div></div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Center ID :
                                </div>
                                <div></div>
                              </div>
                            </Col>
                            <Col md="6" style={{ paddingLeft: "5px" }}></Col>
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
              {this.state.data.results.document_links.map((url, index) => (
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
              ))}
              {this.state.data.results.app_docs.map((url, index) => (
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
              ))}
            </ModalBody>
          </Modal>
        </div>
      </>
    );
  }
}
export default IndividualCustomer;
