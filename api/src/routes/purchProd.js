const server = require("express").Router();
const { Purchased_product } = require("../db.js");

// S38 : Crear Ruta para agregar Item al Carrito
// ATENCIÓN, el trello pedía POST /users/:idUser/cart
server.post("/", (req, res) => {
	Purchased_product.create(req.body)
		.then(() => res.sendStatus(200))
		.catch(err => console.log(err));
});
