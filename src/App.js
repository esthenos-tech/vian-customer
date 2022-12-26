import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import Router from "./Router";
import "react-toastify/dist/ReactToastify.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "react-dropzone-uploader/dist/styles.css";
import Login from "./views/Login/Login";

const App = (props) => {
  const [statusLogin, setStatusLogin] = useState(true);
  const handleLoginPage = (success) => {
    setStatusLogin(success);
  };

  return (
    <>
      {statusLogin ? <Login handleLoginPage={handleLoginPage} /> : <Router />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="w-auto"
      />
    </>
  );
};

export default App;
