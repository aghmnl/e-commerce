const server = require("express").Router();
const { Strain } = require("../db.js");
server.get("/", (req, res, next) => {
	Strain.findAll()
		.then(strains => res.json(strains))
		.catch(err => next(err));
});
server.get("/one/:id", (req, res, next) => {
	Strain.findOne({ where: { id: parseInt(req.params.id) } })
		.then(strain => res.json(strain))
		.catch(err => next(err));
});
server.get("/category/:categoryId", (req, res, next) => {
	Strain.findAll({
		where: { categoryId: parseInt(req.params.categoryId) },
	})
		.then(strains => res.json(strains))
		.catch(err => next(err));
});
server.delete("/:id", (req, res, next) => {
	Strain.destroy({
		where: { id: parseInt(req.params.id) },
	})
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
});
server.post("/", (req, res, next) => {
	// delete req.body["nombreBoton"];
	Strain.create(req.body)
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
});
server.put("/:id", (req, res, next) => {
	// delete req.body["nombreBoton"];
	Strain.update(req.body, { where: { id: parseInt(req.params.id) } })
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
});

module.exports = server;
