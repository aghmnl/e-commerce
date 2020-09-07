const server = require("express").Router();
const passport = require("passport");
const crypto = require("crypto");
const { User } = require("../db.js");
const { literal } = require("sequelize");
const mailgun = require("mailgun-js");
const nodemailer = require("nodemailer");
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
		/* const user = await User.create({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			phone: req.body.phone,
			admin: false,
			active: true,
			password: password,
			salt: salt,
		});
		 */
		const [user, created] = await User.findOrCreate({
			where: {email: req.body.email},
			defaults:{
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email,
				phone: req.body.phone,
				admin: false,
				active: true,
				password: password,
				salt: salt,
			}
		});
		if(!created){
			user.first_name= req.body.first_name,
			user.last_name = req.body.last_name,
			user.password = password;
			user.salt = salt;
			user.phone = req.body.phone;
			user.provider = null;
			user.providerId = null;
			user.imgProfile = null;
			await user.save();
		}
		/* if (user) {
			passport.authenticate("local", function (err, user, info) {
				if (err) {
					return next(err);
				}
				if (!user) {
					return res.status(401).json({ status: "error", message: info.message });
				}
				req.login(user, function (err) {
					if (err) {
						return next(err);
					}
					return res.json({ status: "ok", user: req.user, isAuth: req.isAuthenticated() });
				});
			})(req, res, next);
		} */
		passport.authenticate("local", function (err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.status(401).json({ status: "error", message: info.message });
			}
			req.login(user, function (err) {
				if (err) {
					return next(err);
				}
				return res.json({ status: "ok", user: req.user, isAuth: req.isAuthenticated() });
			});
		})(req, res, next);
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
server.get(
	"/google/login",
	passport.authenticate("google", {
		scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"],
	})
);
server.get("/github/login", passport.authenticate("github", { scope: ["user:email"] }));
server.get("/google/cb", passport.authenticate("google"), (req, res) => {
	res.redirect("http://localhost:3000/external_login");
});
server.get("/github/cb", passport.authenticate("github"), (req, res) => {
	res.redirect("http://localhost:3000/external_login");
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
server.post("/recovery", async (req, res, next) => {
	const user = await User.findOne({ where: { email: req.body.email, provider: null, providerId:null } });
	if (!user)
		return res.status(404).json({ input: "email", message: "No tenemos registrado ningún usuario con ese email" });
	const newSalt = crypto.randomBytes(64).toString("hex");
	const tempPass = crypto.randomBytes(8).toString("hex");
	const tempPassHash = crypto.pbkdf2Sync(tempPass, newSalt, 10000, 64, "sha512").toString("base64");
	user.salt = newSalt;
	user.password = tempPassHash;
	await user.save();
	const DOMAIN = "sandboxdffeb621bd62410eb7c2076e0be9741d.mailgun.org";
	const mg = mailgun({ apiKey: "21104ae61a01274914c25259682fe3d1-7cd1ac2b-37cc0e69", domain: DOMAIN });
	const data = {
		from: "Toni Wines Recovery <toniwines_recovery@sandboxe98883ab8de24b92a0e573e260891894.mailgun.org>",
		to: user.email,
		subject: "Recovery",
		html: `<html>
			<title>Recovery</title>
			<meta charset='utf-8'>
			<body>
				<p><b> Su contraseña es:</b></p>
				<p>${tempPass}</p>
				<p><i>Ingrese al <a href="http://localhost:3000/login">sitio ToniWines</a> para cambiarla por una nueva contraseña</i></p>
			</body>
		</html>`,
	};
	mg.messages().send(data, function (error, body) {
		if (error) console.log("error", error);
		console.log("body", body);
		console.log(crypto.randomBytes(8).toString("ascii"));
		res.status(200).send("Enviamos un email con su nueva contraseña, revise su casilla de spam");
	});
});
module.exports = { server, isAuthenticated, isAdmin };
