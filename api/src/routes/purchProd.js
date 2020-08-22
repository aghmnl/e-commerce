const server = require("express").Router();
const { Purchased_product } = require("../db.js");

// S38 : Crear Ruta para agregar Item al Carrito
// ATENCIÓN, el trello pedía POST /users/:idUser/cart
server.post("/", (req, res, next) => {
	Purchased_product.create(req.body)
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
});

// S41 : Crear Ruta para editar las cantidades del carrito
// ATENCIÓN, el trello pedía PUT /users/:idUser/cart
server.post("/:id", (req, res,next) => {
	Purchased_product.update(req.body, { where: { id: parseInt(req.params.id) } })
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
});

module.exports = server;
