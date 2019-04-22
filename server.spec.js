const server = require("./server.js");
const myDataHelpers = require("./data/dataHelpers.js");
const request = require("supertest");

beforeEach(() => {
  return myDataHelpers.truncate();
});

myDataHelpers.truncate();
describe("the server", () => {
  it("it should start testing enviornment", () => {
    const env = process.env.DB_ENV;
    expect(env).toBe("testing");
  });
});

describe("POST /games", function() {
  it("Testing creation of valid new game and successful return of 200", function(done) {
    request(server) //supertest
      .post("/games")
      .send({
        title: "Pacman", // required
        genre: "Arcade", // required
        releaseYear: 1980 // not required
      })
      .set("Accept", "application/json")
      .expect(function(res) {})
      .expect(200, { message: "new game added" }, done);

    request(server) //supertest
      .post("/games")
      .send({
        title: "Pacman2", // required
        genre: "Arcade", // required
        releaseYear: 1980 // not required
      })
      .set("Accept", "application/json")
      .expect(function(res) {})
      .expect(200, { message: "new game added" }, done);
  });

  it("Testing creation of invalid new game and return of 422", function(done) {
    request(server)
      .post("/games")
      .send({
        genre: "Arcade", // required
        releaseYear: 1980 // not required
      }) // x-www-form-urlencoded upload
      .set("Accept", "application/json")
      .expect(function(res) {})
      .expect(422, { message: "Missing fields" }, done);
  });
  it("Testing creation of invalid new game and return of 422", function(done) {
    request(server)
      .post("/games")
      .send({
        releaseYear: 1980 // not required
      }) // x-www-form-urlencoded upload
      .set("Accept", "application/json")
      .expect(function(res) {})
      .expect(422, { message: "Missing fields" }, done);
  });
});

describe("GET /games", function() {
  //now we are doing through http
  it("Because of truncate Test get of games should be empty", function(done) {
    request(server)
      .get("/games") //path
      .expect(function(res) {
        console.log("Games > ", res.body.games);
        if (res.body.games.length != 0) {
          throw new Error("games found...");
        }
      })
      .expect("Content-Type", /json/)
      .expect(200, done);

    request(server)
      .post("/games")
      .send({
        title: "Pacman", // required
        genre: "Arcade", // required
        releaseYear: 1980 // not required
      }) // x-www-form-urlencoded upload
      .set("Accept", "application/json");

    request(server)
      .get("/games")
      .expect(function(res) {
        console.log("Games > ", res.body.games);
        if (res.body.games.length == 0) {
          throw new Error("No games found...");
        }
      })
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
