import { SSHConnection } from "../db/db";
import { Request, Response } from "express";

export const get = (_: Request, res: Response) => {
  SSHConnection.then((connection) => {
    connection.query("SELECT * FROM heating.config", (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });
};

export const post = (req: Request, res: Response) => {
  const { MQTT_server, MQTT_username, MQTT_pass, MQTT_port } = req.body;
  if (!(MQTT_server && MQTT_username && MQTT_pass && MQTT_port)) {
    res.status(400).json("Bad Request");
  }
  SSHConnection.then((connection) => {
    const query = `UPDATE heating.config SET ?`;
    connection.query(
      query,
      {
        MQTT_server,
        MQTT_username,
        MQTT_pass,
        MQTT_port,
      },
      (error) => {
        if (error) {
          res.status(400).json(error);
        }
        res.json("ok");
      }
    );
  });
};
