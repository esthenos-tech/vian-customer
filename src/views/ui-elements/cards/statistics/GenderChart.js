import React, { Component } from "react";
import { Card, CardTitle, CardBody, Row, Col } from "reactstrap";
import * as Icon from "react-icons/gi";
import * as Icon1 from "react-icons/io5";

class GenderChart extends Component {
  render() {
    return (
      <Card>
        <CardBody style={{ padding: "0.7rem 1.5rem 1.2rem 1.5rem" }}>
          <CardTitle className="mb-1">Gender</CardTitle>
          <Row>
            <Col xs="4" className="border-right-success">
              <Icon.GiMale size={26} color={"#0000FF"} />
              <span className="mb-1 ml-1 text-bold-600 text-danger">23k</span>
            </Col>
            <Col xs="4" className="border-right-success">
              <Icon.GiFemale size={26} color={"#ff8093"} />
              <span className="mb-1 ml-1 text-bold-600">19k</span>
            </Col>
            <Col xs="4">
              <Icon1.IoMaleFemaleSharp size={26} />
              <span className="mb-1 ml-1 text-bold-600">1k</span>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default GenderChart;
