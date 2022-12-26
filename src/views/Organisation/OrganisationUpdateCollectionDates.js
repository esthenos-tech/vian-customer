import React, { useEffect, useState } from "react";
import UpdateCollectionDates from "../../components/OrganisationUpdateCollectionDates/UpdateCollectionDates";
import UpdateCollectionTable from "../../components/OrganisationUpdateCollectionDates/UpdateCollectionTable";
import "./OrganisationUpdateCollectionDates.scss";
import {
  getOgranisationUpdatedData,
  createOgranisationUpdateDataCreation,
} from "../../components/dataLayer/OrganisationUpdateDate";
import { toast } from "react-toastify";
import { Card, CardBody, Spinner } from "reactstrap";
import VianTableComponent from "../../components/VianTableComponent";
import InternalServerError from "../InternalServerError";

export const columns = [
  {
    dataField: "id",
    text: "Sr.No",
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return rowIndex + 1;
    },
  },
  {
    dataField: "state_name",
    text: "STATES",
    sort: true,
  },
  {
    dataField: "collection_dates",
    text: "DATES",
  },
];

const OrganisationUpdateCollectionDates = () => {
  const initialUpdateLocationCreationState = {
    loading: false,
    data: [],
    collection_dates: [],
    internalServer: false,
    res: "",
  };
  const [
    { loading, data, collection_dates, res, internalServer },
    setUpdateDataCreation,
  ] = useState(initialUpdateLocationCreationState);

  const getOrganisationUpdateDetails = async () => {
    const response = await getOgranisationUpdatedData();
    if (response?.response?.status === 500)
      setUpdateDataCreation((prevState) => ({
        ...prevState,
        loading: false,
        res: response?.response?.data,
        internalServer: true,
      }));

    if (response && response.results)
      setUpdateDataCreation((prevState) => ({
        ...prevState,
        loading: false,
        collection_dates: response?.results,
        res: response?.response?.data,
      }));
  };

  const handlerSubmitUpdateCollectionData = async (payload) => {
    const response = await createOgranisationUpdateDataCreation(payload);
    toast.success(response?.results);
    if (response && response.results) {
      setUpdateDataCreation((prevState) => ({
        ...prevState,
        loading: false,
        data: response?.results,
      }));
    }
    getOrganisationUpdateDetails();
  };

  useEffect(() => {
    getOrganisationUpdateDetails();
  }, []);

  return (
    <div>
      {internalServer ? (
        <InternalServerError content={res} />
      ) : (
        <>
          <UpdateCollectionDates
            handlerSubmitUpdateCollection={handlerSubmitUpdateCollectionData}
          />
          <hr />
          {loading ? (
            <div className="text-center">
              <Spinner type="grow" color="primary" size="lg" />
            </div>
          ) : (
            <Card className="mt-1">
              <CardBody>
                <VianTableComponent
                  options={collection_dates}
                  keyValue="id"
                  columns={columns}
                  tabletitle="Update Collection Dates"
                />
              </CardBody>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default OrganisationUpdateCollectionDates;
