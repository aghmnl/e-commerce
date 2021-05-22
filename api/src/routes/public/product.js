const server = require('express').Router()
const { Op, literal } = require('sequelize')
const { Product, Cellar, Strain, Category, Review, User } = require('../../db.js')

// Este get devuelve todos los productos para generar el catálogo
server.get('/', (req, res, next) => {
	Product.findAll({
		attributes: [
			'id',
			'name',
			'img',
			'cellarId',
			'price',
			'description',
			'categoryId',
			'strainId',
			'active',
			'stock',
			[literal('(SELECT (SUM("stars") / COUNT(*)) FROM reviews WHERE "productId" = "product"."id" GROUP BY "productId" )'), 'raiting'],
		],
		where: { active: true },
		include: [
			{
				model: Cellar,
				as: 'cellar',
				attributes: { exclude: ['createdAt', 'updatedAt'] },
			},
			{
				model: Strain,
				as: 'strain',
				attributes: { exclude: ['createdAt', 'updatedAt'] },
			},
			{
				model: Category,
				as: 'category',
				attributes: { exclude: ['createdAt', 'updatedAt'] },
			},
		],
		//order: [["raiting","DESC"]]
	})
		.then((products) => {
			res.json(products)
		})
		.catch((err) => next(err))
})
server.get('/catalogue?:pag', (req, res, next) => {
	const pag = !parseInt(req.query.pag) ? 0 : parseInt(req.query.pag)
	const pagsize = 12
	const offset = pagsize * (pagsize - (pagsize - pag))
	// console.log(offset);
	Product.findAndCountAll({
		attributes: [
			'id',
			'name',
			'img',
			'cellarId',
			'price',
			'description',
			'categoryId',
			'strainId',
			'active',
			'stock',
			[literal('(SELECT (SUM("stars") / COUNT(*)) FROM reviews WHERE "productId" = "product"."id" GROUP BY "productId" )'), 'raiting'],
		],
		where: { active: true },
		include: [
			{
				model: Cellar,
				as: 'cellar',
			},
			{
				model: Strain,
				as: 'strain',
			},
			{
				model: Category,
				as: 'category',
			},
		],
		order: [['id', 'ASC']],
		limit: pagsize,
		offset,
	})
		.then((products) => {
			res.json(products)
		})
		.catch((err) => next(err))
})
server.get('/detail/:id', (req, res, next) => {
	Product.findOne({
		attributes: [
			'id',
			'name',
			'img',
			'cellarId',
			'price',
			'description',
			'categoryId',
			'strainId',
			'active',
			'stock',
			[literal('(SELECT (SUM("stars") / COUNT(*)) FROM reviews WHERE "productId" = "product"."id" GROUP BY "productId" )'), 'raiting'],
			[literal('(SELECT  COUNT("stars") FROM reviews WHERE "productId" = "product"."id" AND "stars" = 1 GROUP BY "productId" )'), '1star'],
			[literal('(SELECT  COUNT("stars") FROM reviews WHERE "productId" = "product"."id" AND "stars" = 2 GROUP BY "productId" )'), '2star'],
			[literal('(SELECT  COUNT("stars") FROM reviews WHERE "productId" = "product"."id" AND "stars" = 3 GROUP BY "productId" )'), '3star'],
			[literal('(SELECT  COUNT("stars") FROM reviews WHERE "productId" = "product"."id" AND "stars" = 4 GROUP BY "productId" )'), '4star'],
			[literal('(SELECT  COUNT("stars") FROM reviews WHERE "productId" = "product"."id" AND "stars" = 5 GROUP BY "productId" )'), '5star'],
		],
		where: {
			active: true,
			id: parseInt(req.params.id),
		},
		include: [
			{
				model: Cellar,
				as: 'cellar',
			},
			{
				model: Strain,
				as: 'strain',
			},
			{
				model: Category,
				as: 'category',
			},
			{
				model: User,
				attributes: ['email'],
				through: {
					attributes: ['date', 'stars', 'description'],
				},
			},
		],
	})
		.then((products) => {
			res.json(products)
		})
		.catch((err) => next(err))
})
server.post('/strains', (req, res, next) => {
	Product.findAll({
		attributes: [
			'id',
			'name',
			'img',
			'cellarId',
			'price',
			'description',
			'categoryId',
			'strainId',
			'active',
			'stock',
			[literal('(SELECT (SUM("stars") / COUNT(*)) FROM reviews WHERE "productId" = "product"."id" GROUP BY "productId" )'), 'raiting'],
		],
		include: [
			{
				model: Cellar,
				as: 'cellar',
			},
			{
				model: Strain,
				as: 'strain',
			},
			{
				model: Category,
				as: 'category',
			},
		],
		where: {
			strainId: {
				[Op.in]: req.body.strains,
			},
			categoryId: req.body.categoryId,
		},
	})
		.then((products) => res.json(products))
		.catch((err) => next(err))
})
// http://localhost:3001/products/category/1
server.get('/category/:categoryId', (req, res, next) => {
	Product.findAll({
		attributes: [
			'id',
			'name',
			'img',
			'cellarId',
			'price',
			'description',
			'categoryId',
			'strainId',
			'active',
			'stock',
			[literal('(SELECT (SUM("stars") / COUNT(*)) FROM reviews WHERE "productId" = "product"."id" GROUP BY "productId" )'), 'raiting'],
		],
		include: [
			{
				model: Cellar,
				as: 'cellar',
			},
			{
				model: Strain,
				as: 'strain',
			},
			{
				model: Category,
				as: 'category',
			},
		],
		where: {
			categoryId: parseInt(req.params.categoryId),
		},
	})
		.then((products) => res.json(products))
		.catch((err) => next(err))
})

// http://localhost:3001/products/search?query=agus
server.get('/search?:query', (req, res, next) => {
	const value = '%' + req.query.query + '%'
	// console.log(value)
	Product.findAll({
		attributes: [
			'id',
			'name',
			'img',
			'cellarId',
			'price',
			'description',
			'categoryId',
			'strainId',
			'active',
			'stock',
			[literal('(SELECT (SUM("stars") / COUNT(*)) FROM reviews WHERE "productId" = "product"."id" GROUP BY "productId" )'), 'raiting'],
		],
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
					},
				},
				{
					'$strain.name$': {
						[Op.iLike]: value,
					},
				},
				{
					'$cellar.name$': {
						[Op.iLike]: value,
					},
				},
			],
		},
		include: [
			{
				model: Cellar,
				as: 'cellar',
			},
			{
				model: Strain,
				as: 'strain',
			},
			{
				model: Category,
				as: 'category',
			},
		],
	})
		.then((products) => res.json(products))
		.catch((err) => next(err))
})
module.exports = server
