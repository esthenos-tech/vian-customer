import React from "react";
import { User } from "react-feather";
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
import { HiOutlineCurrencyRupee } from "react-icons/hi";
const UserTabForm = ({ active, toggleTab, dataSet }) => {
  const data = dataSet[0].results;
  const branch = data?.branch;
  const lead_id = data?.lead_id;
  const lead_name = data?.lead_name;
  const rm_name = data?.rm_name;
  const phone_number = data?.phone_number;

  // personal details
  const personal_info = data?.personal_info;
  const aadhar_no = personal_info?.aadhar_no;
  const dob = personal_info?.dob;
  const driving_license_no = personal_info?.driving_license_no;
  const gender = personal_info?.gender;
  const pan_no = personal_info?.pan_no;
  const rationid_no = personal_info?.rationid_no;
  const voterid_no = personal_info?.voterid_no;

  // loadn details
  const loan_details = data?.loan_details;
  const category_code = loan_details?.category_code;
  const expected_loan_amount = loan_details?.expected_loan_amount;
  const product_code = loan_details?.product_code;
  const purpose_of_loan = loan_details?.purpose_of_loan;

  // contact details
  const contact_details = data?.contact_details;
  const address_type = contact_details?.address_type;
  const alternate_mobile = contact_details?.alternate_mobile;
  const city = contact_details?.city;
  const country = contact_details.country;
  const district = contact_details?.district;
  const email = contact_details?.email;
  const house_no = contact_details?.house_no;
  const house_street = contact_details?.house_street;
  const landmark = contact_details?.landmark;
  const mobile = contact_details?.mobile;
  const pincode = contact_details?.pincode;
  const state = category_code?.state;

  // business details
  const business_details = data?.business_details;
  const business_category = business_details?.business_category;
  const name_of_the_business = business_details?.name_of_the_business;
  const years_in_business = business_details?.years_in_business;

  console.log("business_details", business_details);

  console.log("dataSet", dataSet[0].results);
  return (
    <div>
      <Nav tabs className="text-center" justified>
        <NavItem>
          <NavLink
            active={active === "1"}
            className="m-0"
            onClick={() => toggleTab("1")}
          >
            <User size={27} className="mr-2" />
            <span className="fw-bold">Lead Details</span>
          </NavLink>
        </NavItem>
        <NavItem className=" ">
          <NavLink
            active={active === "2"}
            className="m-0"
            onClick={() => toggleTab("2")}
          >
            <HiOutlineCurrencyRupee size={27} className="mr-2" />

            <span className="fw-bold">Loan Details</span>
          </NavLink>
        </NavItem>

        <NavItem className=" ">
          <NavLink
            active={active === "3"}
            className="m-0"
            onClick={() => toggleTab("3")}
          >
            <HiOutlineCurrencyRupee size={27} className="mr-2" />

            <span className="fw-bold">Contact Details</span>
          </NavLink>
        </NavItem>

        <NavItem className=" ">
          <NavLink
            active={active === "4"}
            className="m-0"
            onClick={() => toggleTab("4")}
          >
            <HiOutlineCurrencyRupee size={27} className="mr-2" />

            <span className="fw-bold">Business Details</span>
          </NavLink>
        </NavItem>
      </Nav>
      <Card>
        <CardBody style={{ height: "230px" }}>
          <TabContent activeTab={active}>
            <TabPane tabId="1">
              <div className="personal_info">
                <Row>
                  <Col sm="6" className="border-right-secondary">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Lead Name:</div>
                      <div className="float-left">{lead_name}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Iead Id:</div>
                      <div className="float-left">{lead_id}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">RM Name:</div>
                      <div className="float-left">{rm_name}</div>
                    </div>

                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Gender:</div>
                      <div className="float-left">{gender}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Branch:</div>
                      <div className="float-left">{branch}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Phone Number:</div>
                      <div className="float-left">{phone_number}</div>
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Date Of Birth:
                      </div>
                      <div className="float-left">{dob}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Aadhar card no:
                      </div>
                      <div className="float-left">{aadhar_no}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Driving Licens:
                      </div>
                      <div className="float-left">{driving_license_no}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Pan No:</div>
                      <div className="float-left">{pan_no}</div>
                    </div>

                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Ration No:</div>
                      <div className="float-left">{rationid_no}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Voter No:</div>
                      <div className="float-left">{voterid_no}</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div className="personal_info">
                <Row>
                  <Col sm="6" className="border-right-secondary">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Loan Category Code:
                      </div>
                      <div className="float-left">{category_code}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Product Code:</div>
                      <div className="float-left">{product_code}</div>
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Expected Loan Amount:
                      </div>
                      <div className="float-left">{expected_loan_amount}</div>
                    </div>

                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Purpose of Loan:
                      </div>
                      <div className="float-left">{purpose_of_loan}</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tabId="3">
              <div className="personal_info">
                <Row>
                  <Col sm="6" className="border-right-secondary">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Email:</div>
                      <div className="float-left">{email}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Mobile:</div>
                      <div className="float-left">{mobile}</div>
                    </div>

                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Alternate Mobile:
                      </div>
                      <div className="float-left">{alternate_mobile}</div>
                    </div>

                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Address Type:</div>
                      <div className="float-left">{address_type}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">House No:</div>
                      <div className="float-left">{house_no}</div>
                    </div>

                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">House Street:</div>
                      <div className="float-left">{house_street}</div>
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">Pincode:</div>
                      <div className="float-left">{pincode}</div>
                    </div>

                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">landmark:</div>
                      <div className="float-left">{landmark}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">city:</div>
                      <div className="float-left">{city}</div>
                    </div>

                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">district:</div>
                      <div className="float-left">{district}</div>
                    </div>

                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">State:</div>
                      <div className="float-left">{state}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">country:</div>
                      <div className="float-left">{country}</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tabId="4">
              <div className="personal_info">
                <Row>
                  <Col sm="6" className="border-right-secondary">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Business Category:
                      </div>
                      <div className="float-left">{business_category}</div>
                    </div>
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Name Of The Business:
                      </div>
                      <div className="float-left">{name_of_the_business}</div>
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="d-flex customer__info">
                      <div className="font-weight-bold mr-1">
                        Years In Business:
                      </div>
                      <div className="float-left">{years_in_business}</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserTabForm;
