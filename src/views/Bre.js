import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Spinner } from "reactstrap";
import { NavLink } from "react-router-dom";
import { getBreDetails } from "../components/dataLayer/BreRules/index";

const Bre = () => {
  const initialGetBreData = {
    loading: true,
    data: [],
  };
  const [{ loading, data }, setBreData] = useState(initialGetBreData);

  const getAllBreDetails = async () => {
    const response = await getBreDetails();
    if (response && response?.data?.results) {
      setBreData((prevState) => ({
        ...prevState,
        loading: false,
        data: response?.data?.results,
      }));
    }
  };

  useEffect(() => {
    getAllBreDetails();
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <div className="text-center">
          <Spinner type="grow" color="primary" size="lg" />
        </div>
      ) : (
        <Row>
          {data.map((data, index) => (
            <Col key={index} lg="3" sm="6">
              <Card>
                <CardBody>
                  <NavLink to={`/bre/${data.code}`}>
                    <div className="text-center w-100 text-bold-600">
                      <button className="text-bold-600 align-self-center btn btn-primary w-100">
                        {data.name}
                      </button>
                    </div>
                  </NavLink>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </React.Fragment>
  );
};

export default Bre;
