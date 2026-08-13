const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/* =========================
   REGISTER
========================= */

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      companyName,
    } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    if (!["admin", "vendor"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

   const user = await User.create({
  name,
  email,
  password: hashedPassword,
  role,
  companyName: companyName || "",
  isApproved: role === "admin",
  status: role === "admin" ? "approved" : "pending",
});

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        isApproved: user.isApproved,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Server error during registration",
    });
  }
});


/* =========================
   LOGIN
========================= */

router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password and role are required",
      });
    }

    const user = await User.findOne({
      email,
      role,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email, password or role",
      });
    }

    if (role === "vendor" && !user.isApproved) {
      return res.status(403).json({
        message: "Vendor account is waiting for approval",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email, password or role",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        isApproved: user.isApproved,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Server error during login",
    });
  }
});

// =========================
// GET PENDING VENDORS
// =========================

router.get("/vendors/pending", async (req, res) => {
  try {
    const vendors = await User.find({
      role: "vendor",
      isApproved: false,
    }).select("-password");

    res.json(vendors);
  } catch (error) {
    console.error("FETCH VENDORS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch pending vendors",
    });
  }
});
// =========================
// APPROVE VENDOR
// =========================

router.put("/vendors/:id/approve", async (req, res) => {
  try {
    const vendor = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        role: "vendor",
      },
      {
  isApproved: true,
  status: "approved",
},
      {
        new: true,
      }
    ).select("-password");

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    res.json({
      message: "Vendor approved successfully",
      vendor,
    });
  } catch (error) {
    console.error("APPROVE VENDOR ERROR:", error);

    res.status(500).json({
      message: "Failed to approve vendor",
    });
  }
});
// =========================
// REJECT VENDOR
// =========================

router.put("/vendors/:id/reject", async (req, res) => {
  try {
    const vendor = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        role: "vendor",
      },
      {
        isApproved: false,
        status: "rejected",
      },
      {
        new: true,
      }
    ).select("-password");

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    res.json({
      message: "Vendor rejected successfully",
      vendor,
    });
  } catch (error) {
    console.error("REJECT VENDOR ERROR:", error);

    res.status(500).json({
      message: "Failed to reject vendor",
    });
  }
});

// =========================
// CREATE ADMIN
// =========================

router.post("/create-admin", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      companyName,
      adminSecret,
    } = req.body;

    if (!name || !email || !password || !adminSecret) {
      return res.status(400).json({
        message: "Please fill all required admin fields",
      });
    }

    // Secret key check
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({
        message: "Invalid admin secret",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      companyName: companyName || "",
      isApproved: true,
      status: "approved",
    });

    res.status(201).json({
      message: "Admin account created successfully",
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        companyName: admin.companyName,
        isApproved: admin.isApproved,
        status: admin.status,
      },
    });

  } catch (error) {
    console.error("CREATE ADMIN ERROR:", error);

    res.status(500).json({
      message: "Server error while creating admin",
    });
  }
});
module.exports = router;