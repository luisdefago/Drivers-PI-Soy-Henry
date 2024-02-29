const fs = require("fs");
const path = require("path");

// Ruta al archivo JSON de los pilotos
const driversFilePath = path.join(__dirname, "../../api/db.json");

// Obtener todos los pilotos del archivo JSON
function getAllDrivers() {
  try {
    // Leer los datos del archivo JSON
    const driversData = fs.readFileSync(driversFilePath, "utf8");
    const driversJson = JSON.parse(driversData);
    const drivers = driversJson.drivers;

    // Si un piloto no tiene imagen, se le coloca una por defecto
    drivers.forEach((driver) => {
      if (!driver.image.url) {
        driver.image = { url: "/assets/img-default.jpg" };
      }
    });

    return drivers;
  } catch (error) {
    console.error("Error al obtener conductores:", error);
    throw new Error("Error interno del servidor");
  }
}

module.exports = {
  getAllDrivers,
};
