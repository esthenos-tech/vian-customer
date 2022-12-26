import React, { useState, useRef } from "react";
import Select from "react-select";

const TabHeading = ({
  heading,
  loading,
  activeTab,
  handlerActiveTab,
  submitSubHeading,
  handleDisableFileUpload,
  getOrganisationNeftTableDetails,
}) => {
  const [subCategory, setSubCategory] = useState(heading[0].file_category);
  const [fileType, setfileType] = useState("APK");
  const fileCategory = "";
  const selectRef = useRef();
  const subDropDown = subCategory.map((item) => {
    return { label: item, value: item, name: item };
  });
  const clearDropDownData = () => {
    selectRef.current.select.clearValue();
  };
  return (
    <>
      <p className="select-dd-label">Select file type</p>
      <Select
        classNamePrefix="select"
        options={heading}
        placeholder="Upload Files"
        name={`${activeTab.name === heading.name ? "active " : ""}`}
        isLoading={loading}
        onChange={(heading) => {
          handlerActiveTab(
            heading.postUrl,
            heading.name,
            heading.allowed_file_type
          );
          setSubCategory(heading.file_category);
          if (heading.file_category.length === 0) {
            handleDisableFileUpload(false);
            const payload = [heading.value, fileCategory];
            getOrganisationNeftTableDetails(payload);
          } else {
            handleDisableFileUpload(true);
            setfileType(heading.value);
            if (heading.file_category.length === 0) {
              clearDropDownData();
            }

            // getOrganisationNeftTableDetails(heading.value)
          }
        }}
        getOptionValue={(heading) => heading.name}
        defaultValue={heading[0]}
        menuPlacement="auto"
      />
      {subCategory.length === 0 ? (
        <></>
      ) : (
        <>
          <p className="select-dd-label">Select Category</p>
          <Select
            classNamePrefix="select"
            options={subDropDown}
            placeholder="Upload Files"
            ref={selectRef}
            isLoading={loading}
            onChange={(dataDropDown) => {
              if (dataDropDown) {
                submitSubHeading(fileType, dataDropDown.value);
                handleDisableFileUpload(false);
              } else {
                handleDisableFileUpload(true);
              }
            }}
            menuPlacement="auto"
          />
        </>
      )}
    </>
  );
};
export { TabHeading };
