const server = require("express").Router();
const { User } = require("../db.js");

server.get("/",(req, res)=>{
	User.findAll()
	.then((users) => res.json(users));
});

server.get("/:id",(req, res)=>{
	User.findAll({where:{id:req.params.id}})
	.then((users) => res.json(users));
});

server.delete("/:id", (req, res, next) => {
	User.destroy({
		where: { id: parseInt(req.params.id) }
	}).then(a => res.sendStatus(200));
});

server.post("/", (req, res)=>{
	console.log(req.body);
	User.create(req.body)
	.then(()=> res.sendStatus(200));
});

server.put("/:id", (req, res) => {
	delete req.body["nombreBoton"];
	User.update(req.body, { where: { id: parseInt(req.params.id) } })
		.then(() => res.sendStatus(200))
		.catch(err => res.json(err));
});
module.exports = server;
