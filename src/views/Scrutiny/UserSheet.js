import React, { useState } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { NavLink } from "react-router-dom";
import {
  FcDataSheet,
  FcComboChart,
  FcStatistics,
  FcBullish,
  FcPositiveDynamic,
  FcLibrary,
  FcMoneyTransfer,
} from "react-icons/fc";
import "./Style.scss";
import ModalComponent from "./ModalComponent";

const UserSheet = (applicationId) => {
  const [modalIsOpenLawyer, setModalIsOpenlawyer] = useState(false);
  const [modalIsOpenVlauer, setModalIsOpenValuer] = useState(false);

  const handleLawyerModal = () => {
    setModalIsOpenlawyer(true);
  };
  const handlerValuerModal = () => {
    setModalIsOpenValuer(true);
  };

  const handleFormClose = () => {
    setModalIsOpenlawyer(false);
    setModalIsOpenValuer(false);
  };
  const handleForm = () => {};
  return (
    <>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <div className="d-flex justify-content-center">
                <NavLink
                  to={`/cashflow_analysis/${applicationId.applicationId}`}
                >
                  <FcComboChart className="w-100 shrink-on-hover icons-cust" />
                  <div className="text-center w-100">
                    <span className="text-bold-600">Cash Flow</span>
                  </div>
                </NavLink>
              </div>
            </Col>
            <Col>
              <div className="d-flex justify-content-center">
                <NavLink to={`/balance_sheet/${applicationId.applicationId}`}>
                  <FcDataSheet className="w-100 shrink-on-hover icons-cust" />
                  <div className="text-center w-100">
                    <span className="text-bold-600">Balance Sheet</span>
                  </div>
                </NavLink>
              </div>
            </Col>
            <Col>
              <div className="d-flex justify-content-center">
                <NavLink to={`/bre_result/${applicationId.applicationId}`}>
                  <FcStatistics className="w-100 shrink-on-hover icons-cust" />
                  <div className="text-center w-100">
                    <span className="text-bold-600">BRE Result</span>
                  </div>
                </NavLink>
              </div>
            </Col>
            <Col>
              <div className="d-flex justify-content-center">
                <NavLink
                  to={`/assessment_sheet/${applicationId.applicationId}`}
                >
                  <FcBullish className="w-100 shrink-on-hover icons-cust" />
                  <div className="text-center w-100">
                    <span className="text-bold-600">Assessment Sheet</span>
                  </div>
                </NavLink>
              </div>
            </Col>
            <Col>
              <div className="d-flex justify-content-center">
                <NavLink to="/profile_score">
                  <FcPositiveDynamic className="w-100 shrink-on-hover icons-cust" />
                  <div className="text-center w-100">
                    <span className="text-bold-600">Profile Score</span>
                  </div>
                </NavLink>
              </div>
            </Col>
            <Col>
              <div className="d-flex justify-content-center">
                <div onClick={handleLawyerModal} className="link-styles">
                  <FcLibrary className="w-100 shrink-on-hover icons-cust" />
                  <div className="text-center w-100">
                    <span className="text-bold-600 ">Assign Lawyer</span>
                    <ModalComponent
                      title="Assign Lawyer"
                      modalIsOpen={modalIsOpenLawyer}
                      options={optionsLawyer}
                      handleFormClose={handleFormClose}
                      handleForm={handleForm}
                      msg="Lawyer is assigned"
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col>
              <div className="d-flex justify-content-center">
                <div onClick={handlerValuerModal} className="link-styles">
                  <FcMoneyTransfer className="w-100 shrink-on-hover icons-cust" />
                  <div className="text-center w-100">
                    <span className="text-bold-600">Assign Valuer</span>
                    <ModalComponent
                      title="Assign Valuer"
                      modalIsOpen={modalIsOpenVlauer}
                      options={optionsValuers}
                      handleFormClose={handleFormClose}
                      msg="Valuer is assigned"
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default UserSheet;

const optionsLawyer = [
  {
    label: "Lawyer 1",
    value: "val1",
  },
  {
    label: "Lawyer 2",
    value: "val2",
  },
  {
    label: "Lawyer 3",
    value: "val3",
  },
  {
    label: "Lawyer 4",
    value: "val4",
  },
  {
    label: "Lawyer 5",
    value: "val5",
  },
  {
    label: "Lawyer 6",
    value: "val6",
  },
];
const optionsValuers = [
  {
    label: "Valuers 1",
    value: "val1",
  },
  {
    label: "Valuers 2",
    value: "val2",
  },
  {
    label: "Valuers 3",
    value: "val3",
  },
  {
    label: "Valuers 4",
    value: "val4",
  },
  {
    label: "Valuers 5",
    value: "val5",
  },
  {
    label: "Valuers 6",
    value: "val6",
  },
];
