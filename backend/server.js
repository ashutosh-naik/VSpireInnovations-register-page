const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

/* ================= MONGODB CONNECTION ================= */

mongoose
  .connect("mongodb://127.0.0.1:27017/registerApp")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

/* ================= SIGNUP API ================= */
// POST /signup
app.post("/signup", async (req, res) => {
  try {
    const { email, phone } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= LOGIN API ================= */
// POST /login
app.post("/login", async (req, res) => {
  try {
    const { loginId, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: loginId }, { phone: loginId }],
      password,
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login success", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= GET USER ================= */
// GET /user/:email
app.get("/user/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =====================================================
   STEP 4: UPDATE USER PROFILE (PUT)
   ===================================================== */
// PUT /user/:email
app.put("/user/:email", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.params.email },
      {
        fullName: req.body.fullName,
        age: req.body.age,
        phone: req.body.phone,
        address: req.body.address,
        pincode: req.body.pincode,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =====================================================
   STEP 5: UPDATE PASSWORD (PATCH)
   ===================================================== */
// PATCH /user/password/:email
app.patch("/user/password/:email", async (req, res) => {
  try {
    const { password } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { email: req.params.email },
      { password },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Password updated" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= DELETE USER ================= */
// DELETE /user/:email
app.delete("/user/:email", async (req, res) => {
  try {
    await User.findOneAndDelete({ email: req.params.email });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= SERVER ================= */

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
