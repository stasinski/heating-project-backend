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

export const put = (req: Request, res: Response) => {
  const { Topic, LWT_Topic, Group, ID } = req.body;
  if (!(Topic && LWT_Topic && Group && ID)) {
    return res.status(400).json("Bad Request");
  }
  SSHConnection.then((connection) => {
    const query = `UPDATE heating.relays SET ? WHERE id = ${ID}`;
    connection.query(
      query,
      {
        Group: Group,
        "LWT Topic": LWT_Topic,
        Topic: Topic,
      },
      (error) => {
        if (error) {
          console.log(error);
          res.json(error);
        }
        res.json("ok");
      }
    );
  });
};
