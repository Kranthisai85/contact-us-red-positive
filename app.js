const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {contactUs} = require("./app.controller.js");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static('./static/'));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post('/contactUs',contactUs);

const PORT = process.env.PORT || 8080;
app.listen(PORT, 'localhost',() => {
  console.log(`Server is running on port ${PORT}.`);
});
