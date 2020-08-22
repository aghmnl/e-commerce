const server = require("express").Router();
const Sequelize = require("sequelize");
const { Product, Cellar, Strain, Category } = require("../db.js");
const Op = Sequelize.Op;
// Este get devuelve todos los productos para generar el catálogo
server.get("/", (req, res) => {
	Product.findAll({
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
				as: "category"
			},
		],
	}).then(products => {
		res.json(products);
	}).catch(err => console.log(err));
});
server.get("/catalogue?:pag", (req, res) => {
	const pag =  !parseInt(req.query.pag)?0:parseInt(req.query.pag);
	const pagsize = 4;
	const offset = pagsize * (pagsize - (pagsize - pag))
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
				as: "category"
			},
		],
		limit : pagsize,
		offset
	}).then(products => {
		res.json(products);
	}).catch(err => console.log(err));
});
server.get("/detail/:id", (req, res) => {
	Product.findOne({
		where:{
			active:true,
			id:parseInt(req.params.id)
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
	}).then(products => {
		res.json(products);
	}).catch(err => console.log(err));
})
// http://localhost:3000/products/category/1
server.get("/category/:categoryId", (req, res) => {
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
				as: "category"
			},
		],
		where: {
			categoryId: parseInt(req.params.categoryId),
		},
	}).then(products => res.json(products))
	.catch(err => console.log(err));
});

// http://localhost:3000/products/search?query=agus
server.get("/search?:query", (req, res) => {
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
					'$category.name$': {
						[Op.iLike]: value,
					}
				},
				{
					'$strain.name$': {
						[Op.iLike]: value,
					}
				},
				{
					'$cellar.name$': {
						[Op.iLike]: value,
					}
				}
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
		.catch(err => res.json(err));
});
server.post("/", (req, res) => {
	/*const values = Object.values(req.body);
	if(!values.length) return res.send("NOT DATA");
	for(let value of values){
		if(!value) return res.json({"error_en":value});
	}*/
	delete req.body["nombreBoton"];
	Product.create(req.body)
		.then(() => res.sendStatus(200))
		.catch(err => console.log(err));
});
server.put("/:id", (req, res) => {
	delete req.body["nombreBoton"];
	Product.update(req.body, { where: { id: parseInt(req.params.id) } })
		.then(() => res.sendStatus(200))
		.catch(err => res.json(err));
});
server.delete("/:id", (req, res) => {
	Product.destroy({ where: { id: parseInt(req.params.id) } })
		.then(() => res.sendStatus(200))
		.catch(err => res.json(err));
});

module.exports = server;
