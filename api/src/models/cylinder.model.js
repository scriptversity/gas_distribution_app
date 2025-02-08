const cylinderModel = (sequelize, DataTypes) => {
  const Cylinder = sequelize.define(
    "cylinder",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Cylinder;
};

export default cylinderModel;
