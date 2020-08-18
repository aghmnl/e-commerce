const server = require("express").Router();
const { User, Purchased_product, Purchase } = require("../db.js");

server.get("/", (req, res) => {
	User.findAll().then(users => res.json(users));
});

server.get("/:id", (req, res) => {
	User.findAll({ where: { id: req.params.id } }).then(users => res.json(users));
});

server.delete("/:id", (req, res) => {
	User.destroy({
		where: { id: parseInt(req.params.id) },
	}).then(a => res.sendStatus(200));
});

server.post("/", (req, res) => {
	console.log(req.body);
	User.create(req.body).then(() => res.sendStatus(200));
});

server.put("/:id", (req, res) => {
	delete req.body["nombreBoton"];
	User.update(req.body, { where: { id: parseInt(req.params.id) } })
		.then(() => res.sendStatus(200))
		.catch(err => res.json(err));
});

// RUTAS DE COMPRAS:
// S39 : Crear Ruta que retorne todos los items del Carrito
//El carrito de un usuario va a ser la última ORDEN abierta que tenga el usuario.
// Cuando el usuario haga el checkout, esa orden se cerrará y se creará una nueva orden vacía que este abierta.
server.get("/:id/purchase/", (req, res) => {
	Purchased_product.findAll({
		include: [
			{
				model: Purchase,
				as: "purchase",
				where: {
					idStatus: 0,
				},
			},
			{
				model: User,
				as: "user",
				where: {
					id: parseInt(req.params.id),
				},
			},
		],
	}).then(purchased_products => res.json(purchased_products));
});

module.exports = server;
