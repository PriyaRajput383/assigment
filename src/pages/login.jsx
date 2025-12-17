import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));

   
    if (!savedUser) {
      alert("Please register first");
      return;
    }

 
    if (
      email === savedUser.email &&
      password === savedUser.password
    ) {
      
      localStorage.setItem("isLoggedIn", "true");
      navigate("/account");
    } else {
      alert("Wrong Email or Password");
      navigate("/");
    }
  };

  return (
   <div className="h-screen w-full flex flex-col justify-center items-center">
   <h1 className="text-4xl p-3 font-bold">LOGIN</h1>
        <div className="border border-gray-400 w-100 p-3">
             <form onSubmit={handleLogin}>
      <input
      className="border py-2 px-3 w-full"
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
      className="border py-2 px-3 w-full"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button type="submit" className="bg-green-500 p-2 text-white mr-1 cursor-pointer">Login</button>
      <NavLink to={'/register'} ><button className="bg-blue-500 p-2 text-white mr-1 cursor-pointer" >Register</button></NavLink>
    </form>
        </div>
   </div>
  );
}

export default Login;
