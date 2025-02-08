const tokenModel = (sequelize, DataTypes) => {
  const Token = sequelize.define(
    "token",
    {
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Token;
};

export default tokenModel;
