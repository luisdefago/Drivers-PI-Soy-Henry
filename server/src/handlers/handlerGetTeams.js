const { getTeams } = require("../controllers/GetTeams");

// Maneja la obtención de los teams
const getTeamsHandler = async (req, res) => {
  try {
    const teams = await getTeams();
    return res.json(teams);
  } catch (error) {
    // Maneja cualquier error ocurrido durante el proceso
    console.error("Error al obtener los equipos:", error);
    return res.status(500).json({ message: "Error al obtener los equipos" });
  }
};

module.exports = {
  getTeamsHandler,
};
