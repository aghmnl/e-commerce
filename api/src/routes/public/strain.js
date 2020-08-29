const server = require("express").Router();
const { Strain, Category } = require("../../db.js");
server.get("/", (req, res, next) => {
	Strain.findAll({
		include: [
			{
				model: Category,
				as: "category",
			},
		],
	})
		.then(strains => res.json(strains))
		.catch(err => next(err));
});

server.get("/category/:categoryId", (req, res, next) => {
	Strain.findAll({
		where: { categoryId: parseInt(req.params.categoryId) },
	})
		.then(strains => res.json(strains))
		.catch(err => next(err));
});
module.exports = server;
