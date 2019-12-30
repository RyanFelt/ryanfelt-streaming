const express = require("express");
const cors = require("cors");

const { getAllTitles } = require("./controllers/getAllTitles");
const { getAllFilms } = require("./controllers/getAllFilms");

const app = express();
app.use(express.json({ type: "*/*" }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/images", express.static(__dirname + "/images"));

app.get("/get", getAllTitles);
app.get("/api/getAllTitles", getAllTitles);
app.get("/api/getAllFilms", getAllFilms);

const port = 4000;
app.listen(port, function() {
  console.log("************************************");
  console.log("***HTTP Listening on port %s...***", port);
  console.log("************************************");
});
