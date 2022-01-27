const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

const clientRoutes = require("./routes/client");

app.use("/client", clientRoutes);

module.exports = app;
