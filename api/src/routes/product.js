const server = require("express").Router();
const { Product } = require("../db.js");

// Este get devuelve todos los productos para generar el catálogo
server.get("/", (req, res, next) => {
	Product.findAll({
		where: { active: true },
	})
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

// ruta de obtener todos los productos :: server/api/products/

// ------------------
// path="/catalogue" ---> Catalogue.jsx ->>> fetch a server/api/productos __> [] --> Catalogue --> ProductCard
//  -----------------

module.exports = server;
