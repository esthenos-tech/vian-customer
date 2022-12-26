import React, { Component } from "react";
import { Col, Card, CardBody } from "reactstrap";

class Partner extends Component {
  render() {
    return (
      <Col lg="3" sm="6">
        <Card
          onClick={() => this.props.partnerHandler(this.props.partner.code)}
        >
          <CardBody className="cursor-pointer">
            <div className="text-center w-100">
              <span className="text-bold-600">{`${this.props.partner.name}`}</span>
              <p className="mb-0">{`${this.props.partner.code}`}</p>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default Partner;
