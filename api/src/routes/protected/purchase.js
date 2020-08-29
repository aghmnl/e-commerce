const server = require("express").Router();
const { Purchase, User, Pay_method, Status } = require("../../db.js");


// S44 : Crear ruta que retorne todas las órdenes
// Esta ruta puede recibir el query string `status` y deberá devolver sólo las ordenes con ese status.
// http://localhost:3001/purchase/
server.get("/", (req, res, next) => {
	Purchase.findAll({
		include: [
			{
				model: User,
				as: "user",
			},
			{
				model: Pay_method,
				as: "pay_method",
			},
			{
				model: Status,
				as: "status",
			},
		],
	})
		.then(purchases => res.json(purchases))
		.catch(err => next(err));
});

// http://localhost:3001/purchase/status?statusId=1
server.get("/status?:statusId", (req, res, next) => {
	Purchase.findAll({
		include: [
			{
				model: User,
				as: "user",
			},
			{
				model: Pay_method,
				as: "pay_method",
			},
			{
				model: Status,
				as: "status",
			},
		],
		where: { statusId: parseInt(req.query.statusId) },
	})
		.then(purchases => res.json(purchases))
		.catch(err => next(err));
});

// S45 : Crear Ruta que retorne todas las Ordenes de los usuarios
server.get("/users/:userId", (req, res, next) => {
	Purchase.findAll({ where: { userId: parseInt(req.params.userId) } })
		.then(purchases => res.json(purchases))
		.catch(err => next(err));
});

// OTRA OPCIÓN S45 SERÍA:
// server.get("/users/:userId/status?:statusId", (req, res) => {
//     if(req.params.statusId){
//         Purchase.findAll({ where: { statusId: parseInt(req.params.statusId), userId: parseInt(req.params.userId)  }}).then(purchases => res.json(purchases));
//     } else {
//         Purchase.findAll({ where: { userId: parseInt(req.params.userId) }}).then(purchases => res.json(purchases));
//     }
// });
// S46 : Crear Ruta que retorne una orden en particular.
server.get("/:id", (req, res, next) => {
	Purchase.findByPk(req.params.id)
		.then(purchase => res.json(purchase))
		.catch(err => next(err));
});
// S47 : Crear Ruta para modificar una Orden
// OTRA OPCIÓN SERÍA
server.put("/:id", (req, res) => {
	Purchase.update(req.body, { where: { id: parseInt(req.params.id) } })
		.then(() => res.sendStatus(200))
		.catch(err => res.json(err));
});
// S40 : Crear Ruta para vaciar el carrito
// ATENCIÓN, el trello pedía DELETE /users/:idUser/cart/
server.delete("/:id/cart", (req, res, next) => {
	//Changed to /cart
	Purchase.destroy({ where: { id: parseInt(req.params.id) } })
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
});

/*
server.get("/", (req, res) => {
    Purchase.findAll({
    }).then(purchases => {
        res.json(purchases);
    });
});
*/
module.exports = server;
