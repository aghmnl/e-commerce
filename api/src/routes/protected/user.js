const server = require("express").Router();
const { User, Purchased_product, Purchase } = require("../../db.js");
const crypto = require("crypto");
// RUTAS DE COMPRAS:
// S39 : Crear Ruta que retorne todos los items del Carrito
//El carrito de un usuario va a ser la última ORDEN abierta que tenga el usuario.
// Cuando el usuario haga el checkout, esa orden se cerrará y se creará una nueva orden vacía que este abierta.
server.get("/:id/purchase/", (req, res, next) => {
	Purchased_product.findAll({
		include: [
			{
				model: Purchase,
				as: "purchase",
				where: {
					idStatus: 1,
				},
			},
			{
				model: User,
				as: "user",
				where: {
					id: parseInt(req.params.id),
				},
			},
		],
	})
		.then(purchased_products => res.json(purchased_products))
		.catch(err => next(err));
});
server.get("/me",(req, res, next) =>{
	User.findByPk(req.user.id)
		.then(user => res.json(user))
		.catch(err => next(err));
});
server.put("/change_password",(req, res, next) =>{
	User.findByPk(req.user.id)
		.then(user => {
			const passwordKey = crypto.pbkdf2Sync(req.body.password, user.salt, 10000, 64, 'sha512').toString('base64');
			if(user.password !== passwordKey) return res.status(401).json({ input:"password", message:"Contraseña incorrecta" });
			if(user.password === passwordKey){
				const newSalt = crypto.randomBytes(64).toString("hex");
				const newPassword = crypto.pbkdf2Sync(req.body.new_password, newSalt, 10000, 64, "sha512").toString("base64");
				user.salt = newSalt;
				user.password = newPassword;
				user.save()
					.then(() => {
						req.logout();
						res.sendStatus(201);
					})
					.catch(err => next(err));
			}
		})
		.catch(err => next(err));
});
server.put("/change_email",(req, res, next) => {
	User.update({ email: req.body.email }, { where:{ id:req.user.id } })
		.then(user => res.status(201).json(user))
		.catch(err => next(err));
})
module.exports = server;
