const bodyParser = require("body-parser");
const express = require("express");
const app = express("");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log("Hello World");

/* app.get("/", (req, res) => {
  res.send("Hello Express");
}); */

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/view/index.html");
});

app.use("/public", express.static(__dirname + "/public"));

/*app.get("/json",(request,response) => {
  response.json (message);
});*/

app.get("/json", (req, res) => {
  const message = process.env.MESSAGE_STYLE;
  if (message == "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});
//Chain Middleware to Create a Time Server

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

/** Chaining middleware. A Time server */
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({ time: req.time });
  }
);

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({ echo: word });
});

app
  .route("/name")
  .get((req, res) => {
    var first = req.query.first;
    var last = req.query.last;
    const jsonObj = { name: `${first} ${last}` };
    res.send(jsonObj);
  })
  .post((req, res) => {
    res.json({ name: `${req.body.first} ${req.body.last}` });
  });

module.exports = app;
