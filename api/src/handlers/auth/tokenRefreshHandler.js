import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Token, User } from "../../database/db.js";

export const tokenRefreshHandler = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ success: false, error: "No refresh token provided" });
  }

  try {
    // Hash the provided refresh token (since it's stored hashed in DB)
    const hashedToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    // Find the token in the database
    const storedToken = await Token.findOne({ where: { token: hashedToken } });

    if (!storedToken) {
      return res
        .status(403)
        .json({ success: false, error: "Invalid refresh token" });
    }

    // Verify the refresh token
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      // Remove invalid/expired token from DB
      try {
        await Token.destroy({ where: { token: hashedToken } });
      } catch (dbError) {
        console.error("Error deleting expired refresh token:", dbError);
      }
      return res
        .status(403)
        .json({ success: false, error: "Expired or invalid refresh token" });
    }

    // Find the user associated with the token
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Generate a new access and refresh token
    const newAccessToken = jwt.sign(
      { userId: user.id, isAdmin: user.admin },
      process.env.JWT_ACCESS_SECRET,
      { algorithm: "HS256", expiresIn: "1h" }
    );

    const newRefreshToken = jwt.sign(
      { userId: user.id, isAdmin: user.admin },
      process.env.JWT_REFRESH_SECRET,
      { algorithm: "HS256", expiresIn: "7d" }
    );

    // Hash the new refresh token
    const newHashedToken = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");

    // Delete old refresh token and store the new one
    try {
      await Token.destroy({ where: { token: hashedToken } });
      await Token.create({
        userId: user.id,
        token: newHashedToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    } catch (dbError) {
      console.error("Error updating refresh token in database:", dbError);
      return res
        .status(500)
        .json({ success: false, error: "Database error, try again later" });
    }

    res.status(200).json({
      success: true,
      msg: "Token refreshed successfully",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    console.error("Error during token refresh:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
