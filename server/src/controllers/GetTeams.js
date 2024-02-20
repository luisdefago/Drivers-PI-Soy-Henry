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

const getTeamsFromJSON = async () => {
  try {
    // Cargar los datos del archivo JSON
    const data = require("../../api/db.json");
    const drivers = data.drivers; // Acceder a la clave "drivers"

    // Obtener equipos únicos de los conductores del archivo JSON
    const uniqueTeams = getUniqueTeams(drivers);

    return uniqueTeams;
  } catch (error) {
    console.error("Error al obtener los equipos del archivo JSON:", error);
    throw new Error("Error al obtener los equipos del archivo JSON");
  }
};

const getTeams = async (req, res) => {
  try {
    // Obtener los equipos de la base de datos
    const teamsFromDatabase = await getTeamsFromDatabase();
    // Obtener los equipos del archivo JSON
    const teamsFromJSON = await getTeamsFromJSON();

    // Unir los equipos de la base de datos y del archivo JSON
    const allTeams = new Set([...teamsFromDatabase, ...teamsFromJSON]);

    // Convertir el conjunto a un array y enviar la respuesta
    const uniqueTeams = Array.from(allTeams);

    // Responder con los equipos obtenidos
    return res.json(uniqueTeams);
  } catch (error) {
    console.error("Error al obtener los equipos:", error);
    return res.status(500).json({ message: "Error al obtener los equipos" });
  }
};

module.exports = {
  getTeams,
};
