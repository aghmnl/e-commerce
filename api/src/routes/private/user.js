const server = require("express").Router();
const { User } = require("../../db.js");
const { Op } = require("sequelize");
server.get("/", (req, res, next) => {
	User.findAll({
		attributes : ["id","first_name","last_name","email","admin","phone"],
		where:{ 
			id: {[Op.not]: req.user.id},
			active: true
		}
	})
		.then(users => res.json(users))
		.catch(err => next(err));
});
// Para borrar un usuario
// http://localhost:3001/user_private/1
server.delete("/:id", (req, res, next) => {
	User.update({ active: false },{
		where: { id: parseInt(req.params.id) },
	})
		.then(() => res.sendStatus(200))
		.catch(err => next(err));
});

module.exports = server;
