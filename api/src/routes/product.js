const server = require("express").Router();
const Sequelize = require("sequelize");
const { Product, Cellar, Strain, Category, Review, User } = require("../db.js");
const Op = Sequelize.Op;


// Este get devuelve todos los productos para generar el catálogo
server.get("/", (req, res, next) => {
	Product.findAll({
		attributes : {exclude : ["createdAt","updatedAt"]},
		where: { active: true },
		include: [
			{
				model: Cellar,
				as: "cellar",
				attributes : {exclude : ["createdAt","updatedAt"]},
			},
			{
				model: Strain,
				as: "strain",
				attributes : {exclude : ["createdAt","updatedAt"]},
			},
			{
				model: Category,
				as: "category",
				attributes : {exclude : ["createdAt","updatedAt"]},
			},
		],
	})
		.then(products => {
			res.json(products);
		})
		.catch(err => next(err));
});
server.get("/catalogue?:pag", (req, res, next) => {
	const pag = !parseInt(req.query.pag) ? 0 : parseInt(req.query.pag);
	const pagsize = 12;
	const offset = pagsize * (pagsize - (pagsize - pag));
	console.log(offset);
	Product.findAndCountAll({
		where: { active: true },
		include: [
			{
				model: Cellar,
				as: "cellar",
			},
			{
				model: Strain,
				as: "strain",
			},
			{
				model: Category,
				as: "category",
			},
		],
		order: [["id", "ASC"]],
		limit: pagsize,
		offset,
	})
		.then(products => {
			res.json(products);
		})
		.catch(err => next(err));
});
server.get("/detail/:id", (req, res, next) => {
	Product.findOne({
		where: {
			active: true,
			id: parseInt(req.params.id),
		},
		include: [
			{
				model: Cellar,
				as: "cellar",
			},
			{
				model: Strain,
				as: "strain",
			},
			{
				model: Category,
				as: "category",
			},
			{
				model: User,
				
			},
		],
	})
		.then(products => {
			res.json(products);
		})
		.catch(err => next(err));
});
// http://localhost:3001/products/category/1
server.get("/category/:categoryId", (req, res, next) => {
	Product.findAll({
		include: [
			{
				model: Cellar,
				as: "cellar",
			},
			{
				model: Strain,
				as: "strain",
			},
			{
				model: Category,
				as: "category",
			},
		],
		where: {
			categoryId: parseInt(req.params.categoryId),
		},
	})
		.then(products => res.json(products))
		.catch(err => next(err));
});

// http://localhost:3001/products/search?query=agus
server.get("/search?:query", (req, res, next) => {
	const value = "%" + req.query.query + "%";
	console.log(value);
	Product.findAll({
		where: {
			[Op.or]: [
				{
					name: {
						[Op.iLike]: value,
					},
				},
				{
					description: {
						[Op.iLike]: value,
					},
				},
				{
					"$category.name$": {
						[Op.iLike]: value,
					},
				},
				{
					"$strain.name$": {
						[Op.iLike]: value,
					},
				},
				{
					"$cellar.name$": {
						[Op.iLike]: value,
					},
				},
			],
		},
		include: [
			{
				model: Cellar,
				as: "cellar",
			},
			{
				model: Strain,
				as: "strain",
			},
			{
				model: Category,
				as: "category",
			},
		],
	})
		.then(products => res.json(products))
		.catch(err => next(err));
});

server.post("/", (req, res, next) => {
	// delete req.body["nombreBoton"];
	Product.create(req.body)
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
});
server.put("/:id", (req, res, next) => {
	// delete req.body["nombreBoton"];
	Product.update(req.body, { where: { id: parseInt(req.params.id) } })
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
});
server.delete("/:id", (req, res, next) => {
	Product.destroy({ where: { id: parseInt(req.params.id) } })
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
});
module.exports = server;