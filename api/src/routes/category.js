const server = require("express").Router();
const { Category } = require("../db.js");
server.delete("/:id", (req, res, next) => {
	Category.destroy({
		where: { id: req.params.id },
	}).then(a => res.sendstatus(200));
});
