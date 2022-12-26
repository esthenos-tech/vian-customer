import React from "react";
import {
  User,
  Pocket,
  TrendingUp,
  Users,
  Shield,
  Briefcase,
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
// import log from "../../assets/img/pages/001-log-file.png";
import "../Customer.scss";
import { BsBank } from "react-icons/bs";
// import { MdOutlineBusinessCenter } from "react-icons/md";

const UserTab = ({
  active,
  toggleTab,
  applicant_details,
  loan_category,
  loan_details,
  bank_details,
  coborrowers,
  business_details,
}) => {
  const {
    personal_info,
    contact_details,
    identity_proof,
    address_proof,
    kyc_info,
    credit_details,
    income_details,
  } = applicant_details;
  // personal details
  const name = personal_info?.name;
  const gender = personal_info?.gender;
  const marital_status = personal_info?.marital_status;
  const parent_summary = personal_info?.parent_summary;
  const dob = personal_info?.dob;
  const staying_for = contact_details[0]?.staying_for;
  const ownership = contact_details[0]?.ownership;
  const PhoneNumber = contact_details[0].phones.map((item) => {
    return { phone: item.number };
  });
  const id_type = kyc_info?.id_type;
  const addressData = contact_details[0]?.address;
  // Loan details
  const product_name = loan_details?.product_name;
  const requested_loan_amount = loan_details?.requested_loan_amount;
  const interest_rate = loan_details?.interest_rate;
  const tenure = loan_details?.tenure;
  const emi = loan_details?.emi;
  const product_code = loan_details?.product_code;
  const purpose_of_loan = loan_details?.purpose_of_loan;
  const repayment_mode = loan_details?.repayment_mode;
  // Credit details
  const bureau = credit_details?.bureau;
  const credit_statements = credit_details?.credit_statements;
  const report_html_key = credit_details?.report_html_key;
  const reportDate = "01/01/2022";
  const score = credit_details?.score;
  const total_balance_amount = credit_details?.total_balance_amount;
  const total_emi_amount = credit_details?.total_emi_amount;
  //personal bank details
  const {
    account_holder_name,
    account_number,
    account_type,
    bank_name,
    branch,
  } = bank_details[0];
  const IFSC = "SBIN0003432";
  // Co-Borrower
  const borrower_name = coborrowers[0]?.personal_info?.name;
  const borrower_father_name =
    coborrowers[0]?.personal_info?.parent_summary?.father;
  const borrower_mother_name =
    coborrowers[0]?.personal_info?.parent_summary?.mother;
  const borrower_gender = coborrowers[0]?.personal_info?.gender;
  const borrower_marital_status = coborrowers[0]?.personal_info?.marital_status;
  const borrower_dob = coborrowers[0]?.personal_info?.dob;
  const borrower_poi = coborrowers[0]?.identity_proof;
  const borrower_poa = coborrowers[0]?.address_proof;
  const borrower_occupation_details =
    coborrowers[0]?.occupation_details?.occupation_type;
  const borrower_KYC = coborrowers[0]?.kyc_info[0]?.id_type;
  // business details
  const business_name = business_details?.name;
  const business_category = business_details?.business_category;
  const business_owner = business_details?.place_ownership;
  // income details
  const gross_monthly_income = income_details?.gross_monthly_income;
  const agriculture_bank_credit = income_details?.agriculture_bank_credit;
  return (
    <Fragment>
      {/* <div className="w-25 float-right">
        <CardImg
          className="img-fluid w-50 float-right"
          alt="Customer Profile"
          src={log}
        />
      </div> */}
      {/* <Card className="p-0">
        <CardBody className="p-0"> */}
      <Nav tabs className="text-center" justified>
        <NavItem>
          <NavLink
            active={active === "1"}
            className="m-0"
            onClick={() => toggleTab("1")}
          >
            <User size={27} /> <br />
            <span className="fw-bold">Personal </span>
          </NavLink>
        </NavItem>
        <NavItem className=" ">
          <NavLink
            active={active === "2"}
            className="m-0"
            onClick={() => toggleTab("2")}
          >
            <Shield size={27} />
            <br />
            <span className="fw-bold">Loan </span>
          </NavLink>
        </NavItem>
        {/* <NavItem className=" ">
          <NavLink
            active={active === "3"}
            className="m-0"
            onClick={() => toggleTab("3")}
          >
            <FileText className="font-medium-3 me-50" />
            <span className="fw-bold">Employment </span>
          </NavLink>
        </NavItem> */}
        <NavItem>
          <NavLink
            active={active === "4"}
            className="m-0"
            onClick={() => toggleTab("4")}
          >
            <Pocket size={27} />
            <br />
            <span className="fw-bold">Credit </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "5"}
            className="m-0"
            onClick={() => toggleTab("5")}
          >
            <BsBank size={27} />
            <br />
            <span className="fw-bold">Bank </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "6"}
            className="m-0"
            onClick={() => toggleTab("6")}
          >
            <Users size={27} /> <br />
            <span className="fw-bold">Borrower </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "7"}
            className="m-0"
            onClick={() => toggleTab("7")}
          >
            <Briefcase size={27} /> <br />
            <span className="fw-bold">Business </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "8"}
            className="m-0"
            onClick={() => toggleTab("8")}
          >
            <TrendingUp size={27} /> <br />
            <span className="fw-bold">Income </span>
          </NavLink>
        </NavItem>
      </Nav>
      {/* </CardBody>
      </Card> */}
      <Card>
        <CardBody style={{ height: "365px" }}>
          <TabContent activeTab={active}>
            <TabPane tabId="1">
              <div className="personal_info">
                <Row>
                  <Col sm="6" className="border-right-secondary">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Name:</div>
                      <div className="float-left">
                        {name?.prefix}.{name?.first_name}&nbsp;
                        {name?.middle_name}&nbsp;{name?.last_name}
                      </div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Father's Name:
                      </div>
                      <div className="float-left">
                        {parent_summary?.father?.prefix}.
                        {parent_summary?.father?.first_name}&nbsp;
                        {parent_summary?.father?.middle_name}&nbsp;
                        {parent_summary?.father?.last_name}
                      </div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Mother's Name:
                      </div>
                      <div className="float-left">
                        {parent_summary?.mother?.prefix}.
                        {parent_summary?.mother?.first_name}&nbsp;
                        {parent_summary?.mother?.middle_name}&nbsp;
                        {parent_summary?.mother?.last_name}
                      </div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Gender:</div>
                      <div className="float-left">{gender}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Marital Status:
                      </div>
                      <div className="float-left">{marital_status}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">DOB:</div>
                      <div className="float-left">{dob}</div>
                    </div>

                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">POI:</div>
                      <div className="float-left">{identity_proof}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">POA :</div>
                      <div className="float-left">{address_proof}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        ID Validation :
                      </div>
                      <div className="float-left">{id_type}</div>
                    </div>
                  </Col>
                  <Col sm="6">
                    {/* <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Occupation Type:
                      </div>
                      <div className="float-left">{occupation_type}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Monthly Income:
                      </div>
                      <div className="float-left">{gross_monthly_income}</div>
                    </div> */}
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Mobile No :</div>
                      {PhoneNumber.map((item, index) => {
                        return (
                          <div className="float-left" key={index}>
                            {item.phone}
                          </div>
                        );
                      })}
                    </div>

                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Address:</div>
                      <div className="float-left">
                        {addressData?.house_no}.&nbsp;
                        {addressData?.house_street}.&nbsp;
                        <br />
                        {addressData?.address_type}.&nbsp;
                        {addressData?.locality}.&nbsp;
                        <br />
                        {addressData?.landmark}.&nbsp;
                        <br />
                        {addressData?.city}.&nbsp;
                        {addressData?.city_code}.&nbsp;
                        <br />
                        {addressData?.district}.&nbsp;
                        {addressData?.district_code}.&nbsp;
                        <br />
                        {addressData?.state}.&nbsp;
                        {addressData?.state_code}.&nbsp;
                        <br />
                        {addressData?.country}.&nbsp;
                        <br />
                        {addressData?.pincode}.&nbsp;
                        {addressData?.survey_no}.&nbsp;
                        {addressData?.built_of_area}
                      </div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Staying for (in months) :
                      </div>
                      <div className="float-left">{staying_for}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Ownership:</div>
                      <div className="float-left">{ownership}</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div className="loan_details">
                <Row>
                  <Col sm="6" className="border-right-secondary">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Loan Category :
                      </div>
                      <div className="float-left">{loan_category}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Product Name:</div>
                      <div className="float-left">{product_name}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Product Code:</div>
                      <div className="float-left">{product_code}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Purpose Of Loan:
                      </div>
                      <div className="float-left">{purpose_of_loan}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Repayment Mode:
                      </div>
                      <div className="float-left">{repayment_mode}</div>
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Required Loan Amount:
                      </div>
                      <div className="float-left">{requested_loan_amount}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Rate of Interest:
                      </div>
                      <div className="float-left">{interest_rate}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Tenure:</div>
                      <div className="float-left">{tenure}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Comfortable EMI:
                      </div>
                      <div className="float-left">{emi}</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tabId="3">
              <div className="employment_details">
                <Row>
                  <Col sm="6" className="border-right-secondary">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Employment Type:
                      </div>
                      <div className="float-left">Self Employed</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Name of Business Firm:
                      </div>
                      <div className="float-left">hfgu jkfgeuir jkfuie</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Nature of Business:
                      </div>
                      <div className="float-left">egifuy ehfgeY</div>
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Incorportation Date:
                      </div>
                      <div className="float-left">01/01/2022</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Business Vintage:
                      </div>
                      <div className="float-left">367</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Business Premise Ownership:
                      </div>
                      <div className="float-left">Rental</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tabId="4">
              <div className="credit_details">
                <Row>
                  <Col sm="6" className="border-right-secondary">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Bureau:</div>
                      <div className="float-left">{bureau}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Bureau Score:</div>
                      <div className="float-left">{score}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Report ID:</div>
                      <div className="float-left">1634728962964</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Report :</div>
                      <div className="float-left">
                        <a href={report_html_key}>View Report</a>
                      </div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Report Date:</div>
                      <div className="float-left">{reportDate}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Max DPD in last 3 months:
                      </div>
                      <div className="float-left">0</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Max DPD in last 12 months:
                      </div>
                      <div className="float-left">0</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Last 30 days credit enquiries:
                      </div>
                      <div className="float-left">0</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Total Balance Amount:
                      </div>
                      <div className="float-left">{total_balance_amount}</div>
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Active Loans:</div>
                      <div className="float-left">0</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Credit Card Loans:
                      </div>
                      <div className="float-left">0</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Gold Loans :</div>
                      <div className="float-left">0</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Home Loans:</div>
                      <div className="float-left">0</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Personal Loans:
                      </div>
                      <div className="float-left">0</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Clossed Loans:
                      </div>
                      <div className="float-left">0</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Total EMI Amount:
                      </div>
                      <div className="float-left">{total_emi_amount}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Overdue Amount:
                      </div>
                      <div className="float-left">0</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Credit Statements:
                      </div>
                      <div className="float-left">
                        {credit_statements || "0"}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tabId="5">
              <div className="bank_details">
                <Row>
                  <Col sm="6" className="border-right-secondary">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Bank Name:</div>
                      <div className="float-left">{bank_name}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Account Numbe:
                      </div>
                      <div className="float-left">{account_number}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Account Holder Name:
                      </div>
                      <div className="float-left">{account_holder_name}</div>
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Branch Name:</div>
                      <div className="float-left">{branch}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Account Types:
                      </div>
                      <div className="float-left">{account_type}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">IFSC:</div>
                      <div className="float-left">{IFSC}</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tabId="6">
              <div className="const borrower_info">
                <Row>
                  <Col sm="6" className="border-right-secondary">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Name:</div>
                      <div className="float-left">
                        {borrower_name.prefix}.&nbsp;{borrower_name.first_name}
                        &nbsp;{borrower_name.last_name}
                      </div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Father's Name:
                      </div>
                      <div className="float-left">
                        {borrower_father_name.prefix}&nbsp;
                        {borrower_father_name.first_name}&nbsp;
                        {borrower_father_name.last_name}
                      </div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Mother's Name:
                      </div>
                      <div className="float-left">
                        {borrower_mother_name.prefix}&nbsp;
                        {borrower_mother_name.first_name}&nbsp;
                        {borrower_mother_name.last_name}
                      </div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Gender:</div>
                      <div className="float-left">{borrower_gender}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Marital Status:
                      </div>
                      <div className="float-left">
                        {borrower_marital_status}
                      </div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">DOB:</div>
                      <div className="float-left">{borrower_dob}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Monthly Income:
                      </div>
                      <div className="float-left">786878</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">POI:</div>
                      <div className="float-left">{borrower_poi}</div>
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Occupation Type:
                      </div>
                      <div className="float-left">
                        {borrower_occupation_details}
                      </div>
                    </div>
                    {/* <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Mobile No.:</div>
                      <div className="float-left">9787567577</div>
                    </div> */}
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">POA :</div>
                      <div className="float-left">{borrower_poa}</div>
                    </div>
                    {/* <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Address:</div>
                      <div className="float-left">
                        Aasdsad Near Govt Hospital Bangalore Bangalore Karnataka
                        560097
                      </div>
                    </div> */}
                    {/* <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Staying for (in months) :
                      </div>
                      <div className="float-left">1</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Ownership:</div>
                      <div className="float-left">Rented</div>
                    </div> */}
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        ID Validation :
                      </div>
                      <div className="float-left">{borrower_KYC}</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tabId="7">
              <div className="business_info">
                <Row>
                  <Col sm="6" className="border-right-secondary">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Business Name:
                      </div>
                      <div className="float-left">{business_name}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Business Ownership:
                      </div>
                      <div className="float-left">{business_owner}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Business Category:
                      </div>
                      <div className="float-left">{business_category}</div>
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Workspace Details:
                      </div>
                      <div className="float-left">Salaried</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tabId="8">
              <div className="income_info">
                <Row>
                  <Col sm="6" className="border-right-secondary">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Gross Monthly Income:
                      </div>
                      <div className="float-left">{gross_monthly_income}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Agriculture Bank Credit:
                      </div>
                      <div className="float-left">
                        {agriculture_bank_credit}
                      </div>
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Workspace Details:
                      </div>
                      <div className="float-left">Salaried</div>
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

export default UserTab;
