import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "../../database/db.js";
import { Token } from "../../database/db.js";

export const signupHandler = async (req, res) => {
  const { name, email, password, address, role = "user", image } = req.body;

  try {
    // 1️⃣ Validate required fields
    if (!name || !email || !password || !address) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    // 2️⃣ Check if email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, error: "Email already in use" });
    }

    // 3️⃣ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role,
      image,
    });

    // 5️⃣ Generate tokens
    const accessToken = jwt.sign(
      { userId: newUser.id, isAdmin: newUser.admin },
      process.env.JWT_ACCESS_SECRET,
      { algorithm: "HS256", expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { userId: newUser.id, isAdmin: newUser.admin },
      process.env.JWT_REFRESH_SECRET,
      { algorithm: "HS256", expiresIn: "7d" }
    );

    // 6️⃣ Store hashed refresh token in database (with error handling)
    try {
      await Token.create({
        userId: newUser.id,
        token: crypto.createHash("sha256").update(refreshToken).digest("hex"),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    } catch (tokenError) {
      console.error("Error storing refresh token:", tokenError);
      return res
        .status(500)
        .json({ success: false, error: "Error storing refresh token" });
    }

    // 7️⃣ Send response (excluding password)
    res.status(201).json({
      success: true,
      msg: "User registered successfully",
      // user: {
      //   id: newUser.id,
      //   name: newUser.name,
      //   email: newUser.email,
      //   address: newUser.address,
      //   role: newUser.role,
      //   image: newUser.image,
      // },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
