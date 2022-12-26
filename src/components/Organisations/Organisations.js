import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { NavLink } from "react-router-dom";

const organisations = () => {
  return (
    <React.Fragment>
      <Row>
        <Col lg="3" sm="6">
          <NavLink to="/organisation/locationupdate">
            <Card>
              <CardBody>
                <div className="text-center w-100">
                  <span className="text-bold-600">Update Location</span>
                </div>
              </CardBody>
            </Card>
          </NavLink>
        </Col>
        <Col lg="3" sm="6">
          <NavLink to="/organisation/employee">
            <Card>
              <CardBody>
                <div className="text-center w-100">
                  <span className="text-bold-600">Employees</span>
                </div>
              </CardBody>
            </Card>
          </NavLink>
        </Col>
        {/* <Col lg="3" sm="6">
          <NavLink to="/organisation/partners">
            <Card>
              <CardBody>
                <div className="text-center w-100">
                  <span className="text-bold-600 align-self-center">
                    Partners
                  </span>
                </div>
              </CardBody>
            </Card>
          </NavLink>
        </Col> */}
        <Col lg="3" sm="6">
          <NavLink to="/organisation/upload_document">
            <Card>
              <CardBody>
                <div className="text-center w-100">
                  <span className="text-bold-600 align-self-center">
                    Upload Files
                  </span>
                </div>
              </CardBody>
            </Card>
          </NavLink>
        </Col>
        <Col lg="3" sm="6">
          <NavLink to="/organisation/status">
            <Card>
              <CardBody>
                <div className="text-center w-100">
                  <span className="text-bold-600 align-self-center">
                    Status Creation
                  </span>
                </div>
              </CardBody>
            </Card>
          </NavLink>
        </Col>
        <Col lg="3" sm="6">
          <NavLink to="/organisation/settings">
            <Card>
              <CardBody>
                <div className="text-center w-100">
                  <span className="text-bold-600 align-self-center">
                    Settings
                  </span>
                </div>
              </CardBody>
            </Card>
          </NavLink>
        </Col>
        <Col lg="3" sm="6">
          <NavLink to="/organisation/update-collection-dates">
            <Card>
              <CardBody>
                <div className="text-center w-100">
                  <span className="text-bold-600 align-self-center">
                    Update Collection Dates
                  </span>
                </div>
              </CardBody>
            </Card>
          </NavLink>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default organisations;
