const server = require('express').Router()
const { Purchased_product, Product, Purchase } = require('../../db.js')
const { literal } = require('sequelize')
// "http://localhost:3001/purchased_products_protected/add_product"
server.post('/add_product', (req, res, next) => {
	const addProducts = req.body.cart_items.map((cart_item) => {
		return Purchased_product.findOrCreate({
			where: {
				purchaseId: req.body.cartId,
				productId: cart_item.id,
			},
			defaults: {
				purchaseId: req.body.cartId,
				quantity: cart_item.quantity,
				priceProduct: cart_item.price,
				productId: cart_item.id,
			},
		}).then(([purchased_product, created]) => {
			if (!created) {
				purchased_product.quantity += cart_item.quantity
				return purchased_product.save()
			}
		})
	})
	Promise.all(addProducts)
		.then(() => res.sendStatus(201))
		.catch((err) => next(err))
})

// Para incrementar en uno el producto dentro del carrito en la DB
// "http://localhost:3001/purchased_products_protected/increase_product"
server.post('/increase_product', (req, res, next) => {
	Purchased_product.findOne({
		where: {
			purchaseId: req.body.cartId,
			productId: req.body.id,
		},
	})
		.then((purchased_product) => {
			purchased_product.quantity += 1
			purchased_product.save()
			res.json(purchased_product)
		})
		.catch((err) => next(err))
})
server.delete('/empty_cart/:cartId', (req, res, next) => {
	Purchased_product.destroy({
		where: {
			purchaseId: req.params.cartId,
		},
	})
		.then((purchased_product) => {
			res.json(purchased_product)
		})
		.catch((err) => next(err))
})
// Para decrementar en uno el producto dentro del carrito en la DB
// "http://localhost:3001/purchased_products_protected/decrease_product"
server.post('/decrease_product', (req, res, next) => {
	Purchased_product.findOne({
		where: {
			purchaseId: req.body.cartId,
			productId: req.body.id,
		},
	})
		.then((purchased_product) => {
			purchased_product.quantity -= 1
			purchased_product.save()
			res.json(purchased_product)
		})
		.catch((err) => next(err))
})
server.put('/delete_product', (req, res, next) => {
	Purchased_product.destroy({
		where: {
			purchaseId: req.body.cartId,
			productId: req.body.productId,
		},
	}).then((purchased_product) => {
		res.json(purchased_product)
	})
})
server.get('/cart_items/:cartId', (req, res, next) => {
	!!req.params.cartId &&
		Purchase.findOne({
			attributes: ['id'],
			where: {
				id: req.params.cartId,
				statusId: 1,
			},
			include: {
				model: Product,
				attributes: ['id', 'name', 'stock', 'img', 'price'],
				through: {
					attributes: ['priceProduct', 'quantity'],
				},
			},
		})
			.then((purchase) => {
				const cart_items = []
				purchase.products.forEach((product) => {
					cart_items.push({
						id: product.id,
						name: product.name,
						stock: product.stock,
						img: product.img,
						price: product.purchased_product.priceProduct,
						quantity: product.purchased_product.quantity,
					})
				})
				res.json({ cart_items, total: purchase.getTotal() })
			})
			.catch((err) => next(err))
})

//Obtenemos los items de una compra

server.get('/purchase/:ID', (req, res, next) => {
	Purchase.findOne({
		where: {
			id: req.params.ID,
		},
		include: {
			model: Product,
			attributes: ['id', 'name', 'stock', 'img'],
			through: {
				attributes: ['priceProduct', 'quantity'],
			},
		},
	}).then(({ products }) => {
		const purchase_items = []
		products.forEach((product) => {
			purchase_items.push({
				id: product.id,
				name: product.name,
				stock: product.stock,
				img: product.img,
				price: product.purchased_product.priceProduct,
				quantity: product.purchased_product.quantity,
			})
		})
		res.json(purchase_items)
	})
})

// S38 : Crear Ruta para agregar Item al Carrito
// ATENCIÓN, el trello pedía POST /users/:idUser/cart
/* server.post("/", (req, res, next) => {
	Purchased_product.create(req.body)
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
}); */

// S41 : Crear Ruta para editar las cantidades del carrito
// ATENCIÓN, el trello pedía PUT /users/:idUser/cart
// VER ABAJO QUE DICE POST Y DEBIERA DECIR PUT
server.put('/:id', (req, res, next) => {
	Purchased_product.update(req.body, {
		where: { id: parseInt(req.params.id) },
	})
		.then(() => res.sendStatus(200))
		.catch((err) => next(err))
})
module.exports = server
