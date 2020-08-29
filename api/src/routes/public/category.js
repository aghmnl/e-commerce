const server = require("express").Router();
const { Category } = require("../../db.js");
server.get("/", (req, res, next) => {
	Category.findAll()
		.then(categories => res.json(categories))
		.catch(err => next(err));
});

module.exports = server;