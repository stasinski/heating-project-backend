const SSHConnection = require("./db");

SSHConnection.then((connection) => {
  connection.query("SELECT * FROM heating.config", (error, results) => {
    if (error) throw error;
    console.log(results);
  });
});
