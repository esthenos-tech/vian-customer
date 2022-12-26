import React from "react";
import Dropzone from "react-dropzone-uploader";
import { toast } from "react-toastify";
import { dropzoneLabelContent } from "./dropzoneLabelContent";
import { AddMoreFileLabelContent } from "./AddMoreFileLabelContent";
import Cookies from "universal-cookie";
import "./CustomLayout.scss";
const cookies = new Cookies();

const CustomLayout = ({
  activeTabUploaderPostUrl,
  name,
  type,
  maxFiles,
  disableFileUpload,
  subCategoryName,
  fileUploadPayload,
}) => {
  const getUploadParams = ({ file, meta }) => {
    console.log("fileUploadPayload", fileUploadPayload);
    const body = new FormData();
    body.append("fileField", file);
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "instance-token": cookies.get("user"),
    };
    const method = "POST";
    return {
      url: activeTabUploaderPostUrl,
      method,
      body,
      headers,
      meta: fileUploadPayload,
    };
  };

  const handleChangeStatus = ({ meta, remove }, status) => {
    if (status === "headers_received") {
      toast.success(`${meta.name} File upload unsuccessful`, {
        autoClose: 5000,
      });
      remove();
    } else if (status === "aborted") {
      toast.error(`${meta.name}, upload failed...`);
    }
  };

  const Layout = ({
    input,
    previews,
    dropzoneProps,
    files,
    extra: { maxFiles },
  }) => {
    return (
      <div>
        <div {...dropzoneProps}>{files.length < maxFiles && input}</div>
        {previews}
      </div>
    );
  };

  return (
    <React.Fragment>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        LayoutComponent={Layout}
        accept={type}
        disabled={disableFileUpload}
        maxFiles={maxFiles}
        multiple={true}
        canCancel={true}
        inputContent={dropzoneLabelContent(name, type, subCategoryName)}
        inputWithFilesContent={AddMoreFileLabelContent(type)}
        styles={{
          dropzone: { width: "auto", height: 100 },
          dropzoneActive: { borderColor: "green" },
          dropzoneReject: { borderColor: "red", backgroundColor: "#DAA" },
          inputLabel: (files, extra) => (extra.reject ? { color: "red" } : {}),
        }}
      />
    </React.Fragment>
  );
};

export default CustomLayout;
