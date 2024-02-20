const { Router } = require("express");
const { getTeams } = require("../controllers/GetTeams");
const { handleGetAllDrivers } = require("../handlers/handlerGetAll");
const { handleGetDriverById } = require("../handlers/handlerGetById");
const { getDriversByName } = require("../handlers/handlerGetByName");

const router = Router();

router.get("/AllDrivers", handleGetAllDrivers);

router.get("/driverById/:id", handleGetDriverById);

router.get("/teams", getTeams);

router.get("/driverByName", getDriversByName);

module.exports = router;
