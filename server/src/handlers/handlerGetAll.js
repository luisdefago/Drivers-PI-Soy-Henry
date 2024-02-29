const driversController = require("../controllers/GetAllDriver");

// Maneja la obtención de todos los conductores
async function handleGetAllDrivers(req, res) {
  try {
    const drivers = driversController.getAllDrivers();

    res.json(drivers);
  } catch (error) {
    // Maneja cualquier error ocurrido durante el proceso
    console.error("Error al obtener conductores:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  handleGetAllDrivers,
};
