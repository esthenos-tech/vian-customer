import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import * as Icon from "react-icons/fc";

const Rate = () => {
  return (
    <Card>
      <CardBody>
        <Row style={{ height: "100%" }}>
          <Col xs="4" className="pr-0">
            <div className="shadow rounded h-100 w-100 pl-1">
              <div className="shadow-sm rounded h-25 mb-1 w-50">
                <Icon.FcExport size={24} />
              </div>
              <p
                className="mb-2"
                style={{
                  fontSize: "12px",
                  lineHeight: "1.3rem",
                  fontWeight: "600",
                }}
              >
                Bounce <br /> Rate
              </p>
              <h6 className="text-success">5%</h6>
            </div>
          </Col>
          <Col xs="4" className="p-0">
            <div className="shadow rounded h-100 w-100 pl-1">
              <div className="shadow-sm  rounded h-25 mb-1 w-50">
                <Icon.FcComboChart size={24} />
              </div>
              <p
                className="mb-2"
                style={{
                  fontSize: "12px",
                  lineHeight: "1.3rem",
                  fontWeight: "600",
                }}
              >
                Cure <br /> Rate
              </p>
              <h6 className="text-success">45%</h6>
            </div>
          </Col>
          <Col xs="4" className="pl-0">
            <div className="shadow rounded h-100 w-100 pl-1">
              <div className="shadow-sm rounded h-25 mb-1 w-50">
                <Icon.FcDataProtection size={24} />
              </div>
              <p
                className="mb-2"
                style={{
                  fontSize: "12px",
                  lineHeight: "1.3rem",
                  fontWeight: "600",
                }}
              >
                Resump <br /> Rate
              </p>
              <h6 className="text-success">20%</h6>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Rate;
