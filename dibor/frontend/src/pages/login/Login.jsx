import Logo from "../../components/Logo.jsx";
import "./login.module.css";

import React, { useState } from "react";

function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const fieldsDescription = [
    {
      id: 1,
      name: "username",
      placeholder: "Username",
      type: "text",
      className: "form-control",
      required: true,
    },
    {
      id: 2,
      name: "password",
      placeholder: "Password",
      type: "password",
      className: "form-control",
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

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card w-50 h-50 p-4 d-flex flex-column align-items-center text-center">
          <div className="logo">
            <Logo />
          </div>

          <div className="title text-center mb-1">Please Sign In</div>
          <form className="w-100">
            {fieldsDescription.map((desc) => (
              <div className="form-floating w-100 mb-3">
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

            <div className="text-center">Don't have an account yet?</div>
            <button className="w-100 h-25 submit-btn" type="submit">
              {" Login "}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
