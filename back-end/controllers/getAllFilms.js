const fs = require("fs");

exports.getAllFilms = (req, res) => {
  try {
    const film = req.query.film;
    const data = fs.readFileSync(`${process.cwd()}/data/${film}/films.json`, "UTF-8",);

    return res.status(200).send(data);
  } catch (e) {
    console.log("ERROR -- /getAllFilms --", e);
    if(e.code === 'ENOENT'){
      return res.status(404).send({"message": "Title not found."})
    }
    return res.status(500).send({ message: "Internal server error" });
  }
};
