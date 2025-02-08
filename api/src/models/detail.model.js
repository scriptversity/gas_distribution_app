const orderDetailsModel = (sequelize, DataTypes) => {
  const OrderDetails = sequelize.define(
    "order_details",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      priceAtPurchase: {
        type: DataTypes.FLOAT,
        allowNull: false, // Saves the price when the order was placed
      },
    },
    {
      timestamps: false,
    }
  );

  return OrderDetails;
};

export default orderDetailsModel;
