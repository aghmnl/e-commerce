const server = require("express").Router();
const { Category } = require("../db.js");
server.get("/", (req, res) => {
	Category.findAll().then(categories => res.json(categories));
});
server.delete("/:id", (req, res) => {
	Category.destroy({
		where: { id: parseInt(req.params.id) },
	}).then(() => res.sendstatus(200));
});
server.post("/", (req, res) => {
	delete req.body["nombreBoton"];
	Category.create(req.body)
		.then(() => res.sendStatus(200))
		.catch(err => res.send(400).end(err));
});
server.put("/:id", (req, res) => {
	delete req.body["nombreBoton"];
	Category.update(req.body, { where: { id: parseInt(req.params.id) } })
		.then(() => res.sendStatus(200))
		.catch(err => res.json(err));
});
module.exports = server;
