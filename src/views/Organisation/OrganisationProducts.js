import React, { useEffect, useState } from "react";
import { Card, CardBody, Col } from "reactstrap";
import "./OrganisationProducts.scss";
// import AddProduct from "../components/OrganisationProducts/Forms/AddProductCategory"
import AddProductCategoryDetails from "../../components/OrganisationProductsv2/AddProductCategoryDetails";
import AddProductsDetails from "../../components/OrganisationProductsv2/AddProductsDetails";
// import AddProductCategoryDetails from "../../components/OrganisationProducts/AddProductCategoryDetails";
// import AddProductsDetails from "../../components/OrganisationProducts/AddProductsDetails";
import {
  getAllProductsCategoryDetails,
  createOgranisationProductCategoryCreation,
} from "../../components/dataLayer/OrganisationProducts/index";
const OrganisationProducts = () => {
  const initialProductsCreationState = {
    loading: true,
    data: [],
  };
  const [{ loading, data }, setProductsCreation] = useState(
    initialProductsCreationState
  );

  const getOrganisationProductsCategoryDetails = async () => {
    const response = await getAllProductsCategoryDetails();
    if (response && response.data)
      setProductsCreation((prevState) => ({
        ...prevState,
        loading: false,
        data: response?.data?.results,
      }));
  };
  const handlerSubmitProductCategory = async (payload) => {
    const response = await createOgranisationProductCategoryCreation(payload);
    getOrganisationProductsCategoryDetails();
    debugger;
    if (response) {
    }
  };
  const updateDatamanipulation = data.map((item) => {
    return { value: item.code, label: item.name };
  });

  useEffect(() => {
    getOrganisationProductsCategoryDetails();
  }, []);
  return (
    <Card>
      <CardBody>
        <Col lg="12" sm="12">
          <ul className="nav nav-tabs nav-justified report-tab mb-2">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active font-cls"
                href="#AddProdCate"
                data-toggle="tab"
                data-target="#AddProdCate"
              >
                Product Category
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link  font-cls"
                href="#AddProduct"
                data-toggle="tab"
                data-target="#AddProduct"
              >
                Product
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane active" id="AddProdCate">
              <AddProductCategoryDetails
                handlerSubmitProductCategory={handlerSubmitProductCategory}
                loading={loading}
                data={data}
              />
            </div>

            <div className="tab-pane " id="AddProduct">
              <AddProductsDetails
                updateDatamanipulation={updateDatamanipulation}
              />
            </div>
          </div>
        </Col>
      </CardBody>
    </Card>
  );
};

export default OrganisationProducts;
