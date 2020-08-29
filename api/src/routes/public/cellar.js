const server = require("express").Router();
const { Cellar } = require("../../db.js");
server.get("/", (req, res, next) => {
	Cellar.findAll()
		.then(cellars => res.json(cellars))
		.catch(err => next(err));
});
;
module.exports = server;