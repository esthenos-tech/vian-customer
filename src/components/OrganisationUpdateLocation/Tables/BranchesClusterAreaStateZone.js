import React, { useEffect, useState } from "react";
import { Card, CardBody, Spinner } from "reactstrap";
import { columns } from "./TableData";
import { getLocationTableDetails } from "../../../components/dataLayer/OrganisationUpdateLocation/index";
import VianTableComponent from "../../VianTableComponent";

const BranchesClusterAreaStateZone = () => {
  const initialProductsCreationState = {
    loading: true,
    data: [],
  };
  const [{ loading, data }, setProductsCreation] = useState(
    initialProductsCreationState
  );

  const getOrganisationEmployeeLocationDetails = async () => {
    const response = await getLocationTableDetails();
    if (response && response.data)
      setProductsCreation((prevState) => ({
        ...prevState,
        loading: false,
        data: response?.data?.results,
      }));
  };

  console.log("code", data);

  useEffect(() => {
    getOrganisationEmployeeLocationDetails();
  }, []);
  return (
    <Card>
      <CardBody>
        {loading ? (
          <div className="text-center">
            <Spinner type="grow" color="primary" size="lg" />
          </div>
        ) : (
          <>
            <VianTableComponent
              options={data}
              keyValue="code"
              columns={columns}
              tabletitle="Branches-Cluster-Area-State-Zone"
            />
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default BranchesClusterAreaStateZone;
