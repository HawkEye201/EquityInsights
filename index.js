const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

require("./database");

require("./initialSetup");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Connected");
});

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

const routes = require("./routes");
app.use("/", routes);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
