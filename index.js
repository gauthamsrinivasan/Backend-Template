const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("./config/db");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");
const OddsAPI = require("./routes/sports/oddsAPI");
const axios = require("axios");
const app = express();


// * Database connection
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("db connected!");
});

const apiKey = "a36e3fddad1432819488901ccfce1523";

// * Cors
app.use(cors());

// * Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("short"));

// * Api routes
app.use("/api", routes);

app.get("/", (req, res) => {
  console.log("hello");
  res.send("hello");
});
app.get("/api/sports/details", async (req, res) => {
  try {
    // const apiKey = "a36e3fddad1432819488901ccfce1523"; // Replace with your API key
    const apiUrl = `https://api.the-odds-api.com/v4/sports/?apiKey=${apiKey}`;

    const response = await axios.get(apiUrl);
    const sportsDetails = response.data;
    res.json(sportsDetails);
  } catch (error) {
    console.error("Error fetching sports details:", error);
    res.status(500).json({ error: "Unable to fetch sports details" });
  }
});

app.get("/api/sports/:sport/odds", async (req, res) => {
  try {
 
    const { sport } = req.params;
    const { regions, markets } = req.query;

    const apiUrl = `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${apiKey}&regions=${regions}&markets=${markets}&oddsFormat=american`;
    console.log(apiUrl);
    const response = await axios.get(apiUrl);
    const oddsData = response.data;
    res.json(oddsData);
  } catch (error) {
    console.error("Error fetching odds data:", error);
    res.status(500).json({ error: "Unable to fetch odds data" });
  }
});



app.use("*", (req, res) => {
  res.send("Route not found");
});

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
