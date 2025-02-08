const phoneModel = (sequelize, DataTypes) => {
  const Phone = sequelize.define(
    "phone",
    {
      number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ownerType: {
        type: DataTypes.ENUM("user", "business", "deliverer"), // To know who owns the phone
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

// const phoneModel = (sequelize, DataTypes) => {
//   const Phone = sequelize.define(
//     "phone",
//     {
//       number: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//     },
//     {
//       timestamps: false,
//     }
//   );

//   return Phone;
// };

// export default phoneModel;
