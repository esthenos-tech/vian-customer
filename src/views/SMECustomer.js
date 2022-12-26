import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
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
import "./SMECustomer.scss";
import axios from "axios";
import "react-alice-carousel/lib/alice-carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class SMECustomer extends React.Component {
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
    modalDetails: this.props.initialModalState,
    fadeDetails: true,
    baseURL: process.env.REACT_APP_BASE_URL,
    activeTab: "1",
    active: "1",
    activeTab1: "1",
    active1: "1",
    first_name: "",
    last_name: "",
    dob: "",
    gender: "",
    phone: "",
    poi: "",
    pan: "",
    email: "",
    fathername: "",
    mothername: "",
    address: "",
  };
  toggle = this.toggle.bind(this);
  toggle() {
    this.setState({
      modal: !this.state.modal,
      fade: !this.state.fade,
    });
  }

  toggleDetails = (event) => {
    this.setState({
      modalDetails: !this.state.modalDetails,
      fadeDetails: !this.state.fadeDetails,
      first_name: event.target.getAttribute("data-fname"),
      last_name: event.target.getAttribute("data-lname"),
      dob: event.target.getAttribute("data-dob"),
      gender: event.target.getAttribute("data-gender"),
      phone: event.target.getAttribute("data-phone"),
      poi: event.target.getAttribute("data-poi"),
      pan: event.target.getAttribute("data-pan"),
      email: event.target.getAttribute("data-email"),
      fathername: event.target.getAttribute("data-fathername"),
      mothername: event.target.getAttribute("data-mothername"),
      address: event.target.getAttribute("data-address"),
    });
  };
  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };
  toggleTab1 = (tab) => {
    if (this.state.activeTab1 !== tab) {
      this.setState({ activeTab1: tab });
    }
  };

  toggle1 = (tab) => {
    if (this.state.active !== tab) {
      this.setState({ active: tab });
    }
  };
  toggle2 = (tab) => {
    if (this.state.active1 !== tab) {
      this.setState({ active1: tab });
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
    this.setState({ data });
    const incorp_date = new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
      .format(
        this.state.data.results.customer_data.customer.incorporation_date.$date
      )
      .split("/")
      .reverse()
      .join("-")
      .replace(/(\d*)-(\d*)-(\d*)/, "$1-$3-$2");
    const highmark_fetch_date = new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
      .format(
        this.state.data.results.customer_data.last_highmark_fetched_date.$date
      )
      .split("/")
      .reverse()
      .join("-")
      .replace(/(\d*)-(\d*)-(\d*)/, "$1-$3-$2");
    this.setState({
      incorporationDate: incorp_date,
      lastHighmarkDDate: highmark_fetch_date,
    });
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
                            <b>Company Details</b>
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
                                  Company ID :
                                </div>
                                <div className="space">
                                  {this.state.data.results.customer_id}
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Company Name :
                                </div>
                                <div className="space">
                                  {
                                    this.state.data.results.customer_data
                                      .customer.company_name
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Previous Company Names :
                                </div>{" "}
                                {this.state.data.results.customer_data.customer.previous_company_names.map(
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
                                    this.state.data.results.customer_data
                                      .customer.industry
                                  }
                                </div>
                              </div>
                              {(() => {
                                if (
                                  this.state.data.results.customer_data.customer
                                    .registered_address.sector
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Sector:
                                      </div>
                                      <div className="space">
                                        {
                                          this.state.data.results.customer_data
                                            .customer.registered_address.sector
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.customer_data.customer
                                    .registered_address.sub_sector
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Sub Sector:
                                      </div>
                                      <div className="space">
                                        {
                                          this.state.data.results.customer_data
                                            .customer.registered_address
                                            .sub_sector
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Partner Code:
                                </div>
                                <div className="space">
                                  {this.state.data.results.partner_code}
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  GST Number:
                                </div>
                                <div className="space"></div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Incorporation Type:
                                </div>
                                <div className="space">
                                  {
                                    this.state.data.results.customer_data
                                      .customer.incorporation_type
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Incorporation Date:
                                </div>
                                <div className="space">
                                  {this.state.incorporationDate}
                                </div>
                              </div>
                            </Col>
                            <Col md="6" style={{ paddingLeft: "5px" }}>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Registered Address:
                                </div>
                                <div
                                  className="space"
                                  style={{ wordBreak: "break-word" }}
                                >
                                  {this.state.data.results.customer_data
                                    .customer.registered_address.house_street +
                                    " " +
                                    this.state.data.results.customer_data
                                      .customer.registered_address.landmark +
                                    " " +
                                    this.state.data.results.customer_data
                                      .customer.registered_address.locality +
                                    " " +
                                    this.state.data.results.customer_data
                                      .customer.registered_address.city +
                                    " " +
                                    this.state.data.results.customer_data
                                      .customer.registered_address.district +
                                    " " +
                                    this.state.data.results.customer_data
                                      .customer.registered_address.state +
                                    "-" +
                                    this.state.data.results.customer_data
                                      .customer.registered_address.pincode}
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Address Type :
                                </div>
                                <div className="space">
                                  {
                                    this.state.data.results.customer_data
                                      .customer.registered_address.address_type
                                  }
                                </div>
                              </div>
                              {this.state.data.results.customer_data.customer.other_addresses.map(
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
                                  Last Application Sanctioned Limit:
                                </div>
                                <div className="space">
                                  {
                                    this.state.data.results.customer_data
                                      .last_application_sanctioned_limit
                                  }
                                </div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Last Highmark fetched Date:
                                </div>
                                <div className="space">
                                  {this.state.lastHighmarkDDate}
                                </div>
                              </div>
                              {(() => {
                                if (
                                  this.state.data.results.customer_data.customer
                                    .email
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Email:
                                      </div>
                                      <div className="space">
                                        {this.data.results.customer.email}
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Sanction Date:
                                </div>
                                <div className="space"></div>
                              </div>
                              <div className="d-flex customer__info">
                                <div className="user-info-title font-weight-bold">
                                  Sanction Validity Date:
                                </div>
                                <div className="space"></div>
                              </div>
                              {(() => {
                                if (
                                  this.state.data.results.customer_data.customer
                                    .residence_stability
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Residence Stability unit :
                                      </div>
                                      <div className="space">
                                        {
                                          this.state.data.results.customer_data
                                            .customer.residence_stability.unit
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.customer_data.customer
                                    .residence_stability
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Residence Stability value :
                                      </div>
                                      <div className="space">
                                        {
                                          this.state.data.results.customer_data
                                            .customer.residence_stability.value
                                        }
                                      </div>
                                    </div>
                                  );
                                }
                              })()}
                              {(() => {
                                if (
                                  this.state.data.results.customer_data.customer
                                    .customer_profile
                                ) {
                                  return (
                                    <div className="d-flex customer__info">
                                      <div className="user-info-title font-weight-bold">
                                        Customer Profile:
                                      </div>
                                      <div className="space">
                                        {
                                          this.state.data.results.customer_data
                                            .customer.customer_profile
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
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </CardBody>
          </Card>
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
          <Modal
            isOpen={this.state.modalDetails}
            toggle={this.toggleDetails}
            className="modal-dialog-centered"
            scrollable={true}
          >
            <ModalHeader toggle={this.toggleDetails} className="bg-primary">
              <b>Details Of Promoter</b>
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col md="6">
                  <p>
                    <b>Name :</b>
                  </p>
                  <p>
                    <b>Date Of Birth :</b>
                  </p>
                  <p>
                    <b>Gender :</b>
                  </p>
                  <p>
                    <b>Phone Number :</b>
                  </p>
                  <p>
                    <b>POI :</b>
                  </p>
                  <p>
                    <b>Email :</b>
                  </p>
                  <p>
                    <b>Father Name :</b>
                  </p>
                  <p>
                    <b>Mother Name :</b>
                  </p>
                  <p>
                    <b>Address :</b>
                  </p>
                </Col>
                <Col md="6">
                  <p>{this.state.first_name + " " + this.state.last_name}</p>
                  <p>{this.state.dob}</p>
                  <p>{this.state.gender}</p>
                  <p>{this.state.phone}</p>
                  <p>{this.state.poi}</p>
                  <p>{this.state.email}</p>
                  <p>{this.state.fathername}</p>
                  <p>{this.state.mothername}</p>
                  <p style={{ wordWrap: "break-word" }}>{this.state.address}</p>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
          {(() => {
            if (!this.state.data.results.applications.length == 0) {
              return (
                <Card>
                  <CardHeader>
                    <div>
                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.activeTab1 === "1",
                            })}
                            onClick={() => {
                              this.toggle2("1");
                            }}
                          >
                            <Eye size={15} />
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <TabContent activeTab={this.state.activeTab1}>
                      <TabPane tabId="1">
                        <Nav tabs>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: this.state.active1 === "1",
                              })}
                              onClick={() => {
                                this.toggle2("1");
                              }}
                            >
                              <b>List Of Applications</b>
                            </NavLink>
                          </NavItem>
                          {(() => {
                            if (
                              !this.state.data.results.customer_data.customer
                                .promoters.length == 0
                            ) {
                              return (
                                <NavItem>
                                  <NavLink
                                    className={classnames({
                                      active: this.state.active1 === "2",
                                    })}
                                    onClick={() => {
                                      this.toggle2("2");
                                    }}
                                  >
                                    <b>List Of Promoters</b>
                                  </NavLink>
                                </NavItem>
                              );
                            }
                          })()}
                        </Nav>
                        <TabContent
                          className="py-50"
                          activeTab={this.state.active1}
                        >
                          <TabPane tabId="1">
                            <Table responsive>
                              <thead>
                                <tr>
                                  <th>Application ID</th>
                                  <th>Partner Application ID</th>
                                  <th style={{ width: "15%" }}>
                                    Date of Creation
                                  </th>
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
                                          to={`/application/sme/${application.partner_application_id}`}
                                        >
                                          {application.application_id}
                                        </Link>
                                      </td>
                                      <td>
                                        {application.partner_application_id}
                                      </td>
                                      <td style={{ paddingLeft: "11.5px" }}>
                                        {new Intl.DateTimeFormat("en-US", {
                                          month: "2-digit",
                                          day: "2-digit",
                                          year: "numeric",
                                        })
                                          .format(
                                            application.status_timeline[0]
                                              .updated_on.$date
                                          )
                                          .split("/")
                                          .reverse()
                                          .join("-")
                                          .replace(
                                            /(\d*)-(\d*)-(\d*)/,
                                            "$1-$3-$2"
                                          )}
                                      </td>
                                      <td>
                                        {
                                          application.loan_details
                                            .requested_loan_amount
                                        }
                                      </td>
                                      {(() => {
                                        if (application.disbursement) {
                                          return (
                                            <td>
                                              {application.disbursement.amount}
                                            </td>
                                          );
                                        } else {
                                          return (
                                            <td style={{ textAlign: "center" }}>
                                              -
                                            </td>
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
                                              {new Intl.DateTimeFormat(
                                                "en-US",
                                                {
                                                  month: "2-digit",
                                                  day: "2-digit",
                                                  year: "numeric",
                                                }
                                              )
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
                                            <td style={{ textAlign: "center" }}>
                                              -
                                            </td>
                                          );
                                        }
                                      })()}
                                      <td>
                                        <Link
                                          to={`/${application.partner_application_id}/track`}
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
                          </TabPane>
                          <TabPane tabId="2">
                            <Table>
                              <thead>
                                <tr>
                                  <th style={{ width: "64%" }}>Name</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.data.results.customer_data.customer.promoters.map(
                                  (promoter, index) => (
                                    <tr>
                                      <td>
                                        {promoter.person.name.first_name}{" "}
                                        {promoter.person.name.last_name}
                                      </td>
                                      <td>
                                        <Link>
                                          <Button
                                            color="primary"
                                            size="sm"
                                            data-fname={
                                              promoter.person.name.first_name
                                            }
                                            data-lname={
                                              promoter.person.name.last_name
                                            }
                                            data-dob={promoter.person.dob}
                                            data-email={promoter.person.email}
                                            data-gender={promoter.person.gender}
                                            data-poi={promoter.person.poi}
                                            data-phone={
                                              promoter.person.phones[0].number
                                            }
                                            data-fathername={
                                              promoter.person.parent_summary
                                                .father.first_name +
                                              " " +
                                              promoter.person.parent_summary
                                                .father.last_name
                                            }
                                            data-mothername={
                                              promoter.person.parent_summary
                                                .mother.first_name +
                                              " " +
                                              promoter.person.parent_summary
                                                .mother.last_name
                                            }
                                            data-address={
                                              promoter.address.house_street +
                                              " " +
                                              promoter.address.landmark +
                                              " " +
                                              promoter.address.locality +
                                              " " +
                                              promoter.address.city +
                                              " " +
                                              promoter.address.district +
                                              " " +
                                              promoter.address.state
                                            }
                                            onClick={this.toggleDetails}
                                          >
                                            Details
                                          </Button>
                                        </Link>
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </Table>
                          </TabPane>
                        </TabContent>
                      </TabPane>
                    </TabContent>
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
export default SMECustomer;
