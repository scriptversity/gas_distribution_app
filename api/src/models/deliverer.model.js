const delivererModel = (sequelize, DataTypes) => {
  const Deliverer = sequelize.define(
    "deliverer",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("available", "busy", "inactive", "on delivery"),
        allowNull: false,
        defaultValue: "available",
      },
      // phone: {
      //   type: DataTypes.ARRAY(DataTypes.STRING),
      //   allowNull: false,
      // },
    },
    {
      timestamps: false,
    }
  );

  return Deliverer;
};

export default delivererModel;
