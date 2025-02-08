const orderModel = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "order",
    {
      status: {
        type: DataTypes.ENUM(
          "pending",
          "confirmed",
          "shipped",
          "delivered",
          "cancelled"
        ),
        allowNull: false,
        defaultValue: "pending",
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      // quantity: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
    },
    {
      timestamps: false,
    }
  );

  return Order;
};

export default orderModel;
