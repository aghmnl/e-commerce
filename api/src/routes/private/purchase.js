const server = require("express").Router();
const {Purchase, User, Pay_method, Status, Product} = require("../../db.js");
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
            {
                model:Product,
            }
            
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
            {
                model: Product
            }
		],
		where: { statusId: parseInt(req.query.statusId) },
	})
		.then(purchases => res.json(purchases))
        .catch(err => next(err));
});
module.exports = server;