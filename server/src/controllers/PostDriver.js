const { Driver, Team } = require("../db");

// Crea un nuevo conductor en la base de datos con la información proporcionada
const postDriver = async (
  forename,
  surname,
  description,
  image,
  nationality,
  dob,
  teams
) => {
  try {
    // Crea el nuevo conductor en la base de datos
    const newDriver = await Driver.create({
      forename,
      surname,
      description,
      image,
      nationality,
      dob,
    });

    // Divide los nombres de los equipos y los limpia
    const teamNames = teams.split(",").map((team) => team.trim());
    // Busca los equipos en la base de datos
    const foundTeams = await Team.findAll({
      where: {
        name: teamNames,
      },
    });

    // Asocia los equipos encontrados al nuevo conductor
    await newDriver.addTeams(foundTeams);

    // Retorna un mensaje de éxito
    return { message: "Conductor creado exitosamente" };
  } catch (error) {
    // Maneja cualquier error ocurrido durante el proceso
    console.error("Error al crear conductor:", error);
    throw new Error("Error al crear conductor");
  }
};

module.exports = postDriver;
