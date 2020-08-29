const server = require("express").Router();
const { User, Purchased_product, Purchase } = require("../../db.js");
server.put("/:id", (req, res, next) => {
	User.update(req.body, { where: { id: parseInt(req.params.id) } })
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
});
// RUTAS DE COMPRAS:
// S39 : Crear Ruta que retorne todos los items del Carrito
//El carrito de un usuario va a ser la última ORDEN abierta que tenga el usuario.
// Cuando el usuario haga el checkout, esa orden se cerrará y se creará una nueva orden vacía que este abierta.
server.get("/:id/purchase/", (req, res, next) => {
	Purchased_product.findAll({
		include: [
			{
				model: Purchase,
				as: "purchase",
				where: {
					idStatus: 1,
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
	})
		.then(purchased_products => res.json(purchased_products))
		.catch(err => next(err));
});
server.get("/me",(req, res, next) =>{
	User.findByPk(req.user.id)
		.then(user => res.json(user))
		.catch(err => next(err));
});
module.exports = server;
