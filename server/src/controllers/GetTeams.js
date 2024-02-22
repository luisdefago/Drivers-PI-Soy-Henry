const { Team } = require("../db");
const axios = require("axios");

const getUniqueTeams = (drivers) => {
  const teamsSet = new Set();
  drivers.forEach((driver) => {
    if (typeof driver.teams === "string") {
      const teamsArray = driver.teams.split(",");
      teamsArray.forEach((team) => {
        teamsSet.add(team.trim());
      });
    } else if (Array.isArray(driver.teams)) {
      driver.teams.forEach((team) => {
        teamsSet.add(team.trim());
      });
    }
  });
  return Array.from(teamsSet);
};

const getTeamsFromDatabase = async () => {
  const teams = await Team.findAll();
  return teams.map((team) => team.name);
};

const getTeamsFromAPI = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:3001/drivers/AllDrivers"
    );
    const drivers = response.data;
    const uniqueTeams = getUniqueTeams(drivers);
    return uniqueTeams;
  } catch (error) {
    console.error("Error al obtener los equipos de la API:", error);
    throw new Error("Error al obtener los equipos de la API");
  }
};

const saveTeamsToDatabase = async (teams) => {
  try {
    const existingTeams = await Team.findAll();
    if (existingTeams.length === 0) {
      const teamsToSave = teams.map((name) => ({ name }));
      await Team.bulkCreate(teamsToSave);
      console.log("Teams agregados a la db");
    }
  } catch (error) {
    console.error("Error al guardar los equipos en la base de datos:", error);
    throw new Error("Error al guardar los equipos en la base de datos");
  }
};

const getTeams = async () => {
  let teamsFromDatabase;
  try {
    teamsFromDatabase = await getTeamsFromDatabase();
    if (teamsFromDatabase.length === 0) {
      const teamsFromAPI = await getTeamsFromAPI();
      await saveTeamsToDatabase(teamsFromAPI);
      teamsFromDatabase = teamsFromAPI;
    }
  } catch (error) {
    console.error("Error al obtener los equipos:", error);
    throw new Error("Error al obtener los equipos");
  }
  return teamsFromDatabase;
};

module.exports = {
  getTeams,
};
