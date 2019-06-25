let express = require("express");
let cors = require("express-cors");
// let path = require('path');
let cookieParser = require("cookie-parser");
let app = express();
let router = express.Router();

let api = require("./api");
let Model = require("./model");
let services = require("./services");
let routes = require("./routes");

api = api({});
const model = new Model(api);
const servicesLayer = services(model);
routes(servicesLayer, router);

app.use(
  cors({
    allowedOrigins: ["http://localhost:*"]
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: false, limit: "500mb" }));

app.use("/api/v1", router);

module.exports = app;
