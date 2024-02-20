const { Driver } = require("../db"); // Importa el modelo del conductor

const getDriversByNameFromDatabase = async (name) => {
  // Lógica para buscar conductores en la base de datos por nombre
  const drivers = await Driver.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`, // Búsqueda sin distinguir mayúsculas y minúsculas
      },
    },
  });
  return drivers;
};

const getDriversByNameFromJSON = async (name) => {
  try {
    // Cargar los datos del archivo JSON
    const data = require("../../api/db.json");
    const drivers = data.drivers; // Acceder a la clave "drivers"
    console.log(drivers);

    // Filtrar los conductores por nombre, sin distinguir mayúsculas y minúsculas
    const filteredDrivers = drivers.filter((driver) =>
      driver.name.toLowerCase().includes(name.toLowerCase())
    );

    return filteredDrivers;
  } catch (error) {
    console.error("Error al obtener conductores del archivo JSON:", error);
    throw new Error("Error al obtener conductores del archivo JSON");
  }
};

const getDriversByName = async (req, res) => {
  try {
    const { name } = req.query; // Obtener el nombre de la consulta

    // Buscar conductores en la base de datos y en el archivo JSON
    const driversFromDatabase = await getDriversByNameFromDatabase(name);
    const driversFromJSON = await getDriversByNameFromJSON(name);

    // Combinar los resultados de ambas búsquedas
    const combinedDrivers = [...driversFromDatabase, ...driversFromJSON];

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
