import cors from "cors";
import express from "express";
import { createServer } from "http";
import routes from "./routes/routes";

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

const http = createServer(app);

http.listen(port, () => console.log(`app running on ${port}`));

app.use(routes);
