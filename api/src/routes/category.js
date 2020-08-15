const server = require("express").Router();
const { Category } = require("../db.js");
server.get("/", (req, res) =>{
	Category.findAll().then(categories => res.json(categories));
});
server.delete("/:id", (req, res) => {
	Category.destroy({
		where: { id: req.params.id },
	}).then(a => res.sendstatus(200));
});
module.exports = server;
