const { Router } = require("express");
const { getTeams } = require("../controllers/GetTeams");
const { getDriversByName } = require("../controllers/GetDriverByName");
const { handleGetAllDrivers } = require("../handlers/handlerGetAll");
const { handleGetDriverById } = require("../handlers/handlerGetById");

const router = Router();

router.get("/AllDrivers", handleGetAllDrivers);

router.get("/driverById/:id", handleGetDriverById);

router.get("/teams", getTeams);

router.get("/driverByName/name", getDriversByName);

module.exports = router;
