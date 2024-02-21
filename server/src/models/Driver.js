const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  console.log("Definiendo modelo Driver...");
  sequelize.define("Driver", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    forename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });
};

// sequelize.define('Driver', {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     allowNull: false,
//     primaryKey: true,
//   },
//   forname: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   surname: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   } ,
//   image: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   nationality: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   dob: {
//     type: DataTypes.STRING,
//     allowNull: false,

//   }
// }, { timestamps: false});
// };

// sequelize.define("Driver", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   number: {
//     type: DataTypes.INTEGER,
//     allowNull: true,
//   },
//   code: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   forename: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   surname: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   image_url: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   imageby: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   dob: {
//     type: DataTypes.DATEONLY,
//     allowNull: false,
//   },
//   nationality: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   url: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   teams: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });
// };
