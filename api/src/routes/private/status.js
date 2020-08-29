const server = require("express").Router();
const { Status } = require("../../db.js");


// http://localhost:3001/status
server.get("/", (req, res, next) => {
	Status.findAll()
		.then(statuses => res.json(statuses))
		.catch(err => next(err));
});

server.delete("/:id", (req, res, next) => {
	Status.destroy({
		where: { id: parseInt(req.params.id) },
	})
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
});
server.post("/", (req, res, next) => {
	Status.create(req.body)
		.then(() => res.sendStatus(200))
		.catch(err => {
			res.send(400).end(err);
			next(err);
		});
});
server.put("/:id", (req, res, next) => {
	Status.update(req.body, { where: { id: parseInt(req.params.id) } })
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
});
module.exports = server;
