import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    
   
    localStorage.setItem(
      "user",
      JSON.stringify({ name, email, password })
    );

    
    localStorage.setItem("isLoggedIn", "true");

    
    navigate("/account");
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h2 className="text-4xl font-bold p-3">Register Your New Acount</h2>

      <div className="w-100 border border-gray-400 p-3">
            <form onSubmit={handleRegister}>
        <input
          type="text"
          className="border py-2 px-3 w-full"
          placeholder="UserName"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
        />
        <br /><br />

        <input
          type="email"
          placeholder="Email"
          className="border py-2 px-3 w-full"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />
        <br /><br />

        <input
          type="password"
          className="border  py-2 px-3 w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />
        <br /><br />

        {error && <p className="bg-red-300 border border-red-600 text-white font-bold rounded-2xl p-3">{error} !</p>}

        <button type="submit" className="bg-blue-500 p-2 text-white mr-1 cursor-pointer mt-2" >Register</button>
      </form>
      </div>
    </div>
  );
};

export default Register;
