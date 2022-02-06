import mysql from "mysql2";
import { Client, ClientChannel } from "ssh2";
import dotenv from "dotenv";

const sshClient = new Client();
dotenv.config();

const dbServer = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};
const tunnelConfig = {
  host: process.env.DB_SSH_HOST,
  port: process.env.DB_SSH_PORT,
  username: process.env.DB_SSH_USER,
  password: process.env.DB_SSH_PASSWORD,
};

const forwardConfig = {
  srcHost: "127.0.0.1",
  srcPort: 3306,
  dstHost: dbServer.host,
  dstPort: dbServer.port,
};

export const SSHConnection: Promise<mysql.Connection> = new Promise(
  (resolve, reject) => {
    sshClient
      .on("ready", () => {
        sshClient.forwardOut(
          forwardConfig.srcHost,
          forwardConfig.srcPort,
          forwardConfig.dstHost ?? "",
          Number(forwardConfig.dstPort),
          (err, stream) => {
            if (err) reject(err);
            const updatedDbServer = {
              ...dbServer,
              stream,
            };
            const connection = mysql.createConnection(updatedDbServer as any);
            connection.connect((error) => {
              if (error) {
                reject(error);
              }
              resolve(connection);
            });
          }
        );
      })
      .connect(tunnelConfig as any);
  }
);
