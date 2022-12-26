import React from "react";
import AddProductCategory from "./Forms/AddProductCategory";
import { Card } from "reactstrap";
import { columns } from "./TableData";
import { Spinner } from "reactstrap";
import VianTableComponent from "../VianTableComponent";

const AddProductCategoryDetails = ({
  handlerSubmitProductCategory,
  loading,
  data,
}) => {
  return (
    <>
      <AddProductCategory
        handlerSubmitProductCategory={handlerSubmitProductCategory}
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
            columns={columns}
            tabletitle="Category List"
          />
        </Card>
      )}
    </>
  );
};

export default AddProductCategoryDetails;
