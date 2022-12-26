import { postAPICall, getAPICall } from "../axiosMethodCall";
import { toast } from "react-toastify";
import {
  zoneLocation,
  stateLocation,
  areaLocation,
  clusterLocation,
  branchLocation,
  getLocationTableDetailsUrl,
  unassignUrl,
} from "../../urlConfiguration/index";
// post zone location
export const createOgranisationZoneLocation = async (payload) => {
  try {
    const response = await postAPICall(zoneLocation, payload)
      .then((response) => {
        if (response && response.data.errors) {
          toast.error(response.data.errors[0]);
        }
        if (response && response.data.message) {
          toast.success(response.data.message);
        }
        return response.data;
      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
          toast.error(error.response.data.errors[0]);
        }
        return error;
      });
    return response;
  } catch (error) {
    return toast.error("Something went wrong...", error);
  }
};
//get zone location
export const getAllZonelocation = async () => {
  try {
    const response = await getAPICall(zoneLocation)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error && error?.response) console.log(error.response);
        return error;
      });
    return response;
  } catch (error) {
    return error;
  }
};
//post state location
export const createOgranisationStateLocation = async (payload) => {
  try {
    const response = await postAPICall(stateLocation, payload)
      .then((response) => {
        if (response && response.data.errors) {
          toast.error(response.data.errors);
        }
        if (response && response.data.message) {
          toast.success(response.data.message);
        }
        return response.data;
      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
          toast.error(error.response.data.errors[0]);
        }
        return error;
      });
    return response;
  } catch (error) {
    return toast.error("Something went wrong...", error);
  }
};
//get state location
export const getAllStatelocation = async (payload) => {
  try {
    const response = await getAPICall(stateLocation, payload)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error && error?.response) console.log(error.response);
        return error;
      });
    return response;
  } catch (error) {
    return error;
  }
};
//post area location
export const createOgranisationAreaLocation = async (payload) => {
  try {
    const response = await postAPICall(areaLocation, payload)
      .then((response) => {
        if (response && response.data.errors) {
          toast.error(response.data.errors[0]);
        }
        if (response && response.data.message) {
          toast.success(response.data.message);
        }
        return response.data;
      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
          toast.error(error.response.data.errors[0]);
        }
        return error;
      });
    return response;
  } catch (error) {
    return toast.error("Something went wrong...", error);
  }
};
//get area location
export const getAllArealocation = async (payload) => {
  try {
    const response = await getAPICall(areaLocation, payload)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error && error?.response) console.log(error.response);
        return error;
      });
    return response;
  } catch (error) {
    return error;
  }
};

//post cluster location
export const createOgranisationClusterLocation = async (payload) => {
  try {
    const response = await postAPICall(clusterLocation, payload)
      .then((response) => {
        if (response && response.data.errors) {
          toast.error(response.data.errors[0]);
        }
        if (response && response.data.message) {
          toast.success(response.data.message);
        }
        return response.data;
      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
          toast.error(error.response.data.errors[0]);
        }
        return error;
      });
    return response;
  } catch (error) {
    return toast.error("Something went wrong...", error);
  }
};

//get cluster location
export const getAllClusterlocation = async (payload) => {
  try {
    const response = await getAPICall(clusterLocation, payload)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error && error?.response) console.log(error.response);
        return error;
      });
    return response;
  } catch (error) {
    return error;
  }
};

// post branch location
export const createOgranisationBranchLocation = async (payload) => {
  try {
    const response = await postAPICall(branchLocation, payload)
      .then((response) => {
        if (response && response.data.errors) {
          toast.error(response.data.errors);
        }
        if (response && response.data.message) {
          toast.success(response.data.message);
        }
        return response.data;
      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
          toast.error(error.response.data.errors[0]);
        }
        return error;
      });
    return response;
  } catch (error) {
    return toast.error("Something went wrong...", error);
  }
};

//get branch location
export const getAllBranchlocation = async (payload) => {
  try {
    const response = await getAPICall(branchLocation, payload)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error && error?.response) console.log(error.response);
        return error;
      });
    return response;
  } catch (error) {
    return error;
  }
};
//get table details in locationn page
export const getLocationTableDetails = async () => {
  try {
    const response = await getAPICall(getLocationTableDetailsUrl);
    return response;
  } catch (error) {
    return error;
  }
};
// unassign owner
export const sendUnassignOwners = async (type, payload) => {
  try {
    const url = unassignUrl(type);
    const response = await postAPICall(url, payload);
    return response;
  } catch (error) {
    return error;
  }
};
