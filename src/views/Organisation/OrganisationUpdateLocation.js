import React, { useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import {
  getAllArealocation,
  getAllBranchlocation,
  getAllClusterlocation,
  getAllStatelocation,
  getAllZonelocation,
} from "../../components/dataLayer/OrganisationUpdateLocation";
import TableAndUnassignOwner from "../../components/OrganisationUpdateLocation/TableAndUnassignOwner";
import UpdateARB from "../../components/OrganisationUpdateLocation/UpdateARB";
import "./OrganisationUpdateLocation.scss";

const OrganisationUpdateLocation = () => {
  const initialStatusCreation = {
    loading: true,
    zonedata: [],
    stateData: [],
    areaData: [],
    clusterData: [],
    branchData: [],
  };
  const [
    { loading, zonedata, stateData, areaData, clusterData, branchData },
    setStateCreation,
  ] = useState(initialStatusCreation);

  const getAllStateValues = async () => {
    const response = await getAllStatelocation();
    if (response?.status === 200)
      if (response?.data?.results) {
        setStateCreation((prevState) => ({
          ...prevState,
          loading: false,
          stateData: response?.data?.results,
        }));
      } else {
        return;
      }
  };

  const getAllZoneValues = async () => {
    const response = await getAllZonelocation();
    if (response?.status === 200)
      if (response?.data?.results) {
        setStateCreation((prevState) => ({
          ...prevState,
          loading: false,
          zonedata: response?.data?.results,
        }));
      } else {
        return;
      }
  };
  const getAllAreaValues = async () => {
    const response = await getAllArealocation();
    if (response?.status === 200)
      if (response?.data?.results) {
        setStateCreation((prevState) => ({
          ...prevState,
          loading: false,
          areaData: response?.data?.results,
        }));
      } else {
        return;
      }
  };
  const getAllClusterValues = async () => {
    const response = await getAllClusterlocation();
    if (response?.status === 200)
      if (response?.data?.results) {
        setStateCreation((prevState) => ({
          ...prevState,
          loading: false,
          clusterData: response?.data?.results,
        }));
      } else {
        return;
      }
  };
  const getAllBranchValues = async () => {
    const response = await getAllBranchlocation();
    if (response?.status === 200)
      if (response?.data?.results) {
        setStateCreation((prevState) => ({
          ...prevState,
          loading: false,
          branchData: response?.data?.results,
        }));
        debugger;
      } else {
        return;
      }
  };
  const zone = zonedata.map((item) => {
    return { value: item.code, label: item.name };
  });
  const state = stateData.map((item) => {
    return { value: item.code, label: item.name };
  });
  const area = areaData.map((item) => {
    return { value: item.code, label: item.name };
  });
  const cluster = clusterData.map((item) => {
    return { value: item.code, label: item.name };
  });
  const branch = branchData.map((item) => {
    return { value: item.code, label: item.name };
  });

  useEffect(() => {
    getAllStateValues();
    getAllZoneValues();
    getAllAreaValues();
    getAllClusterValues();
    getAllBranchValues();
  }, []);

  return (
    <>
      {loading ? (
        <div className="text-center" style={{ marginTop: "12rem" }}>
          <Spinner type="grow" color="primary" size="lg" />
        </div>
      ) : (
        <>
          <UpdateARB zone={zone} state={state} area={area} cluster={cluster} />
          <TableAndUnassignOwner
            zone={zone}
            state={state}
            area={area}
            cluster={cluster}
            branch={branch}
          />
        </>
      )}
    </>
  );
};

export default OrganisationUpdateLocation;
