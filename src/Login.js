import React from "react";
import "./Login.css";
import penrose from "./images/penrose.png";

const Login = () => {
  return (
    <div className="login">
      <img src={penrose} alt="penrose-logo" />
      <a>LOGIN</a>
    </div>
  );
};

export default Login;
