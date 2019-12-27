const data = require("../data/all-titles.json");

exports.getAllTitles = (req, res) => {
  try {
    res.status(200).send(data);
  } catch (e) {
    console.log("ERROR -- /getAllTitles --", e);
    res.status(500).send({ message: "Internal server error" });
  }
};
