require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { LVS_1 } = process.env;

const { getAllTitles } = require("./controllers/getAllTitles");
const { getAllFilms } = require("./controllers/getAllFilms");

const app = express();
app.use(express.json({ type: "*/*" }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/videos/lvs_1", express.static(__dirname + LVS_1));
app.use("/images", express.static(__dirname + "/images"));
app.use(express.static(path.join(__dirname, "../front-end/build")));

app.get("/api/getAllTitles", getAllTitles);
app.get("/api/getAllFilms", getAllFilms);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../front-end/build/index.html"));
});

const port = 4000;
app.listen(port, function() {
  console.log("************************************");
  console.log("***HTTP Listening on port %s...***", port);
  console.log("************************************");
});
