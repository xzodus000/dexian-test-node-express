const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const cors = require("cors");

const developRouter = require("./router/developRouter");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/develop", developRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});

app.get("/about", (req, res) => {
  res.send("This is the about page.");
});

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
