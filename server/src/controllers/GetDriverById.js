const axios = require("axios");
const { Driver, Team } = require("../db");

const getDriverByIdFromDatabase = async (id) => {
  try {
    const driver = await Driver.findByPk(id, {
      include: {
        model: Team,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return driver;
  } catch (error) {
    console.error("Error al obtener conductor de la base de datos:", error);
    throw new Error("Error al obtener conductor de la base de datos");
  }
};

const getDriverByIdFromServer = async (id) => {
  try {
    // Hacer una solicitud para obtener todos los conductores disponibles
    const response = await axios.get(
      `http://127.0.0.1:3001/drivers/AllDrivers`
    );
    // Obtener los conductores de la respuesta
    const driversApi = response.data;
    // Buscar el conductor por ID
    const driver = driversApi.filter((driv) => driv.id.toString() === id);
    // Devolver el conductor encontrado o un arreglo vacío si no se encuentra
    return driver ? [driver] : [];
  } catch (error) {
    console.error("Error al obtener conductor del servidor:", error);
    throw new Error("Error al obtener conductor del servidor");
  }
};

const getDriverById = async (id, source) => {
  try {
    if (source === "api") {
      return await getDriverByIdFromServer(id);
    } else {
      return await getDriverByIdFromDatabase(id);
    }
  } catch (error) {
    console.error("Error al obtener conductor:", error);
    throw new Error("Error al obtener conductor");
  }
};

module.exports = {
  getDriverById,
};
