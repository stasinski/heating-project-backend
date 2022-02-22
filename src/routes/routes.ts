import { Router } from "express";
import controller from "../controllers";

const route = Router();

route.get("/relays", controller.relays.get);

route.get("/config", controller.config.get);

route.get("/sensors-config", controller.sensors.get);

route.put("/relays", controller.relays.put);

route.post("/config", controller.config.post);

route.put("/sensors-config", controller.sensors.put);

export default route;
