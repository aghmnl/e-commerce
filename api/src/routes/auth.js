const server = require("express").Router();
const passport = require("passport");
const crypto = require("crypto");
const { User } = require("../db.js");
const { literal } = require("sequelize");
//checks if password has > 8 chars
async function isAdmin(req, res, next) {
	const { admin } = await User.findByPk(req.user.id, {
		attributes: ["admin"],
	});
	if (admin) return next();
	return res.status(403).send("No esta autorizado, por favor reinicie su sessión");
}
function isAuthenticated(req, res, next) {
	// isAuthenticated devuelve true cuando está autenticado
	if (req.isAuthenticated()) return next();
	return res.status(401).send("No esta autorizado, por favor reinicie su sessión");
}
function isValidPassword(password) {
	if (password.length >= 8) {
		return true;
	}
	return false;
}

//uses a regex to check if email is valid
function isValidEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

//handles register POST
server.post("/register", async function (req, res, next) {
	const salt = crypto.randomBytes(64).toString("hex");
	const password = crypto.pbkdf2Sync(req.body.password, salt, 10000, 64, "sha512").toString("base64");

	if (!isValidPassword(req.body.password)) {
		return res
			.status(500)
			.json({ status: "error", message: "Password must be 8 or more characters.", input: "password" });
	}
	if (!isValidEmail(req.body.email)) {
		return res.status(500).json({ status: "error", message: "Email address not formed correctly.", input: "email" });
	}

	try {
		const user = await User.create({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			phone: req.body.phone,
			admin: false,
			password: password,
			salt: salt,
		});
		if (user) {
			passport.authenticate("local", function (err, user, info) {
				if (err) {
					return next(err);
				}
				if (!user) {
					return res.json({ status: "error", message: info.message });
				}
				req.login(user, function (err) {
					if (err) {
						return next(err);
					}
					return res.json({ status: "ok", user: req.user });
				});
			})(req, res, next);
		}
	} catch (err) {
		console.log({ err });
		return res.status(500).json({ status: "error", message: "Error, el email ya existe.", input: "email", err });
	}
});

server.post("/login", function (req, res, next) {
	passport.authenticate("local", function (err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(401).json({ status: "error", message: info.message, input: info.input });
		}
		req.login(user, function (err) {
			if (err) {
				return next(err);
			}
			return res.json({ status: "ok", user, isAuth: req.isAuthenticated() });
		});
	})(req, res, next);
});

server.get("/logout", function (req, res, next) {
	// Acá le cambia el valor a isAuthenticated
	req.logout();
	res.json({ status: "ok" });
});

// Ruta que responde true si está autenticado
server.get("/isauth", function (req, res, next) {
	// isAuthenticated es función dentro del objeto request
	return res.json({ isAuth: req.isAuthenticated() });
});

// convierta en admin al usuario
server.get("/isadmin", async (req, res, next) => {
	// Me fijo si existe user, porque de no estar logueado no existiría
	if (!req.user) return res.json(false);
	const { admin } = await User.findByPk(req.user.id, {
		attributes: ["admin"],
	});
	res.json(admin);
});
// S67 : Crear ruta /promote
// POST /auth/promote/:id
// Promote convierte al usuario con ID: id a Admin.
// ATENCIÓN, LO IMPLEMENTAMOS COMO PUT YA QUE TENEMOS CAMPO BOOLEAN DE ADMIN
// Y lo que hay que cambiar es el valor del campo admin a true
server.put("/promote/:id", isAuthenticated, isAdmin, (req, res, next) => {
	User.update({ admin: literal("NOT admin") }, { where: { id: parseInt(req.params.id) } })
		.then(() => res.sendStatus(201))
		.catch(err => next(err));
});

module.exports = { server, isAuthenticated, isAdmin };
