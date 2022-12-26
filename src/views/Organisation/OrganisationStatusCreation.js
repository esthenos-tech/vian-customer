import React, { useState, useEffect } from "react";
import "./OrganisationStatusCreation.scss";
import { toast } from "react-toastify";
import OrganisationStatusCreationForm from "../../components/StatusCreation/Forms/OrganisationStatusCreationForm";
import { Card, CardBody, Spinner } from "reactstrap";
import {
  getOgranisationStatus,
  createOgranisationStatusCreation,
} from "../../components/dataLayer/OgranisationLayer";
import VianTableComponent from "../../components/VianTableComponent";

const OrganisationStatusCreation = () => {
  const initialStatusCreationState = {
    loading: true,
    data: [],
  };
  const [{ loading, data }, setStatusCreation] = useState(
    initialStatusCreationState
  );

  const getOrganisationStatusDetails = async () => {
    const response = await getOgranisationStatus();
    if (response && response.results)
      setStatusCreation((prevState) => ({
        ...prevState,
        loading: false,
        data: response?.results,
      }));
  };

  const handlerOrganisationStatusCreation = async (payload) => {
    const response = await createOgranisationStatusCreation(payload);
    if (response && response.results) {
      setStatusCreation((prevState) => ({
        ...prevState,
        loading: false,
        data: response?.results,
      }));
    }
    toast.success("Status Added successfully...");
  };

  useEffect(() => {
    getOrganisationStatusDetails();
  }, []);

  return (
    <div>
      <OrganisationStatusCreationForm
        handlerSubmitStatusCreation={handlerOrganisationStatusCreation}
      />
      {loading ? (
        <div className="text-center" style={{ marginTop: "12rem" }}>
          <Spinner type="grow" color="primary" size="lg" />
        </div>
      ) : (
        <Card>
          <CardBody>
            <VianTableComponent
              options={data}
              keyValue="id"
              columns={columns}
            />
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default OrganisationStatusCreation;

export const columns = [
  {
    dataField: "status",
    text: "STATUS",
    sort: true,
  },
  {
    dataField: "status_code",
    text: "STATUS CODE",
    sort: true,
  },
  {
    dataField: "status_message",
    text: "STATUS MESSAGE",
    sort: true,
  },
];
