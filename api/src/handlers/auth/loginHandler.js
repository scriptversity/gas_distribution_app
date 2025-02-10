import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "../../database/db.js";
import { Token } from "../../database/db.js";

export const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "Missing required fields" });
    }

    let user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, msg: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, msg: "Invalid email or password" });
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { userId: user.id, isAdmin: user.admin },
      process.env.JWT_ACCESS_SECRET,
      { algorithm: "HS256", expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { userId: user.id, isAdmin: user.admin },
      process.env.JWT_REFRESH_SECRET,
      { algorithm: "HS256", expiresIn: "7d" }
    );

    try {
      // Store refresh token in database (overwrite any existing tokens for this user)
      await Token.destroy({ where: { userId: user.id } });
      await Token.create({
        userId: user.id,
        token: crypto.createHash("sha256").update(refreshToken).digest("hex"),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    } catch (tokenError) {
      console.error("Error storing refresh token:", tokenError);
      return res
        .status(500)
        .json({ success: false, msg: "Token storage failed" });
    }

    res.status(200).json({
      success: true,
      msg: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};
