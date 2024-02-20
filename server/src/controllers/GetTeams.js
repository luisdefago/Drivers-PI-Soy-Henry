const { default: axios } = require("axios");
const { Driver } = require("../db"); // Importa el modelo del conductor

const getUniqueTeams = (drivers) => {
  const teamsSet = new Set();
  drivers.forEach((driver) => {
    // Verificar si la propiedad "teams" es una cadena
    if (typeof driver.teams === "string") {
      // Dividir la cadena en un array y agregar cada equipo al conjunto
      const teamsArray = driver.teams.split(",");
      teamsArray.forEach((team) => {
        teamsSet.add(team.trim()); // Eliminar espacios en blanco alrededor del nombre del equipo
      });
    } else if (Array.isArray(driver.teams)) {
      // Si la propiedad "teams" es un array, agregar cada equipo al conjunto
      driver.teams.forEach((team) => {
        teamsSet.add(team.trim()); // Eliminar espacios en blanco alrededor del nombre del equipo
      });
    }
  });
  return Array.from(teamsSet);
};

const getTeamsFromDatabase = async () => {
  // Función para obtener los equipos de la base de datos
  const drivers = await Driver.findAll();
  return getUniqueTeams(drivers);
};

const getTeamsFromAPI = async () => {
  try {
    // Hacer una solicitud para obtener todos los conductores disponibles
    const response = await axios.get(
      "http://127.0.0.1:3001/drivers/AllDrivers"
    );
    const drivers = response.data; // Suponiendo que la respuesta tiene una propiedad "data" que contiene los conductores

    // Obtener equipos únicos de los conductores de la respuesta
    const uniqueTeams = getUniqueTeams(drivers);

    return uniqueTeams;
  } catch (error) {
    console.error("Error al obtener los equipos de la API:", error);
    throw new Error("Error al obtener los equipos de la API");
  }
};

module.exports = {
  getTeamsFromDatabase,
  getTeamsFromAPI,
};
