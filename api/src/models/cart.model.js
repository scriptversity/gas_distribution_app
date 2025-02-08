const cartModel = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "cart",
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Cart;
};

export default cartModel;
