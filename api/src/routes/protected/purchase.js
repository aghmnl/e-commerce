const server = require('express').Router()
const { Purchase, User, Pay_method, Status, Product } = require('../../db.js')
const moment = require('moment')
const { Op, literal } = require('sequelize')
const mailgun = require('mailgun-js')

const { MAILGUN_APIKEY, MAILGUN_DOMAIN, MAILGUN_EMAIL } = process.env

// PROTECTED SON RUTAS DEL USUARIO

// S44 : Crear ruta que retorne todas las órdenes
// Esta ruta puede recibir el query string `status` y deberá devolver sólo las ordenes con ese status.
// http://localhost:3001/purchase_protected/my_purchases
server.get('/my_purchases', (req, res, next) => {
	console.log('this is the id: ', req.user.id)
	Purchase.findAll({
		where: {
			userId: req.user.id,
			statusId: { [Op.not]: 1 },
		},
		attributes: ['id', 'date', 'userId', 'statusId', 'payMethodId'],
		include: [
			{
				model: Product,
				attributes: [
					'id',
					'img',
					'name',
					'categoryId',
					'cellarId',
					'strainId',
					[
						literal('(SELECT (SUM("priceProduct" * "quantity") ) FROM purchased_products WHERE "purchaseId" = "purchase"."id" GROUP BY "purchaseId")'),
						'total',
					],
				],
				through: {
					attributes: ['priceProduct', 'quantity'],
				},
			},
			{
				model: Status,
				as: 'status',
				attributes: ['id', 'name'],
			},
			{
				model: User,
				as: 'user',
			},
			{
				model: Pay_method,
				as: 'pay_method',
			},
		],
	})
		.then((purchases) => {
			res.json(purchases)
		})
		.catch((err) => next(err))
})

// http://localhost:3001/purchase_protected/
server.get('/', (req, res, next) => {
	Purchase.findAll({
		include: [
			{
				model: User,
				as: 'user',
			},
			{
				model: Pay_method,
				as: 'pay_method',
			},
			{
				model: Status,
				as: 'status',
			},
		],
	})
		.then((purchases) => res.json(purchases))
		.catch((err) => next(err))
})

// http://localhost:3001/purchase_protected/status?statusId=1
server.get('/status?:statusId', (req, res, next) => {
	Purchase.findAll({
		include: [
			{
				model: User,
				as: 'user',
			},
			{
				model: Pay_method,
				as: 'pay_method',
			},
			{
				model: Status,
				as: 'status',
			},
		],
		where: { statusId: parseInt(req.query.statusId) },
	})
		.then((purchases) => res.json(purchases))
		.catch((err) => next(err))
})
server.get('/pay_methods', (req, res, next) => {
	Pay_method.findAll()
		.then((pm) => res.json(pm))
		.catch((err) => next(err))
})
// S45 : Crear Ruta que retorne todas las Ordenes de los usuarios
server.get('/users/:userId', (req, res, next) => {
	Purchase.findAll({ where: { userId: parseInt(req.params.userId) } })
		.then((purchases) => res.json(purchases))
		.catch((err) => next(err))
})

//Retorna la orden de un ID

// OTRA OPCIÓN S45 SERÍA:
// server.get("/users/:userId/status?:statusId", (req, res) => {
//     if(req.params.statusId){
//         Purchase.findAll({ where: { statusId: parseInt(req.params.statusId), userId: parseInt(req.params.userId)  }}).then(purchases => res.json(purchases));
//     } else {
//         Purchase.findAll({ where: { userId: parseInt(req.params.userId) }}).then(purchases => res.json(purchases));
//     }
// });
// S46 : Crear Ruta que retorne una orden en particular.
/* server.get("/:id", (req, res, next) => {
	Purchase.findByPk(req.params.id)
		.then(purchase => res.json(purchase))
		.catch(err => next(err));
}); */
// S47 : Crear Ruta para modificar una Orden
// OTRA OPCIÓN SERÍA

// http://localhost:3001/purchase_protected/checkout
server.put('/checkout', (req, res, next) => {
	Purchase.update(
		{
			statusId: 2,
			date: Date.now(),
			address: req.body.dir,
			payMethodId: req.body.pp,
		},
		{
			where: {
				id: req.body.cartId,
				statusId: 1,
			},
		}
	)
		.then(() => {
			/*  */
			Purchase.findByPk(req.body.cartId, {
				include: {
					model: Product,
					attributes: [
						'id',
						'name',
						[
							literal('(SELECT (SUM("priceProduct" * "quantity") ) FROM purchased_products WHERE "purchaseId" = "purchase"."id" GROUP BY "purchaseId")'),
							'total',
						],
					],
					through: {
						attributes: ['priceProduct', 'quantity'],
					},
				},
			})
				.then((purchase) => {
					const DOMAIN = MAILGUN_DOMAIN
					const mg = mailgun({ apiKey: MAILGUN_APIKEY, domain: DOMAIN })
					const data = {
						from: `Toni Wines Estamos despachando su compra <${MAILGUN_EMAIL}>`,
						to: req.user.email,
						subject: 'Toni Wines Compra',
						html: `<html>
							<title>Compra</title>
							<meta charset='utf-8'>
							<body>
								<b> Usted ha comprado  :</b>
								${purchase.products.map((product) => {
									return `
									<br>${product.name}
									~SubTotal: $ ${product.purchased_product.priceProduct} * ${product.purchased_product.quantity}
									<br>`
								})}
								Total: $ ${purchase.products[0]['dataValues']['total']}
								<b>Ver en detalle</b>
								<a href="http://localhost:3000/user/purchases">Mis compras</a>
							</body>
						</html>`,
					}
					mg.messages().send(data, function (error, body) {
						if (error) console.log('error', error)
						console.log('body', body)
						res.status(200).send('Le estaremos notificando, revise su casilla de spam')
					})
				})
				.catch((err) => next(err))
		})
		.catch((err) => next(err))
})

// para cancelar una compra por el usuario
// http://localhost:3001/purchase_protected/cancel
server.put('/cancel', (req, res, next) => {
	Purchase.update(
		{
			statusId: 4,
		},
		{
			where: {
				id: req.body.id,
			},
		}
	)
		.then(() => res.sendStatus(201))
		.catch((err) => next(err))
})

// S40 : Crear Ruta para vaciar el carrito
// ATENCIÓN, el trello pedía DELETE /users/:idUser/cart/
server.delete('/:id/cart', (req, res, next) => {
	//Changed to /cart
	Purchase.destroy({ where: { id: parseInt(req.params.id) } })
		.then(() => res.sendStatus(200))
		.catch((err) => next(err))
})

// Bsca en base de datos el carrito para un usuario determinado (lo saca de req.user)
server.get('/cart_id', (req, res, next) => {
	console.log(req.user.id)
	Purchase.findOrCreate({
		attributes: ['id'],
		where: {
			userId: req.user.id,
			statusId: 1,
		},
		defaults: {
			userId: req.user.id,
			statusId: 1,
			date: Date.now(),
		},
	})
		.then(([cart]) => res.json({ cartId: cart.id }))
		.catch((err) => next(err))
})
server.get('/detail/:id', (req, res, next) => {
	Purchase.findByPk(req.params.id, {
		include: [
			{
				model: User,
				as: 'user',
			},
			{
				model: Pay_method,
				as: 'pay_method',
			},
			{
				model: Status,
				as: 'status',
			},
			{
				model: Product,
			},
		],
	})
		.then((purchase) => {
			res.json({ purchase, total: purchase.getTotal() })
		})
		.catch((err) => next(err))
})
module.exports = server
