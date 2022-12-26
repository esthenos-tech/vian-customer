import React from "react";
import {
  User,
  FileText,
  Layers,
  Pocket,
  PieChart,
  UserCheck,
  Trello,
  TrendingUp,
} from "react-feather";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";
import { Fragment } from "react";
import "../Customer.scss";

const SpouseTab = ({ active, toggleTab }) => {
  return (
    <Fragment>
      <Nav pills>
        <NavItem>
          <NavLink
            active={active === "1"}
            className="m-0"
            style={{ padding: "0.786rem 1.5rem" }}
            onClick={() => toggleTab("1")}
          >
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">Spouse </span>
          </NavLink>
        </NavItem>
      </Nav>
      <Card>
        <CardBody>
          <TabContent activeTab={active}>
            <TabPane tabId="1">
              <div className="personal_info">
                <Row>
                  <Col sm="6" className="border-right-secondary">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Name:</div>
                      <div className="float-left">Guru Padukone</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Father's Name:
                      </div>
                      <div className="float-left">shhfjh yegrfyiwio</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Mother's Name:
                      </div>
                      <div className="float-left">shhfjh yegrfyiwio</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Gender:</div>
                      <div className="float-left">shhfjh yegrfyiwio</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Marital Status:
                      </div>
                      <div className="float-left">shhfjh yegrfyiwio</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">DOB:</div>
                      <div className="float-left">01/10/2010</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Monthly Income:
                      </div>
                      <div className="float-left">786878</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">POI:</div>
                      <div className="float-left">PAN</div>
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Occupation Type:
                      </div>
                      <div className="float-left">Salaried</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Mobile No.:</div>
                      <div className="float-left">9787567577</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">POA :</div>
                      <div className="float-left">Gas Bill</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Address:</div>
                      <div className="float-left">
                        Aasdsad Near Govt Hospital Bangalore Bangalore Karnataka
                        560097
                      </div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Staying for (in months) :
                      </div>
                      <div className="float-left">1</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Ownership:</div>
                      <div className="float-left">Rented</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        ID Validation :
                      </div>
                      <div className="float-left">VOTER_ID</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default SpouseTab;
