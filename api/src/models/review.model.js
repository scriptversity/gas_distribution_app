const reviewModel = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "review",
    {
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  // Review.associate = (models) => {
  //   Review.belongsTo(models.User, { foreignKey: "userId" });
  //   Review.belongsTo(models.Business, { foreignKey: "businessId" });
  // };

  return Review;
};

export default reviewModel;
