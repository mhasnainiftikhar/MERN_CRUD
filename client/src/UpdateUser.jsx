import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateUser() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.msg) {
          console.error(data.msg);
        } else {
          setName(data.name);
          setEmail(data.email);
          setAge(data.age);
        }
      })
      .catch((error) => console.error("Failed to fetch user data", error));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, age }),
      });

      if (!response.ok) throw new Error("Failed to update user");

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold text-center mb-4">Update User</h2>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <input type="text" placeholder="Name" className="border p-2 rounded" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" className="border p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="number" placeholder="Age" className="border p-2 rounded" value={age} onChange={(e) => setAge(e.target.value)} required />
        <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">Update</button>
      </form>
    </div>
  );
}

export default UpdateUser;
