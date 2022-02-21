import { SSHConnection } from "../db/db";
import { Request, Response } from "express";

export const get = (_: Request, res: Response) => {
  SSHConnection.then((connection) => {
    connection.query(
      "SELECT * FROM heating.sensors_config",
      (error, results) => {
        if (error) throw error;
        res.json(results);
      }
    );
  });
};

export const post = (req: Request, res: Response) => {
  // Topic -string
  // LWT Topic -number
  // Group -number
  // RoomName -string
  // SetPoint -number
  const { Topic, LWT_Topic, Group, RoomName, SetPoint } = req.body;

  // SetPoint is nullable
  if (!(Topic && LWT_Topic && Group && RoomName)) {
    res.status(400).json("Bad Request");
  }
  const setPointRounded = Math.round(SetPoint * 100) / 100;
  SSHConnection.then((connection) => {
    const query = `UPDATE heating.sensors_config SET ? WHERE id = 1`;
    connection.query(
      query,
      {
        Group,
        Topic,
        RoomName,
        LwtTopic: LWT_Topic,
        SetPoint: setPointRounded,
      },
      (error, results) => {
        if (error) {
          res.status(400).json(error);
        }
        res.json("ok");
      }
    );
  });
};
