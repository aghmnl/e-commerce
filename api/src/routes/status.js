const server = require("express").Router();
const { Status } = require("../db.js");
server.get("/", (req, res) => {
	Status.findAll().then(statuses => res.json(statuses));
});
server.delete("/:id", (req, res) => {
	Status.destroy({
		where: { id: parseInt(req.params.id) },
	}).then(() => res.sendStatus(200));
});
server.post("/", (req, res) => {
	Status.create(req.body)
		.then(() => res.sendStatus(200))
		.catch(err => res.send(400).end(err));
});
server.put("/:id", (req, res) => {
	Status.update(req.body, { where: { id: parseInt(req.params.id) } })
		.then(() => res.sendStatus(200))
		.catch(err => res.json(err));
});
module.exports = server;
