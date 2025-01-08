import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput.jsx";
import { validateEmail } from "../utilis/helper.js";
import axiosInstance from "../utilis/AxiosInstance.js";

const SignUp = () => {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!Name) {
      setError("Name is required");
    }

    if (!validateEmail(email)) {
      setError("Valid email is required");
    }

    if (!Password) {
      setError("Password is required");
    }

    setError("");
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: Name,
        email: email,
        password: Password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
      }
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        console.log("Unexpected Error");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7 text-center">SignUp</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {Error && <p className="text-red-500 text-xs pb-1 ">{Error}</p>}

            <button type="submit" className="btn-primary">
              Create Account
            </button>
            <p className="text-sm text-center mt-4">
              Already Registered ??{" "}
              <Link to="/login" className="font-medium text-primary underline ">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
