const { default: axios } = require("axios");
const { Sequelize } = require("sequelize");
const { Driver, Team } = require("../db");

const getDriversByNameFromDatabase = async (name) => {
  const drivers = await Driver.findAll({
    where: {
      [Sequelize.Op.or]: [
        { forename: { [Sequelize.Op.iLike]: `%${name}%` } },
        { surname: { [Sequelize.Op.iLike]: `%${name}%` } },
        Sequelize.literal(`forename || ' ' || surname ILIKE '%${name}%'`),
      ],
    },
    include: [{ model: Team, through: "DriverTeam" }],
  });

  return drivers;
};

const getDriversByNameFromServer = async (name) => {
  try {
    // Hacer una solicitud para obtener todos los conductores disponibles
    const response = await axios.get(
      `http://127.0.0.1:3001/drivers/AllDrivers`
    );
    // Obtener los conductores de la respuesta
    const driversApi = response.data;
    // Filtrar los conductores por nombre o apellido
    const nameLowercase = name.toLowerCase();
    const drivers = driversApi.filter((driver) => {
      const fullName =
        `${driver.name.forename} ${driver.name.surname}`.toLowerCase();
      return fullName.includes(nameLowercase);
    });
    // Devolver los conductores encontrados
    return drivers;
  } catch (error) {
    console.error("Error al obtener conductores del servidor:", error);
    throw new Error("Error al obtener conductores del servidor");
  }
};

module.exports = {
  getDriversByNameFromDatabase,
  getDriversByNameFromServer,
};
