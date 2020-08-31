const server = require("express").Router();
const { User } = require("../../db.js");
const {Op} = require("sequelize");
server.get("/", (req, res, next) => {
	User.findAll({
		attributes : ["id","first_name","last_name","email","admin","phone"],
		where:{ id: {[Op.not]: req.user.id} }
	})
		.then(users => res.json(users))
		.catch(err => next(err));
});

server.get("/:id", (req, res, next) => {
	User.findOne({
		attributtes : ["id","first_name","last_name","email","admin","phone"],
		where: { id: req.params.id } 
	})
		.then(users => res.json(users))
		.catch(err => next(err));
});
module.exports = server;