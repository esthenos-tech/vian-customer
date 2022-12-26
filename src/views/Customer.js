import React from "react";
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
  Col,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { Eye } from "react-feather";
import "./Customer.scss";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import men from "../assets/img/pages/men.png";
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
      `${this.state.baseURL}/api/v2/customer/${this.state.customer_id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "instance-token": cookies.get("user"),
        },
      }
    );
    debugger;
    this.setState({ data });
  }

  render() {
    if (!this.state.data) return null;
    return (
      <>
        <div>
          <Card>
            <CardHeader>
              <span className="customer__customerName">
                {this.state.data.results.customer_name}
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
                    this.state.data.results.customer.gender == "MALE"
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
                    this.state.data.results.customer.gender == "FEMALE"
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
                      Documents ({this.state.data.results.document_links.length}
                      )
                    </Button>
                  </div>
                </div>
              </div>
              <Card className="customer__detailsCard1">
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
                            <b>Customer Details</b>
                          </NavLink>
                        </NavItem>
                      </Nav>
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
                                  Customer ID:
                                </div>
                                <div>{this.state.data.results.customer_id}</div>
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
                                  Partner Name:
                                </div>
                                <div>
                                  {this.state.data.results.partner_name}
                                </div>
                              </div>
                              {(() => {
                                if (this.state.data.results.poi) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        POI:
                                      </div>
                                      <div>{this.state.data.results.poi}</div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (this.state.data.results.customer.email) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Email:
                                      </div>
                                      <div style={{ wordBreak: "break-all" }}>
                                        {this.state.data.results.customer.email}
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
                                  {this.state.data.results.customer.dob}
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Gender:
                                </div>
                                <div>
                                  {this.state.data.results.customer.gender}
                                </div>
                              </div>
                            </Col>
                            <Col md="6" style={{ paddingLeft: "5px" }}>
                              {(() => {
                                if (this.state.data.results.ckyc_number) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        CKYC Number:
                                      </div>
                                      <div style={{ wordBreak: "break-all" }}>
                                        {this.state.data.results.ckyc_number}
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Father's Name:
                                </div>
                                <div>
                                  {(() => {
                                    if (
                                      this.state.data.results.customer
                                        .parent_summary.father.first_name
                                    ) {
                                      return (
                                        <div>
                                          {
                                            this.state.data.results.customer
                                              .parent_summary.father.first_name
                                          }
                                        </div>
                                      );
                                    }
                                  })()}
                                </div>
                              </div>
                              {(() => {
                                if (
                                  this.state.data.results.customer
                                    .parent_summary.mother
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Mother's Name:
                                      </div>
                                      <div>
                                        <div>
                                          {
                                            this.state.data.results.customer
                                              .parent_summary.mother.first_name
                                          }
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Marital Status:
                                </div>
                                <div>
                                  {this.state.data.results.marital_status}
                                </div>
                              </div>
                              {(() => {
                                if (this.state.data.results.religion != null) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Religion:
                                      </div>
                                      <div>
                                        {this.state.data.results.religion}
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.nationality != null
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Nationality:
                                      </div>
                                      <div>
                                        {this.state.data.results.nationality}
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Phone No:
                                </div>
                                <div>
                                  {
                                    this.state.data.results.customer.phones[0]
                                      .number
                                  }
                                </div>
                              </div>
                              {(() => {
                                if (this.state.data.results.applications[0]) {
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
                                              .applications[0].current_residence
                                              .address.house_street
                                          }
                                        </p>
                                        <p style={{ marginBottom: "2px" }}>
                                          {
                                            this.state.data.results
                                              .applications[0].current_residence
                                              .address.landmark
                                          }
                                        </p>
                                        <p style={{ marginBottom: "2px" }}>
                                          {
                                            this.state.data.results
                                              .applications[0].current_residence
                                              .address.locality
                                          }
                                        </p>
                                        <p style={{ marginBottom: "2px" }}>
                                          {
                                            this.state.data.results
                                              .applications[0].current_residence
                                              .address.city
                                          }
                                        </p>
                                        <p style={{ marginBottom: "2px" }}>
                                          {
                                            this.state.data.results
                                              .applications[0].current_residence
                                              .address.district
                                          }
                                        </p>
                                        <p style={{ marginBottom: "2px" }}>
                                          {
                                            this.state.data.results
                                              .applications[0].current_residence
                                              .address.state
                                          }
                                          {"-"}
                                          {
                                            this.state.data.results
                                              .applications[0].current_residence
                                              .address.pincode
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
            </ModalBody>
          </Modal>
          {(() => {
            if (!this.state.data.results.applications.length == 0) {
              return (
                <Card>
                  <CardHeader>
                    <CardTitle style={{ color: "#7367f0" }}>
                      List of Applications
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Application ID</th>
                          <th>Partner Application ID</th>
                          <th style={{ width: "15%" }}>Date of Creation</th>
                          <th>Loan Amount</th>
                          <th>Disbursed Amount</th>
                          <th>Current Status</th>
                          <th>Date of Disbursement</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.data.results.applications.map(
                          (application, index) => (
                            <tr>
                              <td>
                                <Link
                                  to={`/v2/application/${application.partner_application_id}`}
                                >
                                  {application.application_id}
                                </Link>
                              </td>
                              <td>{application.partner_application_id}</td>
                              <td style={{ paddingLeft: "11.5px" }}>
                                {new Intl.DateTimeFormat("en-US", {
                                  month: "2-digit",
                                  day: "2-digit",
                                  year: "numeric",
                                })
                                  .format(
                                    application.status_timeline[0].updated_on
                                      .$date
                                  )
                                  .split("/")
                                  .reverse()
                                  .join("-")
                                  .replace(/(\d*)-(\d*)-(\d*)/, "$1-$3-$2")}
                              </td>
                              <td>
                                {application.loan_details.requested_loan_amount}
                              </td>
                              {(() => {
                                if (application.disbursement) {
                                  return (
                                    <td>{application.disbursement.amount}</td>
                                  );
                                } else {
                                  return (
                                    <td style={{ textAlign: "center" }}>-</td>
                                  );
                                }
                              })()}

                              <td>
                                {application.status_timeline[
                                  application.status_timeline.length - 1
                                ].status_message.replace(/_/g, " ")}
                              </td>
                              {(() => {
                                if (application.disbursement) {
                                  return (
                                    <td>
                                      {new Intl.DateTimeFormat("en-US", {
                                        month: "2-digit",
                                        day: "2-digit",
                                        year: "numeric",
                                      })
                                        .format(
                                          application.disbursement
                                            .disbursement_time.$date
                                        )
                                        .split("/")
                                        .reverse()
                                        .join("-")
                                        .replace(
                                          /(\d*)-(\d*)-(\d*)/,
                                          "$1-$3-$2"
                                        )}
                                    </td>
                                  );
                                } else {
                                  return (
                                    <td style={{ textAlign: "center" }}>-</td>
                                  );
                                }
                              })()}
                              <td>
                                <Link
                                  to={`/v2/${application.partner_application_id}/track`}
                                >
                                  <Button color="primary" size="sm">
                                    LOG
                                  </Button>
                                </Link>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              );
            }
          })()}
        </div>
      </>
    );
  }
}
export default IndividualCustomer;
