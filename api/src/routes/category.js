const server = require("express").Router();
const { Category } = require("../db.js");
server.get("/", (req, res, next) => {
	Category.findAll().then(categories => res.json(categories))
		.catch(err => next(err));
});
server.get("/one/:id", (req, res, next) => {
	Category.findOne({where : parseInt(req.params.id)})
		.then(category => res.json(category))
		.catch(err => next(err));
});
server.delete("/:id", (req, res) => {
	Category.destroy({
		where: { id: parseInt(req.params.id) },
	}).then(() => res.sendStatus(200))
		.catch(err => next(err));
});
server.post("/", (req, res, next) => {
	delete req.body["nombreBoton"];
	Category.create(req.body)
		.then(() => res.sendStatus(200))
		.catch(err => {res.send(400); next(err);});
});
server.put("/:id", (req, res,next) => {
	delete req.body["nombreBoton"];
	Category.update(req.body, { where: { id: parseInt(req.params.id) } })
		.then(() => res.sendStatus(200))
		.catch(err =>next(err));
});
module.exports = server;
