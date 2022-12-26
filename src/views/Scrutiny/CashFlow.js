import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Card, CardBody, Spinner } from "reactstrap";
import { getCashFlowResult } from "../../components/dataLayer/ApplicationLayer";

const CashFlow = (props) => {
  const initialState = {
    loading: true,
    dataSet: [],
    home_expenditure: [],
  };
  const [{ loading, dataSet, home_expenditure }, setState] = useState(
    initialState
  );
  const getApplicationCashFlowResults = async () => {
    const response = await getCashFlowResult(props.match.params.id);
    console.log("data ", response?.data);
    setState((prevState) => ({
      ...prevState,
      loading: false,
      dataSet: response?.data?.results,
      home_expenditure: response?.data?.results?.home_expenditure,
    }));
  };
  // const business_details = dataSet?.business_details;
  // const business_loan_emi = dataSet?.business_loan_emi;
  // const business_total_income = dataSet?.business_total_income;
  // const house_loan_emi = dataSet?.house_loan_emi;
  // const income_details = dataSet?.income_details;
  // const net_profit_from_business = dataSet?.net_profit_from_business;
  // const other_loan_emi = dataSet?.other_loan_emi;
  // const total_emi = dataSet?.total_emi;

  useEffect(() => {
    getApplicationCashFlowResults();
  }, []);

  console.log("app id", props.match.params.id);
  return (
    <Card>
      <CardBody>
        {loading ? (
          <div className="text-center">
            <Spinner type="grow" color="primary" size="lg" />
          </div>
        ) : (
          <table className="table table-bordered table table-hover ">
            <tbody>
              <tr>
                <td
                  colspan="2"
                  className="text-center font-weight-bold table-primary"
                >
                  Guru Padukone
                </td>
              </tr>
              <tr>
                <td
                  colspan="2"
                  className="text-center font-weight-bold table-info"
                >
                  Cash Flow Analysis
                </td>
              </tr>
              <tr>
                <td
                  colspan="2"
                  className="text-center "
                  style={{ fontSize: "16px" }}
                >
                  <b>Income Detials</b>
                </td>
              </tr>
              <tr>
                <td>Business Income</td>
                <td className="text-right">343</td>
              </tr>
              <tr>
                <td>Other Income</td>
                <td className="text-right">454</td>
              </tr>
              <tr>
                <td>Rent Income</td>
                <td className="text-right">3242</td>
              </tr>
              <tr>
                <td>Salary/Pension Income</td>
                <td className="text-right">3124</td>
              </tr>
              <tr>
                <td>
                  Agriculture Income (40% will be considered in Total Income)
                </td>
                <td className="text-right">3432</td>
              </tr>
              <tr>
                <td>Dairy Income</td>
                <td className="text-right">354</td>
              </tr>
              <tr className="table-secondary">
                <td>
                  <b>Total Income</b>
                </td>
                <td className="text-right">
                  <b>3543</b>
                </td>
              </tr>
              <tr>
                <td
                  colspan="2"
                  className="text-center"
                  style={{ fontSize: "16px" }}
                >
                  <b>Office / Work expenses</b>
                </td>
              </tr>
              <tr>
                <td>Office Rent</td>
                <td className="text-right">3432</td>
              </tr>
              <tr>
                <td>Wages & Salaries</td>
                <td className="text-right">4534</td>
              </tr>
              <tr>
                <td>Electricity</td>
                <td className="text-right">3543</td>
              </tr>
              <tr>
                <td>Petrol</td>
                <td className="text-right">3453</td>
              </tr>
              <tr>
                <td>Freight Expenses</td>
                <td className="text-right">35324</td>
              </tr>
              <tr>
                <td>Other</td>
                <td className="text-right">35432</td>
              </tr>
              <tr className="table-secondary">
                <td style={{ borderBottom: "1px solid #d4d4d4" }}>
                  <b>Total Operating Expenses</b>
                </td>
                <td
                  className="text-right"
                  style={{ borderBottom: "1px solid #d4d4d4" }}
                >
                  <b>3543</b>
                </td>
              </tr>
              <tr className="table-secondary">
                <td>
                  <b>Net Profit from Business</b>
                </td>
                <td className="text-right">
                  <b>2343</b>
                </td>
              </tr>
              <tr>
                <td
                  style={{ fontSize: "16px" }}
                  colspan="2"
                  className="text-center"
                >
                  <b>Home / Personal Expenses</b>
                </td>
              </tr>
              <tr>
                <td className="text-left">House Rent</td>
                <td className="text-right">{home_expenditure.rent_expenses}</td>
              </tr>
              <tr>
                <td>Electricity</td>
                <td className="text-right">
                  {home_expenditure?.electricity_expenses}
                </td>
              </tr>
              <tr>
                <td>Grocery</td>
                <td className="text-right">
                  {home_expenditure?.grocery_expenses}
                </td>
              </tr>
              <tr>
                <td>Conveyance</td>
                <td className="text-right">
                  {home_expenditure?.conveyance_expenses}
                </td>
              </tr>
              <tr>
                <td>Medical </td>
                <td className="text-right">
                  {home_expenditure?.medical_expenses}
                </td>
              </tr>
              <tr>
                <td>Education</td>
                <td className="text-right">
                  {home_expenditure?.education_expenses}
                </td>
              </tr>
              <tr>
                <td>Other</td>
                <td className="text-right">
                  {home_expenditure?.other_expenses}
                </td>
              </tr>
              <tr className="table-secondary">
                <td style={{ borderBottom: "1px solid #d4d4d4" }}>
                  <b>Total Household Expenses</b>
                </td>
                <td
                  className="text-right"
                  style={{ borderBottom: "1px solid #d4d4d4" }}
                >
                  <b>{home_expenditure?.total_expenses}</b>
                </td>
              </tr>
              <tr className="table-secondary">
                <td>
                  <b>Surplus / (Deficit) before EMIs</b>
                </td>
                <td className="text-right">
                  <b>543</b>
                </td>
              </tr>
              <tr>
                <td
                  style={{ fontSize: "16px" }}
                  colspan="2"
                  className="text-center"
                >
                  <b>EMIs</b>
                </td>
              </tr>

              <tr>
                <td>Business Loan</td>
                <td className="text-right">32543</td>
              </tr>
              <tr>
                <td>House Loan</td>
                <td className="text-right">2323</td>
              </tr>
              <tr>
                <td>Other</td>
                <td className="text-right">2332</td>
              </tr>
              <tr className="table-secondary">
                <td style={{ borderBottom: "1px solid #d4d4d4" }}>
                  <b>Total</b>
                </td>
                <td
                  className="text-right"
                  style={{ borderBottom: "1px solid #d4d4d4" }}
                >
                  <b>54333</b>
                </td>
              </tr>
              <tr className="table-secondary">
                <td>
                  <b>Net Cash Surplus / (Deficit)</b>
                </td>
                <td className="text-right">
                  <b>343</b>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </CardBody>
    </Card>
  );
};

export default withRouter(CashFlow);
