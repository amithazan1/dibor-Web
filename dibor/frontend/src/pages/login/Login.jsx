import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "/logo.png";

import styles from "./login.module.css";
import useLogin from "../../hooks/useLogin";

function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const { loading, login } = useLogin();
  const fieldsDescription = [
    {
      id: 1,
      name: "username",
      placeholder: "Username",
      type: "text",
      required: true,
    },
    {
      id: 2,
      name: "password",
      placeholder: "Password",
      type: "password",
      required: true,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ username: values.username, password: values.password });
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card w-50 p-4 d-flex flex-column align-items-center text-center">
          <img src={logo} className={`m-4 ${styles["logo"]}`} />
          <div className={`${styles["title"]} text-center mb-3`}>
            {"Please Sign In"}
          </div>
          <form className="w-100" onSubmit={handleSubmit}>
            {fieldsDescription.map((desc) => (
              <div key={desc.id} className="form-floating w-100 mb-3">
                <input
                  type={desc.type}
                  className="form-control w-100 h-50"
                  id={desc.id}
                  name={desc.name}
                  placeholder={desc.placeholder}
                  onChange={onChange}
                  onBlur={handleFocus}
                  onFocus={() => setFocused(true)}
                  focused={focused.toString()}
                  required={desc.required}
                />
                <label htmlFor={desc.id}>{desc.placeholder}</label>
              </div>
            ))}
            <Link to="/signup">
              <div className="text-center">Don't have an account yet?</div>
            </Link>
            <button
              className={`w-100 mt-2 ${styles["submit-btn"]}`}
              style={{ height: "60px" }}
              type="submit"
            >
              {" Login "}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
