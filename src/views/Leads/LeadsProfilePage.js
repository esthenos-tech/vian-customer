import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
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
  Spinner,
} from "reactstrap";
import man from "../../assets/img/pages/dummy-image.jpg";
import UserTabForm from "./UserTabForm";
import "./LeadsProfilePage.scss";
import "./../Customer.scss";
import UpdateStatusForm from "../Application/components/UpdateStatusForm";
import {
  getAllLeadsPersonalDetails,
  submitUpdateLeadsReassign,
} from "../../components/dataLayer/Leads";
import { toast } from "react-toastify";
import GeolocationContainer from "../../components/OrganisationUpdateLocation/Component/GeolocationContainer";

const LeadsProfilePage = (props) => {
  const [active, setActive] = useState("1");
  const leadId = props.match.params.id;
  const lablenames = ["Branch Re-assignment", "RM Re-assignment", "Re-Assign"];
  const defaultLocationOnload = [12.96456705437621, 77.64380317571589];
  const initialState = {
    loading: false,
    data: [],
  };
  const [{ loading, data }, setInitialState] = useState(initialState);
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  const textToDiisplay = "Business Location by RM";
  const handleSubmitUpdateData = async (payloadData) => {
    const payload = {
      ...payloadData,
      update_type: "application_reassignment",
    };
    const response = await submitUpdateLeadsReassign(leadId, payload);
    if (response) {
      toast.warn("Technical issue detected");
    }
  };

  const getLeadsDetails = async () => {
    const response = await getAllLeadsPersonalDetails(leadId);
    if (response?.status === 200) {
      console.log("i am hear", response);
      setInitialState((pervState) => ({
        ...pervState,
        loading: false,
        data: response?.data?.results,
      }));
    }
  };
  console.log("data", data);

  useEffect(() => {
    getLeadsDetails();
  }, []);

  return (
    <Row>
      <Col sm="3">
        <Card className="mb-7">
          <span className="badge-status mr-1 bg-gradient-info">
            <b>Leads Image</b>
          </span>
          <CardBody>
            <CardImg
              className="img-fluid my-2 mb-7"
              alt="Customer Profile"
              src={man}
            />
            <GeolocationContainer
              defaultLocationOnload={defaultLocationOnload}
              textToDiisplay={textToDiisplay}
            ></GeolocationContainer>
          </CardBody>
        </Card>
      </Col>
      <Col sm="9">
        {loading ? (
          <div className="text-center" style={{ marginTop: "12rem" }}>
            <Spinner type="grow" color="primary" size="lg" />
          </div>
        ) : (
          <UserTabForm
            active={active}
            toggleTab={toggleTab}
            dataSet={dataSet}
          />
        )}
      </Col>
      <Col sm="12">
        <Card>
          <CardBody>
            <UpdateStatusForm
              leadId={leadId}
              handleSubmitUpdateData={handleSubmitUpdateData}
              dropDownNames={lablenames}
              menuPlacementMainDropDown="auto"
              menuPlacementSubDropDown="auto"
            />
          </CardBody>
        </Card>
      </Col>
      <Col sm="12">
        <Card></Card>
      </Col>
    </Row>
  );
};

export default withRouter(LeadsProfilePage);

const dataSet = [
  {
    results: {
      branch: "Mankara",
      business_details: {
        business_category: "Fashion Showroom",
        name_of_the_business: "Suhani Textiles",
        years_in_business: 3,
      },
      contact_details: {
        address_type: "",
        alternate_mobile: "9029361427",
        city: "HAL",
        country: "",
        district: "Bangalore",
        email: "nitin@esthenos.com",
        house_no: "Raghavendra Nilaya",
        house_street: "",
        landmark: "",
        locality: "",
        mobile: "9029361427",
        pincode: "560008",
        state: "Karnataka",
      },
      lead_id: "VIALEAD220914000007",
      lead_name: "Suhani Rai",
      loan_details: {
        category_code: "MEL",
        expected_loan_amount: 500000,
        product_code: null,
        purpose_of_loan: "1",
      },
      location: {
        tagged_address: "Newww Data",
      },
      personal_info: {
        aadhar_no: "10004571234",
        age: 22,
        dob: "2021-09-24",
        driving_license_no: "DI1234345",
        father_name: "SS Father",
        gender: "Female",
        image: null,
        name: "Suhani Rai",
        pan_no: "BMWEPG96",
        rationid_no: "assdsdsdsd334w",
        spouse_name: null,
        voterid_no: "XUV908900",
      },
      phone_number: "9029361427",
      rm_name: "mika singh",
    },
  },
];
