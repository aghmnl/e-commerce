const server = require("express").Router();
const { Purchase, User, Pay_method, Status } = require("../../db.js");
const moment = require("moment");

// S44 : Crear ruta que retorne todas las órdenes
// Esta ruta puede recibir el query string `status` y deberá devolver sólo las ordenes con ese status.
// http://localhost:3001/purchase_private/
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

// http://localhost:3001/purchase_private/status?statusId=1
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

module.exports = server;
