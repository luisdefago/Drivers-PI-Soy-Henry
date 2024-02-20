const { Driver } = require("../db");
const axios = require("axios");

const getDriverByIdFromDatabase = async (id) => {
  try {
    const driver = await Driver.findByPk(id);
    return driver;
  } catch (error) {
    console.error("Error al obtener conductor de la base de datos:", error);
    throw new Error("Error al obtener conductor de la base de datos");
  }
};

const getDriverByIdFromServer = async (id) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:3001/drivers/AllDrivers`
    );
    driversApi = response.data;
    const driver = driversApi.filter((driv) => driv.id.toString() === id);
    return driver;
  } catch (error) {
    console.error("Error al obtener conductor del servidor:", error);
    throw new Error("Error al obtener conductor del servidor");
  }
};

const getDriverById = async (id) => {
  try {
    // Obtener el conductor por su ID desde la base de datos
    const driverFromDatabase = await getDriverByIdFromDatabase(id);

    if (driverFromDatabase) {
      return driverFromDatabase;
    }

    // Si no se encuentra el conductor en la base de datos, buscarlo en el servidor local
    const driverFromServer = await getDriverByIdFromServer(id);

    if (driverFromServer) {
      return driverFromServer;
    }

    // Si no se encuentra el conductor en ninguna fuente de datos, lanzar un error
    throw new Error("Conductor no encontrado");
  } catch (error) {
    console.error("Error al obtener conductor:", error);
    throw new Error("Error al obtener conductor");
  }
};

module.exports = {
  getDriverById,
};
