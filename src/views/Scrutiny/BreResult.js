import React, { useEffect, useState } from "react";
import { RiEmotionUnhappyLine, RiEmotionHappyLine } from "react-icons/ri";
import { withRouter } from "react-router-dom";
import { Card, CardBody, Spinner } from "reactstrap";
import { getBreResultsDetails } from "../../components/dataLayer/ApplicationLayer";

import "./Style.scss";

const BreResult = (props) => {
  const initialState = {
    loading: true,
    dataSet: [],
  };
  const [{ loading, dataSet }, setState] = useState(initialState);
  const getApplicationBreResults = async () => {
    const response = await getBreResultsDetails(props.match.params.id);
    console.log("data ", response?.data);
    setState((prevState) => ({
      ...prevState,
      loading: false,
      dataSet: response?.data?.results,
    }));
  };
  console.log("dataSet", dataSet);
  useEffect(() => {
    getApplicationBreResults();
  }, []);

  console.log("props variable", props.match.params.id);
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
        {loading ? (
          <div className="text-center">
            <Spinner type="grow" color="primary" size="lg" />
          </div>
        ) : (
          <>
            <table className="table table-bordered grid-assessment-dashboard-sheet table-hover">
              <tbody>
                <tr>
                  <td
                    colSpan="6"
                    className="text-center font-weight-bold table-primary"
                  >
                    <b>Vodala Madhukar</b>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="6"
                    className="text-center font-weight-bold table-info"
                  >
                    <b>BRE Result</b>
                  </td>
                </tr>
                <tr>
                  <td
                    className="text-center semi-bold"
                    style={{ width: "10px" }}
                  >
                    <b>Sr. No.</b>
                  </td>
                  <td
                    className="text-center semi-bold"
                    style={{ width: "130px", textAlign: "center" }}
                  >
                    <b>Rule Level</b>
                  </td>
                  <td
                    className="text-center semi-bold"
                    style={{ width: "auto" }}
                  >
                    <b>Rule</b>
                  </td>
                  <td
                    className="text-center semi-bold"
                    style={{ width: "175px" }}
                  >
                    <b>Key</b>
                  </td>
                  <td
                    className="text-center semi-bold"
                    style={{ width: "15px" }}
                  >
                    <b>Result</b>
                  </td>
                  <td
                    className="text-center semi-bold"
                    style={{ width: "15px" }}
                  >
                    <b>Status</b>
                  </td>
                </tr>

                {dataSet.map((data, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{(index = index + 1)}</td>
                        <td className="text-center">{data.rule_level}</td>
                        <td>{data.rule_description}</td>
                        <td>{data.rule_key}</td>
                        <td className="text-center">
                          {data.rule_result ? "True" : "False"}
                        </td>
                        <td className="text-center">
                          {data.rule_result ? (
                            <RiEmotionHappyLine className="green_icons" />
                          ) : (
                            <RiEmotionUnhappyLine className="red_icons" />
                          )}
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default withRouter(BreResult);
