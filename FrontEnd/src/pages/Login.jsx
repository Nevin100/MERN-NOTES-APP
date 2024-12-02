import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { Link } from "react-router-dom";
import PasswordInput from "../components/PasswordInput.jsx";
import { validateEmail } from "../utilis/helper.js";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utilis/AxiosInstance.js";
const Login = () => {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please Enter a valid Email address ");
      return;
    }
    if (!Password) {
      setError("Please Enter a valid Password ");
      return;
    }
    setError("");

    //Login API :
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: Password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Unexpected Error!");
      }
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7 text-center">LogIn</h4>
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
              Login
            </button>
            <p className="text-sm text-center mt-4">
              Not Registered Yet??{" "}
              <Link
                to="/signup"
                className="font-medium text-primary underline "
              >
                SignUp
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
