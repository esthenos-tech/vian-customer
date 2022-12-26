import React, { useState, useEffect } from "react";
import SettingsAccessTable from "../../components/OrganisationSettings/SettingsAccessTable";
import {
  getOgranisationSettings,
  updateOrganisationSettings,
} from "../../components/dataLayer/OrganisationSettings";
import { Spinner } from "reactstrap";
function OrganisationSettings() {
  const initialStatusCreationState = {
    loading: true,
    data: [],
    leftFeaturesData: [],
  };

  const [{ loading, data, leftFeaturesData }, setSettingsCreation] = useState(
    initialStatusCreationState
  );
  const getOrganisationSettingsDetails = async () => {
    const response = await getOgranisationSettings();
    if (response && response.results)
      setSettingsCreation((prevState) => ({
        ...prevState,
        loading: false,
        data: response?.results,
        leftFeaturesData: response?.features,
      }));
  };

  const handlerUpdateSettings = async (updateSettingData) => {
    if (!updateSettingData) {
      return;
    }
    const response = await updateOrganisationSettings(updateSettingData);
    if (response && response.data.results) {
      setSettingsCreation((prevState) => ({
        ...prevState,
        loading: false,
        data: response?.data?.results,
      }));
    }
  };
  useEffect(() => {
    getOrganisationSettingsDetails();
  }, []);

  return (
    <div>
      {/* <p>Under maintenance</p> */}
      {loading ? (
        <div className="text-center" style={{ marginTop: "12rem" }}>
          <Spinner type="grow" color="primary" size="lg" />
        </div>
      ) : (
        <SettingsAccessTable
          settingsTableData={data}
          leftSettingsFeaturesData={leftFeaturesData}
          handlerUpdateSetting={handlerUpdateSettings}
        />
      )}
    </div>
  );
}

export default OrganisationSettings;
