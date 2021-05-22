const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes/index.js')
const passport = require('passport')
const cors = require('cors')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GitHubStrategy = require('passport-github2').Strategy
const crypto = require('crypto')
const { User } = require('./db.js')
const { callbackPromise } = require('nodemailer/lib/shared')
require('./db.js')

const server = express()
server.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
		allowedHeaders: 'Authorization, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
		methods: 'GET, POST, OPTIONS, PUT, DELETE',
	})
)
server.name = 'API'
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK } = process.env
// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async function (email, password, done) {
			try {
				const user = await User.findOne({
					where: { email: email, active: true },
				})
				// console.log({ user })
				if (!user) {
					return done(null, false, {
						message: 'Incorrect username.',
						input: 'email',
					})
				}
				const passwordKey = crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha512').toString('base64')
				if (passwordKey === user.password) {
					return done(null, user)
				} else {
					return done(null, false, {
						message: 'Incorrent password',
						input: 'password',
					})
				}
			} catch (err) {
				return done(err)
			}
		}
	)
)
passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: GOOGLE_CALLBACK,
		},
		(accessToken, refreshToken, profile, done) => {
			// console.log(profile)
			const newUser = {
				first_name: profile.name.givenName,
				last_name: profile.name.familyName,
				email: profile.emails[0].value,
				phone: 00000,
				admin: false,
				password: 'not value',
				salt: 'not salt',
				providerId: profile.id,
				provider: profile.provider,
				imgProfile: profile.photos[0].value,
				active: true,
			}
			User.findOrCreate({
				where: { email: profile.emails[0].value },
				defaults: newUser,
			})
				.then(([user, created]) => {
					if (!created) {
						if (user.providerId !== profile.id) user.provider = profile.provider
						user.providerId = profile.id
						user.imgProfile = profile.photos[0].value
						user.save()
					}
					done(null, user)
				})
				.catch((err) => done(err, false))
		}
	)
)
passport.use(
	new GitHubStrategy(
		{
			clientID: GITHUB_CLIENT_ID,
			clientSecret: GITHUB_CLIENT_SECRET,
			callbackURL: GITHUB_CALLBACK,
			scope: ['user:email'],
		},
		(accessToken, refreshToken, profile, done) => {
			// console.log(profile)
			const newUser = {
				first_name: profile.username,
				last_name: profile.username,
				email: profile.emails[0].value,
				phone: 00000,
				admin: false,
				password: 'not value',
				salt: 'not salt',
				providerId: profile.id,
				provider: profile.provider,
				imgProfile: profile.photos[0].value,
				active: true,
			}
			User.findOrCreate({
				where: { email: profile.emails[0].value },
				defaults: newUser,
			})
				.then(([user, created]) => {
					if (!created) {
						if (user.providerId !== profile.id) user.provider = profile.provider
						user.providerId = profile.id
						user.imgProfile = profile.photos[0].value
						user.save()
					}
					done(null, user)
				})
				.catch((err) => done(err, false))
		}
	)
)
passport.serializeUser(function (user, done) {
	done(null, user.id)
})

passport.deserializeUser(function (id, done) {
	User.findByPk(id)
		.then((user) => {
			done(null, user)
		})
		.catch((err) => done(err))
})

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
server.use(bodyParser.json({ limit: '50mb' }))
server.use(cookieParser())
server.use(morgan('dev'))
server.use(
	require('express-session')({
		secret: 'secret',
		resave: false,
		saveUninitialized: false,
	})
)
server.use(passport.initialize())
server.use(passport.session())

server.use('/', routes)
// Error catching endware.
server.use((err, req, res, next) => {
	// eslint-disable-line no-unused-vars
	const status = err.status || 500
	let message = ''
	let errTable = ''
	if (!!err.original && err.original.table === 'products') errTable = 'Productos'
	if (!!err.original && err.original.table === 'strains') errTable = 'Cepas'
	if (!!err.original && err.original.code === '23503') message = `No se puede eliminar este dato, se necesita en ${errTable || err.original.table}`
	console.log(err)
	res.status(status).send(message || err.message)
})

module.exports = server
