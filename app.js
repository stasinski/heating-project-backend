const cors = require("cors");
const express = require("express");
const routes = require("./routes/routes");

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

const http = require("http").createServer(app);

http.listen(port, () => console.log(`app running on ${port}`));

app.use(routes);
