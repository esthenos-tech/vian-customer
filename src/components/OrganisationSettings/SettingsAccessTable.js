import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { updateSettingManipulation } from "./SettingsAccessTableUtils";
import "./settingsAccessStyles.css";

function SettingsAccessTable({
  settingsTableData,
  leftSettingsFeaturesData,
  handlerUpdateSetting,
}) {
  const [finalUpdateData, setFinalUpdateData] = useState(null);

  const handleOnChange = (event, settingsData) => {
    setFinalUpdateData(updateSettingManipulation(settingsData, event));
  };

  useEffect(() => {
    handlerUpdateSetting(finalUpdateData);
  }, [finalUpdateData]);

  return (
    <div className="rounded setting-table-rounded">
      <Card>
        <CardHeader>
          <CardTitle>Access Settings</CardTitle>
        </CardHeader>
        <CardBody style={{ padding: "0.5rem !important" }}>
          <table className="setting-table table-bordered mb-0 table table-hover">
            <thead>
              <tr>
                <th className="cross cross p-0 h-100 thead-first">
                  <span className="tr-right">FEATURES</span>
                  <span className="tr-bottom-left">ROLE</span>
                </th>
                {settingsTableData &&
                  settingsTableData.map((data) => (
                    <th key={data._id.$oid}>
                      <div>{data.title_full.toUpperCase()}</div>
                      <span>({data.title.toUpperCase()})</span>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {leftSettingsFeaturesData.map((featuresAccesss, currentIndex) => (
                <tr key={currentIndex}>
                  <td className="tbody-first-td">
                    {featuresAccesss.label.toUpperCase()}
                  </td>
                  {settingsTableData &&
                    settingsTableData.map((data, index) => (
                      <td className="tbody-checkbox" key={index}>
                        <input
                          type="checkbox"
                          className="tabled-data-check"
                          name={featuresAccesss.keyName}
                          id={featuresAccesss.keyName}
                          defaultChecked={
                            data.features.length &&
                            data.features.includes(featuresAccesss.keyName)
                          }
                          onChange={(event) => handleOnChange(event, data)}
                        />
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default SettingsAccessTable;
