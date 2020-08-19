const server = require("express").Router();
const { Purchase } = require("../db.js");

// S44 : Crear ruta que retorne todas las órdenes
// Esta ruta puede recibir el query string `status` y deberá devolver sólo las ordenes con ese status.
server.get("/status?:statusId", (req, res) => {
	if (req.params.statusId) {
		Purchase.findAll({ where: { statusId: parseInt(req.params.statusId) } }).then(purchases =>
			res.json(purchases)
		);
	} else {
		Purchase.findAll().then(purchases => res.json(purchases));
	}
});

// S45 : Crear Ruta que retorne todas las Ordenes de los usuarios
server.get("/users/:userId", (req, res) => {
	Purchase.findAll({ where: { userId: parseInt(req.params.userId) } }).then(purchases =>
		res.json(purchases)
	);
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
server.get("/:id", (req, res) => {
	Purchase.findByPk(req.params.id).then(purchase => res.json(purchase));
});

// S47 : Crear Ruta para modificar una Orden
server.put("/:id", function (req, res, next) {
	Purchase.findByPk(req.params.id).then(function (purchase) {
		user.update(req.body);
		res.status(201);
		res.send(purchase);
	});
});

// OTRA OPCIÓN SERÍA
// server.put("/:id", (req, res) => {
// 	Purchase.update(req.body, { where: { id: parseInt(req.params.id) } })
// 		.then(() => res.sendStatus(200))
// 		.catch(err => res.json(err));
// });

// S40 : Crear Ruta para vaciar el carrito
// ATENCIÓN, el trello pedía DELETE /users/:idUser/cart/
server.delete("/:id/cart", (req, res) => {
	//Changed to /cart
	Purchase.destroy({ where: { id: parseInt(req.params.id) } })
		.then(() => res.sendStatus(200))
		.catch(err => res.json(err));
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
