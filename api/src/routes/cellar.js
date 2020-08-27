const server = require("express").Router();
const { Cellar } = require("../db.js");


server.get("/", (req, res, next) => {
	Cellar.findAll()
		.then(cellars => res.json(cellars))
		.catch(err => next(err));
});
server.get("/one/:id", (req, res, next) => {
	Cellar.findOne({ where: { id: parseInt(req.params.id) } })
		.then(cellar => res.json(cellar))
		.catch(err => next(err));
});
server.delete("/:id", (req, res, next) => {
	Cellar.destroy({
		where: { id: parseInt(req.params.id) },
	})
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
});
server.post("/", (req, res, next) => {
	Cellar.create(req.body)
		.then(() => res.sendStatus(200))
		.catch(err => {
			res.send(400).end(err);
			next(err);
		});
});
server.put("/:id", (req, res, next) => {
	Cellar.update(req.body, { where: { id: parseInt(req.params.id) } })
		.then(() => res.sendStatus(201))
		.catch(err => next(err));
});
module.exports = server;