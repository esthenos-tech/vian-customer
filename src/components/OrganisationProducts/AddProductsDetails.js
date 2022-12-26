import React, { useState, useEffect } from "react";
import AddProduct from "./Forms/AddProduct";
import { Card, CardTitle, Spinner } from "reactstrap";
import { columnAndAction } from "./TableData";
import { css } from "glamor";
import { toast } from "react-toastify";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Cookies from "universal-cookie";

import {
  getAllProductsDetails,
  createOgranisationProductCreation,
} from "../../components/dataLayer/OrganisationProducts/index";
import moment from "moment";
import VianTableComponent from "../VianTableComponent";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

const { SearchBar } = Search;
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
    if (response && response.data && response.data.results) {
      if (Array.isArray(response.data.results)) {
        getOrganisationProductsDetails();
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

  const [particularProduct, setParticularProduct] = useState("");
  const handleClearFormData = () => {
    setParticularProduct(null);
  };
  const renderEditAction = (product) => {
    console.log("==== i am here ====", product);
    setParticularProduct(product);
  };

  useEffect(() => {
    getOrganisationProductsDetails();
  }, []);

  return (
    <div>
      <AddProduct
        debugger
        productsDetails={particularProduct}
        handlerSubmitProductCreation={handleSubmitProductCreation}
        handleClearFormData={handleClearFormData}
        updateDatamanipulation={updateDatamanipulation}
      />
      <hr />
      <hr />
      {loading ? (
        <div className="text-center">
          <Spinner type="grow" color="primary" size="lg" />
        </div>
      ) : (
        <Card className="mt-1">
          <ToolkitProvider
            keyField="code"
            data={data}
            columns={columnAndAction(renderEditAction)}
            search
          >
            {(props) => (
              <>
                <CardTitle className="m-0">Product List</CardTitle>
                <div className="row">
                  <div className="col-md-12 col-lg-12 p-0">
                    <div className="w-100 d-flex justify-content-end mb-1">
                      <SearchBar
                        placeholder="Type to search..."
                        className="mr-1"
                        {...props.searchProps}
                      />
                    </div>
                    <BootstrapTable
                      bootstrap4
                      {...props.baseProps}
                      hover
                      pagination={paginationFactory({ sizePerPage: 10 })}
                    />
                  </div>
                </div>
              </>
            )}
          </ToolkitProvider>
        </Card>
      )}
    </div>
  );
};

export default AddProductsDetails;
