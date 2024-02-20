const {
  getTeamsFromDatabase,
  getTeamsFromAPI,
} = require("../controllers/GetTeams");

const getTeams = async (req, res) => {
  try {
    // Obtener los equipos de la base de datos
    const teamsFromDatabase = await getTeamsFromDatabase();
    // Obtener los equipos del archivo JSON
    const teamsFromJSON = await getTeamsFromAPI();

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
