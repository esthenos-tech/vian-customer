import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Card, CardBody, Spinner } from "reactstrap";
import { getCaptainListDetails } from "../../components/dataLayer/ApplicationLayer/index";
import VianTableComponent from "../../components/VianTableComponent";
import { Link } from "react-router-dom";

const ApplicationCaptainList = (props) => {
  const initialState = {
    loading: true,
    data: [],
  };

  const [{ loading, data }, setState] = useState(initialState);
  const getCaptainList = async () => {
    const response = await getCaptainListDetails(props.match.params.id);
    if (response && response?.data && response?.data?.results) {
      setState((pervState) => ({
        ...pervState,
        loading: false,
        data: response?.data?.results,
      }));
    }
  };
  const serverSideColumns = () => {
    return props.match.params.id;
  };
  useEffect(() => {
    getCaptainList();
  }, []);

  return (
    <div>
      <Card>
        <CardBody>
          {loading ? (
            <div className="text-center">
              <Spinner type="grow" color="primary" size="lg" />
            </div>
          ) : (
            <VianTableComponent
              options={data}
              keyValue="//some unique key"
              columns={columndata(serverSideColumns)}
              tabletitle="List of Users"
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default withRouter(ApplicationCaptainList);

const columndata = (callback) => {
  return [
    {
      dataField: "Agent_Name",
      sort: true,
      name: "RM NAME",
      text: "RM NAME",
      formatter: (cell, row) => (
        <Link to={`/application/${callback()}/rms/${row.Agent_id}`}>
          {" "}
          {cell}{" "}
        </Link>
      ),
    },
    {
      dataField: "Phone_Number",
      sort: true,
      text: "PHONE NUMBER",
    },
    {
      dataField: "Branch_Name",
      sort: true,
      text: "BRANCH NAME",
    },
  ];
};
