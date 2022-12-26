import React, { useEffect } from "react";
import { useState } from "react";
import { Spinner, UncontrolledCarousel } from "reactstrap";
import {
  Card,
  CardBody,
  Row,
  Col,
  CardImg,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { FileText, Edit3, FilePlus } from "react-feather";
import UserTab from "./../Scrutiny/UserTab";
import man from "../../assets/img/pages/men.png";
import "./../Customer.scss";
import Avatar from "@material-ui/core/Avatar";
import sliderImage2 from "../../assets/img/pages/woman.png";
import "./Application.scss";
import UserSheet from "./../Scrutiny/UserSheet";
import { getApplicationDetails } from "../../components/dataLayer/ApplicationLayer";
import { Link, withRouter } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";

const Application = (props) => {
  const [active, setActive] = useState("1");
  const [centeredModal, setCenteredModal] = useState(false);
  const [centeredModal1, setCenteredModal1] = useState(false);
  const [centeredModal2, setCenteredModal2] = useState(false);
  const applicationId = props.match.params.id;
  const images = [
    {
      src: man,
      id: 1,
      altText: "Slide 1",
    },
    {
      src: sliderImage2,
      id: 2,
      altText: "Slide 2",
    },
    {
      src: man,
      id: 3,
      altText: "Slide 3",
    },
  ];
  const initialValuesForApplication = {
    loading: true,
    data: [],
    applicant_details: [],
    loan_details: [],
    loan_category: [],
    bank_details: [],
    coborrowers: [],
    business_details: [],
    personIdentityImage: [],
  };
  const [
    {
      loading,
      data,
      applicant_details,
      loan_details,
      loan_category,
      bank_details,
      coborrowers,
      business_details,
      personIdentityImage,
    },
    setState,
  ] = useState(initialValuesForApplication);
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  const getAllApplicationDetails = async () => {
    const response = await getApplicationDetails(props.match.params.id);
    if (response?.status == 200) {
      console.log("i am hear", response);
      setState((pervState) => ({
        ...pervState,
        loading: false,
        data: response?.data?.results,
        applicant_details: response?.data?.results?.applicant_details,
        loan_category: response?.data?.results?.loan_category,
        loan_details: response?.data?.results?.loan_details,
        bank_details: response?.data?.results?.bank_details,
        coborrowers: response?.data?.results?.coborrowers,
        business_details: response?.data?.results?.business_details,
        personIdentityImage:
          response?.data?.results?.applicant_details?.documents[0]?.links[0]
            ?.url,
      }));
    }
  };
  const personIdentityImageDataSet = [
    {
      src: personIdentityImage,
      id: 1,
      altText: "Photo id",
    },
  ];
  useEffect(() => {
    getAllApplicationDetails();
  }, [props.match.params.id]);
  return (
    <div>
      <Row>
        <Col sm="3">
          <Card className="mb-7">
            <span className="badge-status mr-1 bg-gradient-info">
              <b>Registration Ready</b>
            </span>
            <CardBody className="pb-0 p-7">
              <CardImg
                className="img-fluid mt-2 mb-7"
                alt="Customer Profile"
                src={personIdentityImage}
              />
              <Row className="pb-7">
                <Col sm="6" className="pr-0">
                  <div className="bg-success text-white py-0 bag">
                    <p className="mb-0 text-center font">Credit Score</p>
                    <p className="text-center mb-0 font-weight-bold _mt-3">
                      650
                    </p>
                  </div>
                </Col>
                <Col sm="6" className="pl-0">
                  <div className="bg-success text-white float-right py-0 bag">
                    <p className="mb-0 text-center font">Profile Score</p>
                    <p className="text-center mb-0 font-weight-bold _mt-3">
                      None
                    </p>
                    {/* <Link to={`/application/${props.match.params.id}/track`}>Log</Link> */}
                  </div>
                </Col>
              </Row>
              <Col sm="12" className="pb-1 px-0">
                <Link
                  to={`/application/${props.match.params.id}/track`}
                  className="link-text"
                >
                  <div className="bg-success text-white text-center w-100 bagTwo">
                    <TbListDetails className="log-icon" /> Log
                  </div>
                </Link>
              </Col>
            </CardBody>
          </Card>
          <Card className="mb-7 p-7" style={{ backgroundColor: "#e1c5f6" }}>
            <Row
              onClick={() => setCenteredModal(!centeredModal)}
              style={{ cursor: "pointer" }}
            >
              <Col sm="9" className="pl-2 mb-0 pt-7">
                <h6 style={{ color: "#7367f0", fontWeight: "600" }}>
                  {" "}
                  KYC Documents
                </h6>
              </Col>
              <Col sm="3">
                <Avatar
                  variant="rounded"
                  style={{
                    backgroundColor: "#7367f0",
                    height: "30px",
                    width: "30px",
                  }}
                >
                  <FileText size={18} />
                </Avatar>
              </Col>
            </Row>
          </Card>
          <Card className="mb-7 p-7" style={{ backgroundColor: "#e1c5f6" }}>
            <Row
              onClick={() => setCenteredModal1(!centeredModal1)}
              style={{ cursor: "pointer" }}
            >
              <Col sm="9" className="pl-2 mb-0 pt-7">
                <h6 style={{ color: "#7367f0", fontWeight: "600" }}>
                  {" "}
                  Signature
                </h6>
              </Col>
              <Col sm="3">
                <Avatar
                  variant="rounded"
                  style={{
                    backgroundColor: "#7367f0",
                    height: "30px",
                    width: "30px",
                  }}
                >
                  <Edit3 size={18} />
                </Avatar>
              </Col>
            </Row>
          </Card>
          <Card className="mb-7 p-7" style={{ backgroundColor: "#e1c5f6" }}>
            <Row
              onClick={() => setCenteredModal2(!centeredModal2)}
              style={{ cursor: "pointer" }}
            >
              <Col sm="9" className="pl-2 mb-0 pt-7">
                <h6 style={{ color: "#7367f0", fontWeight: "600" }}>
                  {" "}
                  Other Docs
                </h6>
              </Col>
              <Col sm="3">
                <Avatar
                  variant="rounded"
                  style={{
                    backgroundColor: "#7367f0",
                    height: "30px",
                    width: "30px",
                  }}
                >
                  <FilePlus size={18} />
                </Avatar>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col sm="9">
          {loading ? (
            <div className="text-center" style={{ marginTop: "12rem" }}>
              <Spinner type="grow" color="primary" size="lg" />
            </div>
          ) : (
            <UserTab
              active={active}
              toggleTab={toggleTab}
              applicant_details={applicant_details}
              loan_category={loan_category}
              loan_details={loan_details}
              bank_details={bank_details}
              coborrowers={coborrowers}
              business_details={business_details}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <UserSheet applicationId={applicationId} />
        </Col>
      </Row>
      <Modal
        isOpen={centeredModal}
        toggle={() => setCenteredModal(!centeredModal)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
          KYC Documents
        </ModalHeader>
        <ModalBody>
          <UncontrolledCarousel
            items={personIdentityImageDataSet}
            interval="1000"
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => setCenteredModal(!centeredModal)}
          >
            Close
          </Button>{" "}
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={centeredModal1}
        toggle={() => setCenteredModal1(!centeredModal1)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setCenteredModal1(!centeredModal1)}>
          Signature
        </ModalHeader>
        <ModalBody>
          <UncontrolledCarousel items={images} interval="1000" />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => setCenteredModal1(!centeredModal1)}
          >
            Close
          </Button>{" "}
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={centeredModal2}
        toggle={() => setCenteredModal2(!centeredModal2)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setCenteredModal2(!centeredModal2)}>
          Other Docs
        </ModalHeader>
        <ModalBody>
          <UncontrolledCarousel items={images} interval="1000" />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => setCenteredModal2(!centeredModal2)}
          >
            Close
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default withRouter(Application);
