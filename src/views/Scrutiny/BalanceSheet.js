import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, CardBody } from "reactstrap";
import { getBalanceSheetResult } from "../../components/dataLayer/ApplicationLayer";

const BalanceSheet = (props) => {
  const initialState = {
    loading: true,
    dataSet: [],
  };
  const [{ loading, dataSet }, setState] = useState(initialState);
  const getApplicationBalanceSheetResults = async () => {
    const response = await getBalanceSheetResult(props.match.params.id);
    if (response?.results) console.log("data ", response?.results);
    setState((prevState) => ({
      ...prevState,
      loading: false,
      dataSet: response?.data?.results,
    }));
  };
  console.log("balance seet ", dataSet);
  useEffect(() => {
    getApplicationBalanceSheetResults();
  }, []);

  return (
    <Card>
      <CardBody>
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
                Balance Sheet
              </td>
            </tr>
            <tr>
              <td
                colspan="2"
                className="text-center "
                style={{ fontSize: "16px" }}
              >
                <b>Assets</b>
              </td>
            </tr>
            <tr>
              <td>Market Value</td>
              <td className="text-right">343</td>
            </tr>
            <tr>
              <td>Mortgage</td>
              <td className="text-right">454</td>
            </tr>
            <tr className="table-secondary">
              <td>Total Assets</td>
              <td className="text-right">3242</td>
            </tr>
            <tr>
              <td>Liabilities</td>
              <td className="text-right">3124</td>
            </tr>
            <tr className="table-secondary">
              <td>Total Liabilitis</td>
              <td className="text-right">3432</td>
            </tr>
            <tr>
              <td>Equity</td>
              <td className="text-right">354</td>
            </tr>
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default withRouter(BalanceSheet);
