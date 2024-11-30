import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { Link } from "react-router-dom";
import PasswordInput from "../components/PasswordInput.jsx";
const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin()}>
            <h4 className="text-2xl mb-7">LogIn</h4>
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />

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
