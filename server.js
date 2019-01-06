const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

Score = require("./models/score");

mongoose.connect(
  "mongodb+srv://akhj1986:newroute@cluster0-tewwf.mongodb.net/SpaceGame",
  { useNewUrlParser: true }
);

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/api/scores", (req, res) => {
  Score.getScores((err, scores) => {
    if (err) {
      throw err;
    }
    res.json(scores);
  });
});

app.post("/api/scores", (req, res) => {
  const score = req.body;
  Score.addScore(score, (err, score) => {
    if (err) {
      throw err;
    }
    res.json(score);
  });
});

app.listen(5000);

console.log("App running on port 5000");
