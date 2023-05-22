import Filed from "./Field";
import Button from "./Button";
import Logo from "./Logo";
import { userExists,getUser } from "../Database";
import './form.css';
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Alert from "./Alert";
import './form.css';

function Login({ setCurrentUser }) {
    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const inputs = [
        {
            id: 1,
            name: "username",
            placeholder: "Username",
            type: "text",
            className: "form-control",
            required: true
        },
        {
            id: 2,
            name: "password",
            placeholder: "Password",
            type: "password",
            className: "form-control",
            required: true
        }];

    const [error, setError] = useState("");

    let navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (userExists(values.username, values.password)) {
                  
            let user = { ...getUser(values.username) }
            setCurrentUser(user)

            navigate('/Chat')
        }
        else {
            setError("Invalid username or passwords")
        }


    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <>  
           <div className="login-container">
      <div className="logo-container">
        <Logo />
      </div>

      <div className="card" id = "login-card">
        <div className="title text-center">Please Sign In</div>
        <form onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <Filed key={input.id} {...input} value={values[input.name]} onChange={onChange} />
          ))}

          {error !== "" && <Alert message={error} />}

          <div className="text-center">
            Don't have an account yet?
            <Link to="/Register"> CLICK HERE </Link>
          </div>
          <Button name="Login" />
        </form>
      </div>
    </div>
  
        </>

        
    );
}

export default Login;