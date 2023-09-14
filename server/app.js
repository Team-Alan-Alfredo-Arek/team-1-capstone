const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const bodyParser = require("body-parser");

module.exports = app;

const setupRoutes = (io) => {
  // logging middleware
  app.use(morgan("dev"));

  // body parsing middleware
  app.use(express.json());

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
          "https://images.unsplash.com",
          "https://fonts.googleapis.com",
        ],

        imgSrc: [
          "'self'",
          "data:",
          "https://www.google-analytics.com",
          "https://images.unsplash.com",
        ],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
      },
    })
  );

  // auth and api routes
  app.use("/auth", require("./auth")(io));
  app.use("/api", require("./api"));

  app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "..", "public/index.html"))
  );

  app.use(bodyParser.json());

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, "..", "public")));

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error("Not found");
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // sends index.html
  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/index.html"));
  });

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });
};
module.exports.setupRoutes = setupRoutes;
