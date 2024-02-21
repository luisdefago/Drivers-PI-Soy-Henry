const axios = require("axios");
const { Driver, Team } = require("../db");

const getDriverByIdFromDatabase = async (id) => {
  try {
    console.log(id);
    console.log(await Driver.findByPk(id));
    const driver = await Driver.findByPk(id);
    return driver;
  } catch (error) {
    console.error("Error al obtener conductor de la base de datos:", error);
    throw new Error("Error al obtener conductor de la base de datos");
  }
};

const getDriverByIdFromServer = async (id) => {
  try {
    const response = await axios.get(`"http://localhost:5000/drivers"/${id}`);
    const driver = response.data;
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
