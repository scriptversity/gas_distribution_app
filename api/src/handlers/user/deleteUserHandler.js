import { User } from "../../database/db.js";

// soft deletion approach
export const softDeleteUserHandler = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Soft delete the user
    await user.sequelize.transaction(async (t) => {
      user.isDeleted = true;
      await user.save({ transaction: t });
    });

    res.status(200).json({ success: true, msg: "User soft deleted successfully" });
  } catch (error) {
    console.error("Error soft deleting user:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// I will use this later
//const user = await User.findOne({ where: { id: req.user.id, isDeleted: false } });

// // hard deletion approach
// export const deleteUserHandler = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.user.id);

//     if (!user) {
//       return res.status(404).json({ success: false, error: "User not found" });
//     }

//     // Use transaction for database integrity
//     await user.sequelize.transaction(async (t) => {
//       await user.destroy({ transaction: t });
//     });

//     res.status(200).json({ success: true, msg: "User deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     res.status(500).json({ success: false, error: "Internal server error" });
//   }
// };
