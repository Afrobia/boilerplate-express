let express = require("express");
let app = express("");
require("dotenv").config();
console.log("Hello World");

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/view/index.html");
});

app.use("/public", express.static(__dirname + "/public"));

/*app.get("/json",(request,response) => {
  response.json (message);
});*/

app.get("/json", (req, res) => {
  const message = process.env.MESSAGE_STYLE;
  if (message == 'uppercase') {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

module.exports = app;
