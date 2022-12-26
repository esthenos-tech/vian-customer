import React, { useState, useEffect } from "react";
import AddProduct from "./Forms/AddProduct";
import { Card, Spinner } from "reactstrap";
import { columnAndAction } from "./TableData";
import { css } from "glamor";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

import {
  getAllProductsDetails,
  createOgranisationProductCreation,
} from "../../components/dataLayer/OrganisationProducts/index";
import moment from "moment";
import VianTableComponent from "../VianTableComponent";

const cookies = new Cookies();

const AddProductsDetails = ({ updateDatamanipulation }) => {
  const initialProductsCreationState = {
    loading: true,
    data: [],
  };
  const [{ loading, data }, setProductsCreation] = useState(
    initialProductsCreationState
  );

  const [rdata, setData] = useState({});

  const getOrganisationProductsDetails = async () => {
    try {
      const response = await getAllProductsDetails()
        .then((response) => {
          if (response && response.data)
            setProductsCreation((prevState) => ({
              ...prevState,
              loading: false,
              data: response?.data?.results,
            }));
        })

        .catch((error) => {
          if (
            error &&
            error?.response &&
            error?.response?.data &&
            error?.response?.data?.message
          ) {
            toast.error(error?.response?.data?.message);
          }
          cookies.remove("user");
          return error;
        });
    } catch (error) {
      console.log(error);

      if (error && error.message) {
        toast.error(error.message);
      }

      return toast.error("Something went wrong...", error);
    }
  };

  console.log(data);

  const handleSubmitProductCreation = async (productsData) => {
    const payload = {
      ...productsData,
      activation_date: moment(productsData.activation_date).format(
        "YYYY-MM-DD"
      ),
      deactivation_date: moment(productsData.deactivation_date).format(
        "YYYY-MM-DD"
      ),
    };
    setData(payload);
    handleSubmitProductCreationPayloadData(payload);
  };

  const handleSubmitProductCreationPayloadData = async (payload) => {
    const response = await createOgranisationProductCreation(payload);
    getOrganisationProductsDetails();
    if (response && response.data && response.data.results) {
      if (Array.isArray(response.data.results)) {
        toast.success(response.data.results[0], {
          className: css({
            width: "635px !important",
          }),
          position: "top-right",
          autoClose: 7000,
        });
        return;
      }
    }
  };

  useEffect(() => {
    getOrganisationProductsDetails();
  }, []);

  return (
    <div>
      <AddProduct
        debugger
        handlerSubmitProductCreation={handleSubmitProductCreation}
        updateDatamanipulation={updateDatamanipulation}
      />
      <hr />
      {loading ? (
        <div className="text-center">
          <Spinner type="grow" color="primary" size="lg" />
        </div>
      ) : (
        <Card className="mt-1">
          <VianTableComponent
            options={data}
            keyValue="code"
            columns={columnAndAction}
            tabletitle="Product List"
          />
        </Card>
      )}
    </div>
  );
};

export default AddProductsDetails;
