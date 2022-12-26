import {
  deleteAPICall,
  getAPICall,
  postAPICall,
  putAPICall,
} from "../axiosMethodCall";
import {
  deleteAndPutDataBreRuleData,
  getHardCodedRules,
  getPerticularBreRule,
  getPerticularBreRuleTable,
} from "../../urlConfiguration";

export const getBreDetails = async () => {
  try {
    const response = await getAPICall(getPerticularBreRule);
    return response;
  } catch (error) {
    return error;
  }
};
export const getBreTable = async (id) => {
  try {
    const url = getPerticularBreRuleTable(id);
    const response = await getAPICall(url);
    return response;
  } catch (error) {
    return error;
  }
};
export const postBreTableData = async (id, payload) => {
  debugger;
  try {
    const url = getPerticularBreRuleTable(id);
    const response = await postAPICall(url, payload);
    return response;
  } catch (error) {
    return error;
  }
};

export const putBreTableData = async (id, ruleId, payload) => {
  debugger;
  try {
    const url = deleteAndPutDataBreRuleData(id, ruleId);
    const response = await putAPICall(url, payload);
    return response;
  } catch (error) {
    return error;
  }
};

export const getHardCodedRulesValues = async (id) => {
  try {
    const url = getHardCodedRules(id);
    const response = await getAPICall(url);
    return response;
  } catch (error) {
    return error;
  }
};

export const deletePerticularBRERule = async (id, ruleId) => {
  try {
    const url = deleteAndPutDataBreRuleData(id, ruleId);
    const response = await deleteAPICall(url);
    return response;
  } catch (error) {
    return error;
  }
};
