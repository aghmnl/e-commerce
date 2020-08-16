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
	.catch(err => console.log(err));
});
server.put("/:id",(req, res)=>{
	delete req.body["nombreBoton"];
	Product.update(req.body,{where:{id:parseInt(req.params.id)}})
	.then(() => res.sendStatus(200))
	.catch(err => res.json(err));
});
server.delete("/:id", (req, res) => {
	Product.destroy({where:{id:parseInt(req.params.id)}})
	.then(() => res.sendStatus(200))
	.catch(err => res.json(err));
})
// ------------------
// path="/catalogue" ---> Catalogue.jsx ->>> fetch a server/api/productos __> [] --> Catalogue --> ProductCard
//  -----------------

module.exports = server;
