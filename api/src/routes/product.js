const server = require("express").Router();

const { Product, Category } = require("../db.js");
// Este get devuelve todos los productos para generar el catálogo
server.get("/", (req, res) => {
	Product.findAll({
		where: { active: true },
	})
	.then(products => {
		res.json(products);
	});
});
server.get("/:categoryId", (req, res) =>{
	Product.findAll({
		where:{
			categoryId : req.params.categoryId
		}
	}).then(products => res.json(products));
});

// https://gist.github.com/zcaceres/83b554ee08726a734088d90d455bc566


// Albums.findAll({
// 	include: [{
// 	  model: Artists,
// 	  as: 'Singer',
// 	  where: { name: 'Al Green' } //
// 	}]
//   })
//   .then(albums => console.log(albums))
//   .catch(console.error)

// ruta de obtener todos los productos :: server/api/products/

// ------------------
// path="/catalogue" ---> Catalogue.jsx ->>> fetch a server/api/productos __> [] --> Catalogue --> ProductCard
//  -----------------

module.exports = server;
