// authHandler.js
import { getUserById } from "../../controllers/auth/authController.js";

export const authHandler = async (req, res) => {
  try {
    // Validate if user ID is provided
    if (!req.user || !req.user.id) {
      return res
        .status(400)
        .json({ success: false, error: "User ID is required" });
    }

    // Call the controller to get user data
    const { user, error, statusCode } = await getUserById(req.user.id);

    // Return the appropriate response
    if (error) {
      return res.status(statusCode).json({ success: false, error });
    }

    res.status(statusCode).json({ success: true, msg: "Authenticated", user });
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Unexpected error in authHandler:", err.message);

    // Return a generic server error message
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
