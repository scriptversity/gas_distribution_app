const productModel = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "product",
    {
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Product;
};

export default productModel;
