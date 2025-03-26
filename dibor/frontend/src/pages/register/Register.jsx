import React, { useState } from "react";
import PictureUpload from "../../components/form/PictureUpload";

function Register() {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const fieldsDescription = [
    {
      id: "username",
      name: "username",
      placeholder: "Username",
      type: "text",
      required: true,
    },
    {
      id: "displayName",
      name: "displayName",
      placeholder: "Display Name",
      type: "text",
      required: true,
    },
    {
      id: "password",
      name: "password",
      placeholder: "Password",
      type: "password",
      required: true,
    },
    {
      id: "confirmPassword",
      name: "confirmPassword",
      placeholder: "Confirm Password",
      type: "password",
      required: true,
    },
  ];

  const validateForm = () => {
    let newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "This field is required";
    }

    if (!formData.displayName.trim()) {
      newErrors.displayName = "This field is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.displayName)) {
      newErrors.displayName = "Only letters and spaces are allowed.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Submitting:", formData);
      // Send data to backend
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card w-50 h-75 p-4 d-flex flex-column align-items-center text-center">
        <div className="title text-center mb-1">Fill the form</div>
        <form
          className="w-100 needs-validation"
          onSubmit={handleSubmit}
          noValidate
        >
          <PictureUpload onImageChange={setProfileImage} />

          {fieldsDescription.map((desc) => (
            <div className="form-floating w-100 mt-2" key={desc.id}>
              <input
                type={desc.type}
                className={`form-control w-100 ${
                  errors[desc.name] ? "is-invalid" : ""
                }`}
                id={desc.id}
                name={desc.name}
                placeholder={desc.placeholder}
                onChange={onChange}
                required={desc.required}
              />
              <label htmlFor={desc.id}>{desc.placeholder}</label>
              <div className="invalid-feedback">{errors[desc.name]}</div>
            </div>
          ))}

          <div className="text-center mt-2">Have an account?</div>
          <button
            className="w-100 submit-btn"
            style={{ height: "55px" }}
            type="submit"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
