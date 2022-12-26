import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "reactstrap";
import BreContainer from "../components/BreContainer/BreContainer";
import {
  getBreDetails,
  getBreTable,
  getHardCodedRulesValues,
  postBreTableData,
  putBreTableData,
} from "../components/dataLayer/BreRules";
import InternalServerError from "./InternalServerError";

const BreMainComponent = (props) => {
  const initialBreGetDateState = {
    loading1: true,
    loading2: true,
    internalServer: false,
    data: [],
    commoncategoryDropDown: [],
    category_hardcoded_rules: [],
    categoryName: [],
    res: "",
  };

  const [
    {
      loading1,
      loading2,
      internalServer,
      data,
      commoncategoryDropDown,
      category_hardcoded_rules,
      categoryName,
      res,
    },
    setBreData,
  ] = useState(initialBreGetDateState);

  const handleBreTableData = async () => {
    const response = await getBreTable(props.match.params.id);
    if (response?.response?.data?.results) {
      toast.info(response?.response?.data?.results);
      setBreData((prevState) => ({
        ...prevState,
        loading1: false,
        data: [],
      }));
    }
    if (response?.data)
      setBreData((prevState) => ({
        ...prevState,
        loading1: false,
        data: response?.data?.results,
      }));
  };

  const handleBreFormData = async (payload, ruleId, methodType) => {
    if (methodType === "post") {
      const response = await postBreTableData(props.match.params.id, payload);
      if (response?.response?.status === 500) {
        setBreData((prevState) => ({
          ...prevState,
          loading1: false,
          data: [],
          res: response?.response?.data,
          internalServer: true,
        }));
      }
      if (response?.data?.results)
        setBreData((prevState) => ({
          ...prevState,
          loading1: false,
          data: response?.data?.results,
        }));
      if (response?.data?.errors) {
        toast.info(response?.data?.errors);
      }
      if (response?.data?.message) {
        toast.info(response?.data?.message);
      }
      handleBreTableData();
    } else {
      const response = await putBreTableData(
        props.match.params.id,
        ruleId,
        payload
      );
      if (response?.status === 200) {
        toast.info(response?.data?.message);
        setBreData((prevState) => ({
          ...prevState,
          loading1: false,
          data: [],
        }));
      }
      if (response?.data?.errors) {
        toast.info(response?.data?.errors);
      }
      handleBreTableData();
    }
  };

  const getAllHardCodedRules = async () => {
    const response = await getHardCodedRulesValues(props.match.params.id);
    if (response?.data?.common_hardcoded_rules === null) {
      setBreData((prevState) => ({
        ...prevState,
        loading2: false,
        commoncategoryDropDown: [],
        category_hardcoded_rules: [],
      }));
    }
    if (response?.data?.common_hardcoded_rules !== null) {
      const dropdownData = response?.data?.common_hardcoded_rules.map(
        (item) => {
          return {
            label: item.application_key,
            value: item.application_key,
            loading2: false,
            help_Data: item.help_text,
            type: item.rule_type,
            description: item.description,
          };
        }
      );

      setBreData((prevState) => ({
        ...prevState,
        loading2: false,
        commoncategoryDropDown: dropdownData,
        category_hardcoded_rules: response?.data?.category_hardcoded_rules,
      }));
    }
    if (response?.response?.status === 405) {
      toast.warn("something");
      setBreData((prevState) => ({
        ...prevState,
        loading2: false,
        commoncategoryDropDown: [],
        category_hardcoded_rules: [],
      }));
    }
  };

  const getAllBreDetails = async () => {
    const response = await getBreDetails();
    debugger;
    if (response && response?.data?.results) {
      setBreData((prevState) => ({
        ...prevState,
        loading: false,
        categoryName: response?.data?.results.find(function (post, index) {
          if (post.code == props.match.params.id) return true;
        }),
      }));
    }
  };

  const updateBreTableData = () => {
    handleBreTableData();
  };
  useEffect(() => {
    handleBreTableData();
    getAllHardCodedRules();
    getAllBreDetails();
  }, []);

  return (
    <div>
      {internalServer ? (
        <InternalServerError content={res} />
      ) : (
        <>
          <p id="demo"></p>
          {loading1 || loading2 ? (
            <div className="text-center" style={{ marginTop: "12rem" }}>
              <Spinner type="grow" color="primary" size="lg" />
            </div>
          ) : (
            <BreContainer
              perticularDataSet={data}
              commoncategoryDropDown={commoncategoryDropDown}
              category_hardcoded_rules={category_hardcoded_rules}
              handleBreFormData={handleBreFormData}
              loading2={loading2}
              catogeryNameText={categoryName.name}
              updateBreTableData={updateBreTableData}
              catogeryID={props.match.params.id}
            />
          )}
        </>
      )}
    </div>
  );
};

export default withRouter(BreMainComponent);
