const express = require("express");
const request = require("supertest");
const myDataHelpers = require("./data/dataHelpers.js");

const server = express();

server.use(express.json());
server.get("/", async (req, res) => {
  res.status(200).json({ api: "up" });
});

server.post("/games", async (req, res) => {
  try {
    const newGame = req.body;
    if (!newGame.title || !newGame.genre) {
      res.status(422).json({ message: "Missing fields" });
      return;
    }


    console.log("New game ", newGame);
    const game = await myDataHelpers.insert(newGame);

    console.log("Added game :  ", game);

    if (game.id > 0) {
      res.status(200).json({ message: "new game added" });
    } else {
      res.status(400).json({ message: "can't find the id" });
    }
  } catch (error) {
    res.status(500).json(error, "we can't add the record");
  }
});

server.get("/games", async (req, res) => {
  try {
    const games = await myDataHelpers.find();

    console.log("GET Games : ", games);

    //console.log("Games", games);
    res.status(200).json({ games: games });
  } catch (error) {
    res.status(500).json({ message: "Can't get games data" });
  }
});
STRETCH: module.exports = server;
