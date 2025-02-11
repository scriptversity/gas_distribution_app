// authController.js
import { User } from "../../database/db.js";

export const getUserById = async (userId) => {
  try {
    // Retrieve user from the database
    const user = await User.findOne({
      where: {
        id: userId,
      },
      attributes: { exclude: ["password"] }, // Exclude password field
    });

    // Check if user exists
    if (!user) {
      return { error: "User not found", statusCode: 404 };
    }

    // Return user data (without password)
    return { user, statusCode: 200 };
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Error retrieving user:", err.message);

    // Return an error message and status code
    return { error: " Internal Server Error" };
  }
};
