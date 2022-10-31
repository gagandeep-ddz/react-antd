import React from "react";
import { Button } from "antd";

import "./errorScreen.css";
import { useNavigate, useParams } from "react-router-dom";

const ErrorScreen = () => {
  const navigate = useNavigate();
  const { error, label, fallBackRoute } = useParams();
  const onClickHandler = () => {
    navigate(`/${fallBackRoute}`);
  };
  return (
    <div className="error-screen-container">
      <h1>Oops</h1>
      <h2>{error}</h2>
      <Button type="secondary" size="large" onClick={onClickHandler}>
        {label}
      </Button>
    </div>
  );
};

export default ErrorScreen;
