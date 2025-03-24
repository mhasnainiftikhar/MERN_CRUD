const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection 
mongoose
  .connect(
    "mongodb+srv://hasnainiftikhar930:EY4VOBV0cDsVVlpt@crud.abgd7.mongodb.net/?retryWrites=true&w=majority&appName=crud",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Fetch Single User
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ msg: "Failed to fetch user" });
  }
});

// Fetch All Users
app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users: " + error.message });
  }
});

// Create a New User
app.post("/createUser", async (req, res) => {
  console.log("Received Request Body:", req.body); 

  try {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
      return res
        .status(400)
        .json({ msg: "All fields (name, email, age) are required" });
    }

    const user = await UserModel.create({ name, email, age });
    res.status(201).json(user);
  } catch (err) {
    console.error("Error in /createUser:", err);
    res.status(500).json({ msg: "Failed to create user: " + err.message });
  }
});

// Update User
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
      return res
        .status(400)
        .json({ msg: "All fields (name, email, age) are required" });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ msg: "Failed to update user" });
  }
});

// Delete User
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ msg: "Failed to delete user" });
  }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
