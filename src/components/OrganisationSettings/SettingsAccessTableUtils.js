import { toast } from "react-toastify";

export const updateSettingManipulation = (settingsData, event) => {
  debugger;
  if (event.target.checked) {
    toast.success(`Access updated for ${settingsData.title_full}`);
  } else {
    toast.info(`Access revoked for ${settingsData.title_full}`);
  }
  let finaleFeaturesSettings = {
    title: settingsData.title,
  };
  if (settingsData.features.length === 0) {
    finaleFeaturesSettings["features"] = [
      ...settingsData.features,
      event.target.name,
    ];
    return finaleFeaturesSettings;
  }
  if (event.target.checked) {
    finaleFeaturesSettings["features"] = [
      ...settingsData.features,
      event.target.name,
    ];

    debugger;
    return finaleFeaturesSettings;
  }
  let filterSettingData = settingsData.features.filter(
    (item) => item !== event.target.name
  );
  finaleFeaturesSettings["features"] = [...filterSettingData];

  return finaleFeaturesSettings;
};
