const { Driver, Team } = require("../db");

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
    const newDriver = await Driver.create({
      forename,
      surname,
      description,
      image,
      nationality,
      dob,
    });

    const teamNames = teams.split(";").map((team) => team.trim());
    const foundTeams = await Team.findAll({
      where: {
        name: teamNames,
      },
    });

    await newDriver.addTeams(foundTeams);

    return { message: "Conductor creado exitosamente" };
  } catch (error) {
    console.error("Error al crear conductor:", error);
    throw new Error("Error al crear conductor");
  }
};

module.exports = postDriver;
