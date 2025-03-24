import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, age };

    console.log("Sending Data:", userData);

    try {
      const response = await axios.post("https://mern-crud-api-alpha.vercel.app/createUser", userData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201 || response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating user:", error.response ? error.response.data : error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Create User</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
