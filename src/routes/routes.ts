import { Router } from "express";
import controller from "../controllers";

const route = Router();

route.get("/relays", controller.relays.get);

route.get("/config", controller.config.get);

route.get("/sensors-config", controller.sensors.get);

route.post("/relays", controller.relays.post);

route.post("/config", controller.config.post);

route.post("/sensors-config", controller.sensors.post);

export default route;
