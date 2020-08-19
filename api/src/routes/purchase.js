const server = require("express").Router();
const { Purchase } = require("../db.js");

// S40 : Crear Ruta para vaciar el carrito
// ATENCIÓN, el trello pedía DELETE /users/:idUser/cart/
server.delete("/:id", (req, res) => {
	Purchase.destroy({ where: { id: parseInt(req.params.id) } })
		.then(() => res.sendStatus(200))
		.catch(err => res.json(err));
});

module.exports = server;
