import { SSHConnection } from "../db/db";
import { Request, Response } from "express";

export const get = (_: Request, res: Response) => {
  SSHConnection.then((connection) => {
    connection.query("SELECT * FROM heating.relays", (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });
};

export const post = (req: Request, res: Response) => {
  const { Topic, LWT_Topic, Group } = req.body;
  if (!(Topic && LWT_Topic && Group)) {
    res.status(400).json("Bad Request");
  }
  SSHConnection.then((connection) => {
    const query = `INSERT INTO heating.relays SET ?`;
    connection.query(
      query,
      { ID: Math.random(), Group: Group, "LWT Topic": LWT_Topic, Topic: Topic },
      (error) => {
        if (error) {
          res.status(400).json(error);
        }
        res.json("ok");
      }
    );
  });
};
