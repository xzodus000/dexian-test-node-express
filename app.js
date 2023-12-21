const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const cors = require("cors");
// Import the "develop" router
const developRouter = require("./router/developRouter");

// Middleware to parse JSON in the request body

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

// Use the "develop" router for routes starting with '/develop'
app.use("/develop", developRouter);

// Define a route for the homepage
app.get("/", (req, res) => {
  res.send("Welcome to the homepage!");
});

// Define a route for the about page
app.get("/about", (req, res) => {
  res.send("This is the about page.");
});

// Define a generic error handler for undefined routes
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
