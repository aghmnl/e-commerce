const server = require("express").Router();
const { Strain } = require("../db.js");
server.get("/", (req, res) =>{
	Strain.findAll().then(strains => res.json(strains));
});
server.delete("/:id", (req, res) => {
	Strain.destroy({
		where: { id:parseInt(req.params.id)},
	}).then(() => res.sendstatus(200));
});
server.post("/", (req, res)=>{
	Strain.create(req.body)
	.then(()=> res.sendStatus(200))
	.catch(err => res.send(400).end(err));
});
server.put("/:id", (req, res)=>{
	Strain.update(req.body,{where:parseInt(req.params.id)})
	.then(()=> res.sendStatus(200))
	.catch(err => res.json(err));
});
module.exports = server;