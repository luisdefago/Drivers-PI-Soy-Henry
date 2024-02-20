const driversController = require("../controllers/GetDriverById");

async function handleGetDriverById(req, res) {
  try {
    const id = req.params.id;
    const driver = await driversController.getDriverById(id);
    if (driver) {
      res.json(driver);
    } else {
      res.status(404).json({ message: "Conductor no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener conductor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  handleGetDriverById,
};
