import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Card, CardBody, Input } from "reactstrap";
import { getAssessmentSheetResult } from "../../components/dataLayer/ApplicationLayer";
import { BiSmile } from "react-icons/bi";
import "./Style.scss";
import { toast } from "react-toastify";

const AssessmentSheet = (props) => {
  const initialState = {
    loading: true,
    dataSet: [],
    cm_remarks: [],
    verification_done_by: [],
  };
  const [
    { loading, dataSet, cm_remarks, verification_done_by },
    setState,
  ] = useState(initialState);
  const getApplicationAssessmentSheetResults = async () => {
    const response = await getAssessmentSheetResult(props.match.params.id);
    if (response?.data?.results)
      setState((prevState) => ({
        ...prevState,
        loading: false,
        dataSet: response?.data?.results,
        cm_remarks: response?.data?.results?.cm_remarks,
        verification_done_by: response?.data?.results?.verification_done_by,
      }));
  };

  const age_remarks = cm_remarks?.age_remarks;
  const biz_invest_remarks = cm_remarks?.biz_invest_remarks;
  const biz_vintage_remarks = cm_remarks?.biz_vintage_remarks;
  const business_distance_from_branch_remarks =
    cm_remarks?.business_distance_from_branch_remarks;
  const business_stability_remarks = cm_remarks?.business_stability_remarks;
  const cb_dpd_remarks = cm_remarks?.cb_dpd_remarks;
  const cb_od_remarks = cm_remarks?.cb_od_remarks;
  const cb_remarks = cm_remarks?.cb_remarks;
  const collateral_distance_from_branch_remarks =
    cm_remarks?.collateral_distance_from_branch_remarks;
  const customer_emi_remarks = cm_remarks?.customer_emi_remarks;
  const dbr_remarks = cm_remarks?.dbr_remarks;
  const deficit_remarks = cm_remarks?.deficit_remarks;
  const emi_bounce_remarks = cm_remarks?.emi_bounce_remarks;
  const emi_delay_remarks = cm_remarks?.emi_delay_remarks;
  const emi_percent_remarks = cm_remarks?.emi_percent_remarks;
  const emi_remarks = cm_remarks?.emi_remarks;
  const end_use_details_remarks = cm_remarks?.end_use_details_remarks;
  const fin_assets_remarks = cm_remarks?.fin_assets_remarks;
  const foir_remarks = cm_remarks?.foir_remarks;
  const home_rent_remarks = cm_remarks?.home_rent_remarks;
  const imd_cheque_status_remarks = cm_remarks?.imd_cheque_status_remarks;
  const income_proof_considered_remarks =
    cm_remarks?.income_proof_considered_remarks;
  const interest_rate_remarks = cm_remarks?.interest_rate_remarks;
  const loan_amt_remarks = cm_remarks?.loan_amt_remarks;
  const ltv_applicable_remarks = cm_remarks?.ltv_applicable_remarks;
  const max_loan_remarks = cm_remarks?.max_loan_remarks;
  const no_of_deviation_remarks = cm_remarks?.no_of_deviation_remarks;
  const other_bounce_remarks = cm_remarks?.other_bounce_remarks;
  const other_loan_remarks = cm_remarks?.other_loan_remarks;
  const profile_observation_remarks = cm_remarks?.profile_observation_remarks;
  const prop_collateral_remarks = cm_remarks?.prop_collateral_remarks;
  const prop_loan_remarks = cm_remarks?.prop_loan_remarks;
  const prop_mortgage_remarks = cm_remarks?.prop_mortgage_remarks;
  const proposed_emi_remarks = cm_remarks?.proposed_emi_remarks;
  const remarks = cm_remarks?.remarks;
  const repayment_track_remarks = cm_remarks?.repayment_track_remarks;
  const residence_cum_office_remarks = cm_remarks?.residence_cum_office_remarks;
  const residence_distance_from_branch_remarks =
    cm_remarks?.residence_distance_from_branch_remarks;
  const residential_stability_remarks =
    cm_remarks?.residential_stability_remarks;
  const sanctioned_condition_remarks = cm_remarks?.sanctioned_condition_remarks;
  const surplus_loan_ratio_remarks = cm_remarks?.surplus_loan_ratio_remarks;
  const tenure_remarks = cm_remarks?.tenure_remarks;
  const work_place_remarks = cm_remarks?.work_place_remarks;

  const hanleFormData = (e) => {
    e.preventDefault();
    toast.info("Internal server error");
    console.log("data", e);
  };

  useEffect(() => {
    getApplicationAssessmentSheetResults();
  }, []);

  return (
    <Card>
      <CardBody>
        <section className="container_section" style={{ fontSize: "16px" }}>
          <div className="row">
            <div className="col-6" style={{ width: "100%" }}>
              <p style={{ paddingLeft: "50px" }}>
                &#10003; <b>Verification Done By:</b>
                <span className="ml-1">NA</span>
              </p>
            </div>
            <div className="col-6" style={{ width: "100%" }}>
              <p style={{ paddingLeft: "50px" }}>
                &#10003; <b>Sanction Done By: </b>
                <span className="ml-1">NA</span>
              </p>
            </div>
          </div>
        </section>
        <form onSubmit={hanleFormData}>
          <table className="table table-bordered grid-assessment-dashboard-sheet table-hover">
            <tbody>
              <tr>
                <td
                  colSpan="6"
                  className="text-center font-weight-bold table-primary"
                >
                  Assessment Dashboard Sheet
                </td>
              </tr>
              <tr>
                <td
                  colSpan="6"
                  className="text-center font-weight-bold table-info"
                >
                  CREDIT MANAGER
                </td>
              </tr>
              <tr>
                <td colSpan="6"></td>
              </tr>
              <tr>
                <td>Sr. No.</td>
                <td>Parameter</td>
                <td>Criteria</td>
                <td>Objective Grading</td>
                <td>Values</td>
                <td>CM Remarks</td>
              </tr>

              <tr>
                <td>1</td>
                <td>Age</td>
                <td>Between 21-60</td>
                <td>
                  <div className="d-flex justify-content-around">
                    <BiSmile className="smile-icon" />
                  </div>
                </td>
                <td>
                  <Input
                    type="text"
                    className="form-control"
                    disabled
                    value="122"
                  />
                </td>
                <td>
                  <textarea
                    id="age"
                    cols="1"
                    rows="1"
                    className="form-control"
                    defaultValue={age_remarks}
                  ></textarea>
                </td>
              </tr>

              <tr>
                <td>2</td>
                <td>Business vintage</td>
                <td>Greater than 3</td>
                <td>
                  <div className="d-flex justify-content-around">
                    <BiSmile className="smile-icon" />
                  </div>
                </td>
                <td>
                  <Input
                    type="text"
                    className="form-control"
                    disabled
                    value="4"
                  />
                </td>
                <td>
                  <textarea
                    cols="1"
                    rows="1"
                    className="form-control"
                    defaultValue={biz_vintage_remarks}
                  ></textarea>
                </td>
              </tr>

              <tr>
                <td>3</td>
                <td>Home Rented</td>
                <td>Y/N</td>
                <td>
                  <div className="d-flex justify-content-around">
                    <BiSmile className="smile-icon" />
                  </div>
                </td>
                <td>
                  <Input
                    type="text"
                    id="residence-details"
                    name="residence-details"
                    className="form-control"
                    value="N"
                    readOnly
                  />
                </td>
                <td>
                  <textarea
                    cols="1"
                    rows="1"
                    className="form-control"
                    defaultValue={home_rent_remarks}
                  ></textarea>
                </td>
              </tr>

              <tr>
                <td>4</td>
                <td>Credit Bureau Score</td>
                <td>
                  Pass (&gt;693) Under Consideration (Between 583-694) Fail
                  (&lt;584)
                </td>
                <td>
                  <div className="d-flex justify-content-around">
                    <BiSmile className="smile-icon" />
                  </div>
                </td>
                <td>
                  <Input
                    type="text"
                    id="residence-details"
                    name="residence-details"
                    className="form-control"
                    value="0"
                    readOnly
                  />
                </td>
                <td>
                  <textarea
                    cols="1"
                    rows="1"
                    className="form-control"
                    // defaultValue={home_rent_remarks}
                  ></textarea>
                </td>
              </tr>

              <tr>
                <td>5</td>
                <td>Work Place Rented</td>
                <td>Y/N</td>
                <td>
                  <div className="d-flex justify-content-around">
                    <BiSmile className="smile-icon" />
                  </div>
                </td>
                <td>
                  <Input
                    type="text"
                    id="workplace-details"
                    name="workplace-details"
                    className="form-control"
                    disabled
                    value="5444"
                  />
                </td>
                <td>
                  <textarea
                    cols="1"
                    rows="1"
                    defaultValue={work_place_remarks}
                    className="form-control"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>6</td>
                <td>High Mark / CIBIL check </td>
                <td>&lt;450</td>
                <td>
                  <div className="d-flex justify-content-around">
                    <BiSmile className="smile-icon" />
                  </div>
                </td>
                <td>
                  <Input
                    type="text"
                    id="highmark-score"
                    name="highmark-score"
                    className="form-control"
                    readOnly
                    value=""
                  />
                </td>
                <td>
                  <textarea
                    cols="1"
                    rows="1"
                    className="form-control"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>7</td>
                <td>Net Cash Surplus / (Deficit)</td>
                <td></td>
                <td>
                  <div className="d-flex justify-content-around">
                    <BiSmile className="smile-icon" />
                  </div>
                </td>
                <td>
                  <Input
                    type="text"
                    id="net-cash-surplus"
                    name="net-cash-surplus"
                    className="form-control"
                    value="67554"
                    disabled
                  />
                </td>
                <td>
                  <textarea
                    cols="1"
                    rows="1"
                    defaultValue={surplus_loan_ratio_remarks}
                    className="form-control"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>8</td>
                <td>Property offered as collateral</td>
                <td>Y/N</td>
                <td>
                  <div className="d-flex justify-content-around">
                    <BiSmile className="smile-icon" />
                  </div>
                </td>
                <td>
                  <Input
                    type="text"
                    className="form-control"
                    disabled
                    value="4546"
                  />
                </td>
                <td>
                  <textarea
                    cols="1"
                    defaultValue={prop_collateral_remarks}
                    rows="1"
                    className="form-control"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>9</td>
                <td>Free of Mortgage Property</td>
                <td>No of Property</td>
                <td>
                  <div className="d-flex justify-content-around">
                    <BiSmile className="smile-icon" />
                  </div>
                </td>
                <td>
                  <Input
                    type="text"
                    className="form-control"
                    readOnly
                    value=""
                  />
                </td>
                <td>
                  <textarea
                    cols="1"
                    rows="1"
                    defaultValue={prop_mortgage_remarks}
                    className="form-control"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>10</td>
                <td>
                  <span>Financial Assets</span>
                  <br />
                  <p>- Surrender Value of LIC Policies</p>
                  <p>- NSC</p>
                  <p>- Fixed deposits</p>
                </td>
                <td>Sum</td>
                <td>
                  <p className="btn-border-radius">53543</p>
                </td>
                <td>
                  <Input
                    type="number"
                    className="form-control"
                    id="financial_assets"
                    name="financial_assets"
                    value=""
                    readOnly
                  />
                </td>
                <td>
                  <textarea
                    cols="1"
                    rows="1"
                    defaultValue={fin_assets_remarks}
                    className="form-control"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>11</td>
                <td>Max delay in loan EMIs (No. Of Days)</td>
                <td>No of days</td>
                <td>
                  <p className="btn-border-radius">564</p>
                </td>
                <td>
                  <Input
                    type="text"
                    className="form-control"
                    value=""
                    readOnly
                  />
                </td>
                <td>
                  <textarea
                    cols="1"
                    defaultValue={max_loan_remarks}
                    rows="1"
                    className="form-control"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>12</td>
                <td>EMIs bounces in a year</td>
                <td>No. of Times</td>
                <td>
                  <p className="btn-border-radius">5454</p>
                </td>
                <td>
                  <Input
                    type="text"
                    className="form-control"
                    readOnly
                    value=""
                  />
                </td>
                <td>
                  <textarea
                    cols="1"
                    defaultValue={emi_bounce_remarks}
                    rows="1"
                    className="form-control"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>13</td>
                <td>Other cheque bounces in month</td>
                <td>No. of Times</td>
                <td>
                  <p className="btn-border-radius">546</p>
                </td>
                <td>
                  <Input
                    type="text"
                    className="form-control"
                    readOnly
                    value=""
                  />
                </td>
                <td>
                  <textarea
                    cols="1"
                    rows="1"
                    defaultValue={other_bounce_remarks}
                    className="form-control"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>14</td>
                <td>Loans O/S</td>
                <td>No. of Times</td>
                <td>
                  <p className="btn-border-radius">45356</p>
                </td>
                <td>
                  <Input
                    type="text"
                    value=""
                    className="form-control"
                    readOnly
                  />
                </td>
                <td>
                  <textarea
                    cols="1"
                    rows="1"
                    className="form-control"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>15</td>
                <td>
                  <span>Mix of O/s loans</span>
                  <br />
                  <p>- Home loan</p>
                  <p>- Auto loan</p>
                  <p>- Consumer loan</p>
                  <p>- Gold loan</p>
                  <p>- Loan against security</p>
                </td>
                <td>
                  <p className="assessment-16">%</p>
                  <p>54%</p>
                  <p>45%</p>
                  <p>33%</p>
                  <p>56%</p>
                </td>
                <td>
                  <p className="btn-border-radius assessment-16">454</p>
                  <p className="btn-border-radius">466</p>
                  <p className="btn-border-radius">546</p>
                  <p className="btn-border-radius">4654</p>
                  <p className="btn-border-radius">454</p>
                </td>
                <td>
                  <p className="btn-border-radius assessment-16">4564</p>
                  <p className="btn-border-radius">645</p>
                  <p className="btn-border-radius">454</p>
                  <p className="btn-border-radius">433</p>
                  <p className="btn-border-radius">435</p>
                </td>
                <td>
                  <textarea
                    cols="8"
                    rows="8"
                    className="form-control"
                    style={{ marginTop: "20px" }}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>16</td>
                <td>Investment in Business</td>
                <td>Abs Amt</td>
                <td>
                  <p className="btn-border-radius">4564</p>
                </td>
                <td>
                  <Input className="form-control" readOnly value="" />
                </td>
                <td>
                  <textarea
                    cols="1"
                    rows="1"
                    defaultValue={biz_invest_remarks}
                    className="form-control"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>17</td>
                <td>Net Cash Surplus to Requested Loan</td>
                <td>%</td>
                <td>
                  <p className="btn-border-radius">654</p>
                </td>
                <td>
                  <Input
                    type="text"
                    className="form-control disabled"
                    value=""
                    readOnly
                  />
                </td>
                <td>
                  <textarea
                    cols="1"
                    rows="1"
                    defaultValue={surplus_loan_ratio_remarks}
                    className="form-control"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>18</td>
                <td>
                  Loan Amount Recommended [ Product Applied : Two Wheeler Cash ]
                </td>
                <td></td>
                <td>
                  <p className="btn-border-radius">4543</p>
                </td>
                <td>
                  <Input
                    type="number"
                    id="loan_amount_recmd"
                    name="loan_amount_recmd"
                    className="form-control"
                    value=""
                    required
                    readOnly
                  />
                </td>
                <td>
                  <textarea
                    cols="1"
                    defaultValue={loan_amt_remarks}
                    rows="1"
                    className="form-control"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>19</td>
                <td>EMI of the Loan as % of Net Cash Surplus</td>
                <td>%</td>
                <td>
                  <p className="btn-border-radius">564</p>
                </td>
                <td>
                  <Input
                    type="text"
                    id="loan-emi-cash-surplus"
                    name="loan-emi-cash-surplus"
                    className="form-control"
                    disabled
                    value="543"
                    readOnly
                  />
                </td>
                <td>
                  <textarea
                    cols="1"
                    rows="1"
                    className="form-control"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>20</td>
                <td>Customer ok with EMI amount </td>
                <td>Absolute</td>
                <td>
                  <p className="btn-border-radius">454</p>
                </td>
                <td>
                  <Input
                    type="number"
                    id="emi_comfortable"
                    name="emi_comfortable"
                    className="form-control"
                    value=""
                    readOnly
                  />
                </td>
                <td>
                  <textarea
                    cols="1"
                    defaultValue={customer_emi_remarks}
                    rows="1"
                    className="form-control"
                  ></textarea>
                </td>
              </tr>

              <tr>
                <td>21</td>
                <td>DBR Ratio (%)</td>
                <td>Absolute</td>
                <td>
                  <p className="btn-border-radius">454</p>
                </td>
                <td>
                  <Input
                    type="number"
                    id="emi_comfortable"
                    name="emi_comfortable"
                    className="form-control"
                    value=""
                    readOnly
                  />
                </td>
                <td>
                  <textarea
                    cols="1"
                    defaultValue={customer_emi_remarks}
                    rows="1"
                    className="form-control"
                  ></textarea>
                </td>
              </tr>

              <tr>
                <td>22</td>
                <td>Tenure</td>
                <td>Absolute Months</td>
                <td>
                  <p className="btn-border-radius">453</p>
                </td>
                <td>
                  <Input
                    type="number"
                    id="tenure"
                    name="tenure"
                    className="form-control"
                    value=""
                    required
                    readOnly
                  />
                </td>
                <td>
                  <textarea
                    cols="1"
                    defaultValue={tenure_remarks}
                    rows="1"
                    className="form-control"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>23</td>
                <td>Property Value/Loan </td>
                <td>As %</td>
                <td>
                  <p className="btn-border-radius">453</p>
                </td>
                <td>
                  <Input
                    type="text"
                    className="form-control text-right"
                    disabled
                    readOnly
                    value="23"
                  />
                </td>
                <td>
                  <textarea
                    cols="1"
                    defaultValue={prop_loan_remarks}
                    rows="1"
                    className="form-control"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>24</td>
                <td>Interest Rate(%)</td>
                <td></td>
                <td>
                  <p className="btn-border-radius">4335</p>
                </td>
                <td>
                  <Input
                    type="number"
                    id="interest_rate"
                    name="interest_rate"
                    className="form-control text-left"
                    value=""
                    required
                    readOnly
                  />
                </td>
                <td>
                  <textarea
                    cols="1"
                    defaultValue={interest_rate_remarks}
                    rows="1"
                    className="form-control"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>25</td>
                <td>EMI</td>
                <td>Absolute</td>
                <td>
                  <p className="btn-border-radius">543</p>
                </td>
                <td>
                  <Input
                    name="loan-emi"
                    type="text"
                    id="loan-emi"
                    value=""
                    className="form-control"
                    readOnly
                  />
                </td>
                <td>
                  <textarea
                    cols="1"
                    // defaultValue={}
                    rows="1"
                    className="form-control"
                  ></textarea>
                </td>
              </tr>

              <tr>
                <td>26</td>
                <td>Proposed EMI</td>
                <td>Absolute</td>
                <td>
                  <p className="btn-border-radius">543</p>
                </td>
                <td>
                  <Input
                    name="loan-emi"
                    type="text"
                    id="loan-emi"
                    value=""
                    className="form-control"
                    readOnly
                  />
                </td>
                <td>
                  <textarea
                    cols="1"
                    defaultValue={proposed_emi_remarks}
                    rows="1"
                    className="form-control"
                  ></textarea>
                </td>
              </tr>

              <tr>
                <td>27</td>
                <td>Remarks</td>
                <td></td>
                <td>
                  <p className="btn-border-radius">4536</p>
                </td>
                <td>
                  <textarea
                    cols="3"
                    rows="3"
                    name="kyc-remarks"
                    type="text"
                    id="kyc-remarks"
                    className="form-control"
                    readOnly
                    defaultValue={remarks}
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-around">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default withRouter(AssessmentSheet);
