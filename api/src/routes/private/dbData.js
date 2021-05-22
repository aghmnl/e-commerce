const server = require('express').Router()
const { Product, Purchase } = require('../../db.js')

// Deleting all the products from the database
// server.delete('/allProducts', (req, res, next) => {
// 	console.log('Destrucción de todos los productos solicitada')
// 	Product.destroy({
// 		where: {},
// 	})
// 		.then(() => {
// 			console.log('Productos eliminados de la base de datos')
// 			res.sendStatus(200)
// 		})
// 		.catch((err) => next(err))
// })

server.delete('/allPurchases', (req, res, next) => {
	console.log('Destrucción de todas las compras solicitada')
	Purchase.destroy({
		where: {},
	})
		.then(() => {
			console.log('Compras eliminadas de la base de datos')
			res.sendStatus(200)
		})
		.catch((err) => next(err))
})
module.exports = server
