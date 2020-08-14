const server = require("express").Router();
const { Category } = require("../db.js");
server.get("/",(req, res)=>{
	Category.findAll()
	.then((categories) => res.json(categories));
});
server.get("/:id",(req, res)=>{
	Category.findAll({where:{id:req.params.id}})
	.then((categories) => res.json(categories));
});
server.delete("/:id", (req, res, next) => {
	Category.destroy({
		where: { id: req.params.id },
	}).then(a => res.sendstatus(200));
});
server.post("/", (req, res)=>{
	console.log(req.body);
	Category.create(req.body)
	.then(()=> res.sendStatus(200));
});
module.exports = server;
