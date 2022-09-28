const express = require("express");
const app = express();
const port = process.env.PORT || 3029;
const bodyParser = require("body-parser");
const cors = require("cors");
var morgan = require("morgan");
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Routes Handling

var swaggerDefinition = {
  info: {
    title: "Impactional Coin Swap",
    version: "2.0.0",
    description: "IG-coins",
  },
  host: `localhost:${port}`,
  // host: `172.16.21.92:${port}`,
  // host: `50.112.212.20:${port}`,
  basePath: "/",
};

var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ["./route/ImpactionalCoinRoute.js"],
};

var swaggerSpec = swaggerJSDoc(options);

app.get("/swagger.json", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// initialize swagger-jsdoc
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use('/bnb', require('./route/binanceRoute')); //importing route
// app.use('/eth', require('./route/ethRoute')); //importing route
app.use("/ImpactionalCoinSwap", require("./route/ImpactionalCoinRoute")); //importing route

// routes(app); //register the route
app.use(function (req, res) {
  res.status(404).send({ resource: req.originalUrl + " not found" });
});
app.listen(port);
console.log("RESTful API server started on: " + port);
