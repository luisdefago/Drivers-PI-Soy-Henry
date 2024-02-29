const { getDriverById } = require("../controllers/GetDriverById");

// Maneja la obtención de un conductor por su ID
async function handleGetDriverById(req, res) {
  try {
    const { id } = req.params;

    const source = isNaN(id) ? "db" : "api";

    const response = await getDriverById(id, source);

    if (response) {
      res.json(response);
    } else {
      res.status(404).json({ message: "Conductor no encontrado" });
    }
  } catch (error) {
    // Maneja cualquier error ocurrido durante el proceso
    console.error("Error al obtener conductor:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  handleGetDriverById,
};
