import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);

  // Fetch users from the backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Delete user function
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://mern-crud-api-alpha.vercel.app/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        User List
      </h2>
      <div className="overflow-x-auto">
        <Link to="/create">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600 transition">
            Add New User
          </button>
        </Link>
        <table className="w-full border-collapse border border-gray-200 shadow-md text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border border-gray-300">Name</th>
              <th className="p-3 border border-gray-300">Email</th>
              <th className="p-3 border border-gray-300">Age</th>
              <th className="p-3 border border-gray-300 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-300">{user.name}</td>
                  <td className="p-3 border border-gray-300">{user.email}</td>
                  <td className="p-3 border border-gray-300">{user.age}</td>
                  <td className="p-3 border border-gray-300 text-center">
                    <Link to={`/update/${user._id}`}>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition mr-2">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
