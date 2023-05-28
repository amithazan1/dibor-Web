import Filed from "./Field";
import Button from "./Button";
import Logo from "./Logo";
import Picture from "./Picture";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { addUser } from "../APIoperations"
import './form.css';


function Register() {
    const [picture, setPicture] = useState("");
    const [values, setValues] = useState({
        username: "",
        password: "",
        confirm: "",
        displayName: "",
        profilePic: ""

    });


    useEffect(() => {
        values.profilePic = btoa(picture)
    }, [picture]);


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
            errorMessage: "Password should be 8-20 characters and include at least 1 uppercase letter",
            pattern: "(?=.*[A-Z]).{8,20}",
            required: true
        },
        {
            id: 3,
            name: "confirm",
            placeholder: "Confirm password",
            type: "password",
            className: "form-control",
            errorMessage: "Passwords don't match",
            pattern: values.password,
            required: true
        },
        {
            id: 4,
            name: "displayName",
            placeholder: "Display name",
            type: "text",
            className: "form-control",
            errorMessage: "Display name should be at least 2 characters and shouldn't include any special character!",
            pattern: "^[A-Za-z0-9]{2,}",
            required: true
        },
        /*
        {
            id: 5,
            name: "picture",
            placeholder: "Picture",
            type: "file",
            className: "form-control",
            errorMessage: "filed is mandatory",
            required: true
        }
        */
    ]

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        //adding the user to the users list.
        let success = await addUser(values);
        if (!success)
            alert("username already exists");
        else
            navigate('/')
        return;
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };


    return (
        <>
            <div className="logout-container">
                <div className="logo-container">
                    <Logo />
                </div>
                <div className="card" id="login-card">

                    <form onSubmit={handleSubmit}>
                        <div className="title text-center">Fill in the form </div>
                        {inputs.map((input) => (
                            <Filed key={input.id} {...input} value={values[input.name]} onChange={onChange} />
                        ))}
                        <Picture value={picture} set={setPicture} />
                        <div className="text-center">
                            have an account?
                            <Link to="/"> CLICK HERE </Link>
                        </div>
                        <Button name="Submit"></Button>
                    </form>
                </div>
            </div>

        </>
    );
}

export default Register;