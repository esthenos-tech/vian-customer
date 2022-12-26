import React, { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import "./style.scss";
import {
  getAllArealocation,
  getAllBranchlocation,
  getAllClusterlocation,
  getAllStatelocation,
  getAllZonelocation,
} from "../../dataLayer/OrganisationUpdateLocation";
import { Spinner } from "react-bootstrap";
import CheckBoxContainer from "./CheckBoxContainer";

const UpdateEmployeeAccessCard = (submitData) => {
  const submitLocationData = [];

  const [arrayValue, setArrayValue] = useState(submitLocationData ?? []);

  const [zoneData, setZoneData] = useState();
  const [state, setState] = useState();
  const [area, setArea] = useState();
  const [cluster, setCluster] = useState();
  const [branch, setBranch] = useState();

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
  const getAllStateValues = async (payload) => {
    if (payload.zone_code.length === 0) {
      setStateCreation((prevState) => ({
        ...prevState,
        loading: false,
        stateData: [],
        areaData: [],
        clusterData: [],
        branchData: [],
      }));
    } else {
      const response = await getAllStatelocation(payload);
      if (response?.status === 200)
        if (response?.data?.results) {
          setStateCreation((prevState) => ({
            ...prevState,
            loading1: false,
            stateData: response?.data?.results,
          }));
        } else {
          return;
        }
    }
  };
  const getAllAreaValues = async (payload) => {
    if (payload.state_code.length === 0) {
      setStateCreation((prevState) => ({
        ...prevState,
        loading: false,
        areaData: [],
        clusterData: [],
        branchData: [],
      }));
    } else {
      const response = await getAllArealocation(payload);
      if (response?.status === 200)
        if (response?.data?.results) {
          setStateCreation((prevState) => ({
            ...prevState,
            loading3: false,
            areaData: response?.data?.results,
          }));
        } else {
          return;
        }
    }
  };
  const getAllClusterValues = async (payload) => {
    if (payload.area_code.length === 0) {
      setStateCreation((prevState) => ({
        ...prevState,
        loading: false,
        clusterData: [],
        branchData: [],
      }));
    } else {
      const response = await getAllClusterlocation(payload);
      if (response?.status === 200)
        if (response?.data?.results) {
          setStateCreation((prevState) => ({
            ...prevState,
            loading4: false,
            clusterData: response?.data?.results,
          }));
        } else {
          return;
        }
    }
  };
  const getAllBranchValues = async (payload) => {
    if (payload.cluster_code.length === 0) {
      setStateCreation((prevState) => ({
        ...prevState,
        loading: false,
        branchData: [],
      }));
    } else {
      const response = await getAllBranchlocation(payload);
      if (response?.status === 200)
        if (response?.data?.results) {
          setStateCreation((prevState) => ({
            ...prevState,
            loading5: false,
            branchData: response?.data?.results,
          }));
        } else {
          return;
        }
    }
  };

  const handleSendZoneData = (value) => {
    getAllStateValues(value);
    setZoneData(value);
  };
  const handleSendStateData = (value) => {
    getAllAreaValues(value);
    setState(value);
  };
  const handleSendAreaData = (value) => {
    getAllClusterValues(value);
    setArea(value);
  };
  const handleSendClusterData = (value) => {
    getAllBranchValues(value);
    setCluster(value);
  };
  const handleSendBranchData = (value) => {
    setBranch(value);
    handleSubmitData();
  };

  const handleSubmitData = () => {
    setArrayValue([...arrayValue, zoneData, state, area, cluster, branch]);
    submitData(arrayValue);
  };

  useEffect(() => {
    getAllZoneValues();
  }, []);

  return (
    <div className="row d-flex justify-content-around">
      <CheckBoxContainer
        data={zonedata}
        loading={loading}
        handleSendCheckedData={handleSendZoneData}
        inetialValues={{ zone_code: "" }}
        HeadingText="Assign Zones Access"
        name="zone_code"
      />
      <CheckBoxContainer
        data={stateData}
        loading={loading}
        handleSendCheckedData={handleSendStateData}
        inetialValues={{ state_code: "" }}
        HeadingText="Assign States Access"
        name="state_code"
      />
      <CheckBoxContainer
        data={areaData}
        loading={loading}
        handleSendCheckedData={handleSendAreaData}
        inetialValues={{ area_code: "" }}
        HeadingText="Assign Areas Access"
        name="area_code"
      />
      <CheckBoxContainer
        data={clusterData}
        loading={loading}
        handleSendCheckedData={handleSendClusterData}
        inetialValues={{ cluster_code: "" }}
        HeadingText="Assign Clusters Access"
        name="cluster_code"
      />
      <CheckBoxContainer
        data={branchData}
        loading={loading}
        handleSendCheckedData={handleSendBranchData}
        inetialValues={{ branch_code: "" }}
        HeadingText="Assign Branches Access"
        name="branch_code"
      />
    </div>
  );
};
export default UpdateEmployeeAccessCard;
