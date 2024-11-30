import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { Link } from "react-router-dom";
import PasswordInput from "../components/PasswordInput.jsx";
import { validateEmail } from "../utilis/helper.js";

const SignUp = () => {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState(null);

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
