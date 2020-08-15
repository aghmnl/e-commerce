const server = require("express").Router();
const { Cellar } = require("../db.js");
server.get("/", (req, res) =>{
	Cellar.findAll().then(cellars => res.json(cellars));
});
server.delete("/:id", (req, res) => {
	Cellar.destroy({
		where: { id: req.params.id },
	}).then(() => res.sendstatus(200));
});
server.post("/", (req, res)=>{
	Cellar.create(req.body)
	.then(()=> res.sendStatus(200))
	.catch(err => res.send(400).end(err));
});
server.put("/:id", (req, res)=>{
	Cellar.update(req.body,{where:parseInt(req.params.id)})
	.then(()=> res.sendStatus(200))
	.catch(err => res.json(err));
});
module.exports = server;