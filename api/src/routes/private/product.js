const server = require("express").Router();
const { Product } = require("../../db.js");
server.post("/", (req, res, next) => {
	// delete req.body["nombreBoton"];
	Product.create(req.body)
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
});
server.put("/:id", (req, res, next) => {
	// delete req.body["nombreBoton"];
	Product.update(req.body, { where: { id: parseInt(req.params.id) } })
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
});
server.delete("/:id", (req, res, next) => {
	Product.destroy({ where: { id: parseInt(req.params.id) } })
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
});
module.exports = server;