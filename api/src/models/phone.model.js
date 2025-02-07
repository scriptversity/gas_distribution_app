const phoneModel = (sequelize, DataTypes) => {
  const Phone = sequelize.define(
    "phone",
    {
      number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Phone;
};

export default phoneModel;
