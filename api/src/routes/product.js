const server = require("express").Router();

const { Product } = require("../db.js");
// Este get devuelve todos los productos para generar el catálogo
server.get("/", (req, res) => {
	Product.findAll({
		where: { active: true },
	}).then(products => {
		res.json(products);
	});
});

// http://localhost:3000/products/category/1
server.get("/category/:categoryId", (req, res) => {
	Product.findAll({
		where: {
			categoryId: req.params.categoryId,
		},
	}).then(products => res.json(products));
});

// https://docs.google.com/document/d/11CLInK9TfZQkm1EzBkoUISLJiEV-aC9-di0agLrPWTM/edit?usp=sharing

//   http://localhost:3000/datos?nombre=Agus&apellido=Minetto
// app.get('/datos/', function(req, res) {
// 	nombre = req.query.nombre;
// 	res.json( req.query );
// 	});

// http://localhost:3000/products/search?query=agus
server.get("/search/", (req, res) => {
	const value = "%" + req.query.query + "%";
	Product.findAll({
		$or: [
			{
				name: {
					$like: { value },
				},
			},
			{
				description: {
					$like: { value },
				},
			},
		],
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
