const SSHConnection = require("../db");

// get
exports.getRelays = (_, res) => {
  SSHConnection.then((connection) => {
    connection.query("SELECT * FROM heating.relays", (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });
};

exports.getConfig = (_, res) => {
  SSHConnection.then((connection) => {
    connection.query("SELECT * FROM heating.config", (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });
};

exports.getSensorsConfig = (_, res) => {
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

// post

exports.postRelays = (req, res) => {
  const { Topic, LWT_Topic, Group } = req.body;
  console.log(req.body);
  if (!(Topic && LWT_Topic && Group)) {
    res.status(400).json("Bad Request");
  }
  SSHConnection.then((connection) => {
    const query = `INSERT INTO heating.relays SET ?`;
    connection.query(
      query,
      { ID: Math.random(), Group: Group, "LWT Topic": LWT_Topic, Topic: Topic },
      (error, results) => {
        if (error) {
          res.status(400).json(error);
        }
        res.json("ok");
      }
    );
  });
};

exports.postConfig = (req, res) => {
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
      (error, results) => {
        if (error) {
          res.status(400).json(error);
        }
        res.json("ok");
      }
    );
  });
};

exports.postSensorsConfig = (req, res) => {
  // Topic -string
  // LWT Topic -string
  // Group -string
  // RoomName -string

  const { Topic, LWT_Topic, Group, RoomName } = req.body;
  if (!(Topic && LWT_Topic && Group && RoomName)) {
    res.status(400).json("Bad Request");
  }
  SSHConnection.then((connection) => {
    const query = `UPDATE heating.sensors_config SET ? WHERE id = 1`;
    connection.query(
      query,
      { Group, Topic, RoomName, LwtTopic: LWT_Topic },
      (error, results) => {
        if (error) {
          res.status(400).json(error);
        }
        res.json("ok");
      }
    );
  });
};
