const {
  getDriversByNameFromDatabase,
  getDriversByNameFromServer,
} = require("../controllers/GetDriverByName");

const getDriversByName = async (req, res) => {
  try {
    const { name } = req.query; // Obtener el nombre de la consulta

    // Buscar conductores en la base de datos y en el servidor
    const driversFromDatabase = await getDriversByNameFromDatabase(name);
    const driversFromServer = await getDriversByNameFromServer(name);

    // Evitar duplicados en la lista combinada de conductores
    const uniqueDrivers = {};

    driversFromDatabase.forEach((driver) => {
      uniqueDrivers[driver.id] = driver;
    });

    driversFromServer.forEach((driver) => {
      uniqueDrivers[driver.id] = driver;
    });

    const combinedDrivers = Object.values(uniqueDrivers);

    // Devolver los primeros 15 conductores encontrados
    const first15Drivers = combinedDrivers.slice(0, 15);

    if (first15Drivers.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron conductores con ese nombre." });
    }

    return res.json(first15Drivers);
  } catch (error) {
    console.error("Error al buscar conductores:", error);
    return res.status(500).json({ message: "Error al buscar conductores." });
  }
};

module.exports = {
  getDriversByName,
};
