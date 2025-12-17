import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();

  const [savedUser, setSavedUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/");
    } else if (user) {
      setSavedUser(user);
      setName(user.name);
      setEmail(user.email);
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Name and Email are required");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    const updatedUser = { ...savedUser, name, email };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setSavedUser(updatedUser);
    setEdit(false);
    setError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const handleDeleteAccount = () => {
    if (!window.confirm("Are you sure? This will delete your account permanently.")) return;
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  if (!savedUser) return null; 

  return (
    <>
        <div className="h-screen w-full flex justify-center items-center ">
            {edit ? (
        <form onSubmit={handleSave}>
          <input
          className="border border-gray-400 py-2 px-3 w-full"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            placeholder="Enter Name"
          /><br /><br />

          <input
          className="border py-2 px-3 w-full"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="Enter Email"
          /><br /><br />

          {error && <p className="bg-red-300 border border-red-600 text-white font-bold rounded-2xl p-3">{error}</p>}

          <button type="submit" className="bg-blue-500 p-2 text-white mr-1 cursor-pointer">Save</button>&nbsp;
          <button type="button" onClick={() => setEdit(false)} className="bg-red-500 p-2 text-white mr-1 cursor-pointer">Cancel</button>
        </form>
      ) : (
        <div className=" border border-gray-400 px-10 py-3">
          <div className="font-bold">Name : {name}</div><br />
          <div className="font-bold">Email : {email}</div><br />

          <button onClick={handleLogout} className="bg-blue-500 p-2 text-white mr-1 cursor-pointer">Logout</button>&nbsp;
          <button onClick={() => setEdit(true)} className="bg-green-500 p-2 text-white mr-1 cursor-pointer">Edit</button>
          <br /><br />
          <button onClick={handleDeleteAccount} className="bg-red-500 p-2 text-white mr-1 cursor-pointer">Delete Account</button>
        </div>
      )}
   

        </div>   </>

);
};

export default Account;
