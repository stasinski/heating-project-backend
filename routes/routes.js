const express = require("express");
const controller = require("../controllers/controllers");

const route = express.Router();

route.get("/", controller.getRelays);

route.get("/relays", controller.getRelays);

route.get("/config", controller.getConfig);

route.get("/sensors-config", controller.getSensorsConfig);

route.post("/relays", controller.postRelays);

route.post("/config", controller.postConfig);

route.post("/sensors-config", controller.postSensorsConfig);

module.exports = route;
