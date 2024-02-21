const { Router } = require("express");
const { handleGetAllDrivers } = require("../handlers/handlerGetAll");
const { handleGetDriverById } = require("../handlers/handlerGetById");
const { getDriversByName } = require("../handlers/handlerGetByName");
const { getTeams } = require("../handlers/handlerGetTeams");
const { handlePostDriver } = require("../handlers/handlePostDriver");

const router = Router();

router.get("/AllDrivers", handleGetAllDrivers);

router.get("/driverById/:id", handleGetDriverById);

router.get("/teams", getTeams);

router.get("/driverByName/name", getDriversByName);

router.post("/addDriver", handlePostDriver);

module.exports = router;
