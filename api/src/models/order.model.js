const orderModel = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "order",
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Order;
};

export default orderModel;
