const driversController = require("../controllers/GetAllDriver");

async function handleGetAllDrivers(req, res) {
  try {
    const drivers = driversController.getAllDrivers();
    res.json(drivers);
  } catch (error) {
    console.error("Error al obtener conductores:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  handleGetAllDrivers,
};
