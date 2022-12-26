import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SingleDropDownFilter from "./SingleDropDownFilter";
import { searchLeadsFilterFormData } from "../components/dataLayer/Leads/index";
import VianTableComponent from "../components/VianTableComponent";
import { Card, CardBody, Col, Spinner } from "reactstrap";
import { Link } from "react-router-dom";

const Leads = () => {
  const initialFilterForm = {
    loading: true,
    data: [],
  };
  const [{ loading, data }, setFilterCreation] = useState(initialFilterForm);
  const [displayLabel, setDisplayLabel] = useState("");

  const handlerSubmitFilterFormDate = async (payload, tableLabel) => {
    setDisplayLabel(tableLabel);
    const response = await searchLeadsFilterFormData(payload);
    if (Array.isArray(response.results)) {
      if (response?.results) {
        setFilterCreation((prevState) => ({
          ...prevState,
          loading: false,
          data: response?.results,
        }));
      }
    }
    if (response && response?.message) {
      setFilterCreation((pervState) => ({
        ...pervState,
        loading: false,
        data: [],
      }));
      toast.error(response?.message);
      toast.warn("Showing static data");
    }
  };

  useEffect(() => {
    handlerSubmitFilterFormDate("NEW_LEAD", "New Leads");
  }, []);

  return (
    <Card>
      <CardBody>
        <Col>
          <SingleDropDownFilter
            handlerSubmitFilterFormDate={handlerSubmitFilterFormDate}
            dropDownData={dropDownData}
          />
        </Col>
        <hr />
        <>
          {loading ? (
            <div className="text-center">
              <Spinner type="grow" color="primary" size="lg" />
            </div>
          ) : (
            <VianTableComponent
              options={dataSet}
              keyValue="lead_id"
              columns={columns}
              tabletitle={displayLabel}
            />
          )}
        </>
      </CardBody>
    </Card>
  );
};

export default Leads;

const dropDownData = [
  {
    label: "New Leads",
    value: "NEW_LEAD",
  },
  {
    label: "Hot Leads",
    value: "SALES_QUALIFIED",
  },
  {
    label: "Follow Up",
    value: "FOLLOW_UP",
  },
  {
    label: "Converted Leads",
    value: "ORIGINATED_LEADS",
  },
  {
    label: "Rejected Leads",
    value: "REJECTED_LEADS",
  },
  {
    label: "Closed Leads",
    value: "CONVERTED_LEADS",
  },
];

const columns = [
  {
    dataField: "lead_id",
    sort: true,
    name: "LEAD ID",
    text: "LEAD ID",
    formatter: (cell, row) => (
      <Link to={`/leadr/${row.lead_id}`}> {cell} </Link>
    ),
  },
  {
    dataField: "lead_name",

    text: "LEAD NAME",

    classes: "w-auto",

    sort: true,
  },

  {
    dataField: "branch",

    text: "BRANCH",

    classes: "w-194-cust",

    sort: true,
  },

  {
    dataField: "rm_name",

    text: "RM NAME",

    classes: "w-75-cust",

    sort: true,
  },
  {
    dataField: "phone_number",

    text: "PHONE NUMBER",

    classes: "w-75-cust",

    sort: true,
  },
];
const dataSet = [
  {
    branch: "Kongad",
    business_details: {
      business_category: "",
      name_of_the_business: null,
      years_in_business: null,
    },
    contact_details: {
      address_type: "",
      alternate_mobile: "9797979494",
      city: "Bellary",
      country: "India",
      district: "Bellary",
      email: "sameer@esthenos.com",
      house_no: "Hdhdh",
      house_street: "Hshssh",
      landmark: "Bdhsbddb",
      locality: "Bsbsbssba",
      mobile: "9797979797",
      pincode: "583101",
      state: "Karnataka",
    },
    lead_id: "VIALEAD220621000001",
    lead_name: "Sameer",
    loan_details: {
      category_code: "MEL",
      expected_loan_amount: 350000,
      product_code: "8898",
      purpose_of_loan: "Business",
    },
    location: {
      tagged_address:
        "#2151, 2nd Cross HAL 2nd Stage Kodihalli, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560008, India",
    },
    personal_info: {
      aadhar_no: null,
      age: 36,
      dob: "1986-06-21",
      driving_license_no: null,
      father_name: "Aaaa",
      gender: "Male",
      image: null,
      name: "Sameer",
      pan_no: null,
      rationid_no: null,
      spouse_name: null,
      voterid_no: "HDHSBSVSVS",
    },
    phone_number: "9797979797",
    rm_name: "mika singh",
  },
];
