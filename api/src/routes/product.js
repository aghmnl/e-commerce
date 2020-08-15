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
server.post("/",(req, res)=>{
	/*const values = Object.values(req.body);
	if(!values.length) return res.send("NOT DATA");
	for(let value of values){
		if(!value) return res.json({"error_en":value});
	}*/
	delete req.body["nombreBoton"];
	Product.create(req.body)
	.then(() => res.sendStatus(200))
	.catch(err => res.json(err));
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
