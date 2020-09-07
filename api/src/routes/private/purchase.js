const server = require("express").Router();
const { Purchase, User, Pay_method, Status, Product } = require("../../db.js");
const { Op } = require("sequelize");
const moment = require("moment");
const mailgun = require("mailgun-js");
// PRIVATE SON RUTAS DEL ADMIN

// S44 : Crear ruta que retorne todas las órdenes
// Esta ruta puede recibir el query string `status` y deberá devolver sólo las ordenes con ese status.
// http://localhost:3001/purchase_private/
server.get("/", (req, res, next) => {
	Purchase.findAll({
		where: {
			userId: { [Op.not]: req.user.id },
		},
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
			{
				model: Product,
			},
		],
	})
		.then(purchases => res.json(purchases))
		.catch(err => next(err));
});

// http://localhost:3001/purchase_private/status?statusId=1
server.get("/status?:statusId", (req, res, next) => {
	Purchase.findAll({
		where: {
			userId: { [Op.not]: req.user.id },
		},
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
			{
				model: Product,
			},
		],
		where: { statusId: parseInt(req.query.statusId) },
	})
		.then(purchases => res.json(purchases))
		.catch(err => next(err));
});
server.get("/detail/:id", (req, res, next) => {
	Purchase.findByPk(req.params.id, {
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
			{
				model: Product,
			},
		],
	})
		.then(purchase => {
			res.json({ purchase, total: purchase.getTotal() });
		})
		.catch(err => next(err));
});
server.put("/dispatch", (req, res, next) => {
	Purchase.update(
		{
			statusId: 6,
		},
		{
			where: {
				id: req.body.id,
			},
		}
	)
		.then(() => {
			const DOMAIN = "sandboxdffeb621bd62410eb7c2076e0be9741d.mailgun.org";
			const mg = mailgun({ apiKey: "21104ae61a01274914c25259682fe3d1-7cd1ac2b-37cc0e69", domain: DOMAIN });
			const data = {
				from: "Toni Wines Compra <toniwines_recovery@sandboxe98883ab8de24b92a0e573e260891894.mailgun.org>",
				to: req.body.userEmail,
				subject: "Toni Wines Compra",
				html: `<html>
					<title>Recovery</title>
					<meta charset='utf-8'>
					<body>
						<b>Su compra será entregada en ${req.body.address}</b>
					</body>
				</html>`,
			};
			mg.messages().send(data, function (error, body) {
				if (error) console.log("error", error);
				console.log("body", body);
				res.sendStatus(201);
			});
		})
		.catch(err => next(err));
});

server.put("/reject", (req, res, next) => {
	Purchase.update(
		{
			statusId: 5,
		},
		{
			where: {
				id: req.body.id,
			},
		}
	)
		.then(() => {
			const DOMAIN = "sandboxdffeb621bd62410eb7c2076e0be9741d.mailgun.org";
			const mg = mailgun({ apiKey: "21104ae61a01274914c25259682fe3d1-7cd1ac2b-37cc0e69", domain: DOMAIN });
			const data = {
				from: "Toni Wines Compra <toniwines_recovery@sandboxe98883ab8de24b92a0e573e260891894.mailgun.org>",
				to: req.body.userEmail,
				subject: "Toni Wines Compra",
				html: `<html>
					<title>Rechazada</title>
					<meta charset='utf-8'>
					<body>
						<b>Su compra fue rechazada</b>
					</body>
				</html>`,
			};
			mg.messages().send(data, function (error, body) {
				if (error) console.log("error", error);
				console.log("body", body);
				res.sendStatus(201);
			});
		})
		.catch(err => next(err));
});
server.put("/delivered", (req, res, next) => {
	Purchase.update(
		{
			statusId: 3,
		},
		{
			where: {
				id: req.body.id,
			},
		}
	)
		.then(() => res.sendStatus(201))
		.catch(err => next(err));
});
module.exports = server;
