import { User } from "../../database/db.js";

export const updateUserInfoHandler = async (req, res) => {
  const { name, address, image } = req.body;

  // Ensure at least one field is provided for an update
  if (!name && !address && !image) {
    return res
      .status(400)
      .json({ success: false, error: "At least one field must be updated" });
  }

  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Begin transaction to ensure atomicity
    await user.sequelize.transaction(async (t) => {
      if (name) user.name = name;
      if (address) user.address = address;
      if (image) user.image = image;

      await user.save({ transaction: t });
    });

    res.status(200).json({
      success: true,
      msg: "User information updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error updating user info:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
