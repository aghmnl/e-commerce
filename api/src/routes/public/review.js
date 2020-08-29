const server = require("express").Router();
const { Review } = require("../../db.js");
module.exports = server;

// S54: Crear ruta para crear/agregar Review
// ATENCIÓN, el trello pedía POST /product/:id/review
server.post("/", (req, res, next) => {
	Review.create(req.body)
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
});

// S55: Crear ruta para modificar review
// ATENCIÓN, el trello pedía PUT /product/:id/review/:idReview
server.put("/:id", (req, res, next) => {
	Review.update(req.body, { where: { id: parseInt(req.params.id) } })
		.then(() => res.sendStatus(201))
		.catch(err => next(err));
});

// S56 : Crear ruta para eliminar review
// ATENCIÓN, el trello pedía DELETE /product/:id/review/:idReview
server.delete("/:id", (req, res, next) => {
	Review.destroy({
		where: { id: parseInt(req.params.id) },
	})
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
});
