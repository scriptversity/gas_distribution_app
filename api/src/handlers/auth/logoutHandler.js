import { Token } from "../../database/db.js";
import crypto from "crypto";

// is this version better than the other?
export const logoutHandler = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      // Hash refresh token and remove it from DB
      const hashedToken = crypto.createHash("sha256").update(refreshToken).digest("hex");
      await Token.destroy({ where: { token: hashedToken } });
    }

    // Respond with success even if there was no token
    res.status(200).json({ success: true, msg: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};


// import { Token } from "../../database/db.js";
// import crypto from "crypto";

// export const logoutHandler = async (req, res) => {
//   try {
//     const { refreshToken } = req.body;

//     if (!refreshToken) {
//       return res.status(400).json({ success: false, error: "No refresh token provided" });
//     }

//     // Hash the token since it's stored hashed in the DB
//     const hashedToken = crypto.createHash("sha256").update(refreshToken).digest("hex");

//     // Delete the token from the database
//     const deletedToken = await Token.destroy({ where: { token: hashedToken } });

//     if (!deletedToken) {
//       return res.status(404).json({ success: false, error: "Refresh token not found" });
//     }

//     res.status(200).json({ success: true, msg: "Logged out successfully" });
//   } catch (error) {
//     console.error("Logout error:", error);
//     res.status(500).json({ success: false, error: "Internal server error" });
//   }
// };
