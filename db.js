const mysql = require("mysql2");
const { Client } = require("ssh2");
const sshClient = new Client();
const dbServer = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "heating",
  database: "heating",
};
const tunnelConfig = {
  host: "192.168.0.111",
  port: 22,
  user: "pi",
  password: "9He@ting6",
};
const forwardConfig = {
  srcHost: "127.0.0.1",
  srcPort: 3306,
  dstHost: dbServer.host,
  dstPort: dbServer.port,
};
const SSHConnection = new Promise((resolve, reject) => {
  sshClient
    .on("ready", () => {
      sshClient.forwardOut(
        forwardConfig.srcHost,
        forwardConfig.srcPort,
        forwardConfig.dstHost,
        forwardConfig.dstPort,
        (err, stream) => {
          if (err) reject(err);
          const updatedDbServer = {
            ...dbServer,
            stream,
          };
          const connection = mysql.createConnection(updatedDbServer);
          connection.connect((error) => {
            if (error) {
              reject(error);
            }
            resolve(connection);
          });
        }
      );
    })
    .connect(tunnelConfig);
});

module.exports = SSHConnection;
