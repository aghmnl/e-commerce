// const server = require("express").Router();
const {
	Cellar,
	Product,
	Category,
	Strain,
	Purchased_product,
	User,
	Pay_method,
	Purchase,
	Review,
	Status,
} = require('./src/db')
const crypto = require('crypto')
// const servidor = require("./src/app.js");
/* const salt = crypto.randomBytes(64).toString("hex");
	const password = crypto.pbkdf2Sync(req.body.password, salt, 10000, 64, "sha512").toString("base64"); */
const createPromise = (model, value) =>
	new Promise((resolve, reject) => {
		model
			.create(value)
			.then((instance) => {
				resolve(instance)
			})
			.catch((err) => reject(err))
	})
// Syncing all the models at once.
const createRegs = async () => {
	const categoriesPromise = categories.map((c) => createPromise(Category, c))
	await Promise.all(categoriesPromise)
	const cellarsPromise = cellars.map((c) => createPromise(Cellar, c))
	await Promise.all(cellarsPromise)
	const strainsPromise = strains.map((c) => createPromise(Strain, c))
	await Promise.all(strainsPromise)
	const productPromise = products.map((c) => createPromise(Product, c))
	await Promise.all(productPromise)
	const usersPromise = users.map((c) => {
		c.salt = crypto.randomBytes(64).toString('hex')
		c.password = crypto
			.pbkdf2Sync(c.password, c.salt, 10000, 64, 'sha512')
			.toString('base64')
		createPromise(User, c)
	})
	await Promise.all(usersPromise)
	const pay_methodPromise = pay_methods.map((c) =>
		createPromise(Pay_method, c)
	)
	await Promise.all(pay_methodPromise)
	const reviewsPromise = reviews.map((c) => createPromise(Review, c))
	await Promise.all(reviewsPromise).catch((err) => console.log(err))
	const statusPromise = status.map((c) => createPromise(Status, c))
	await Promise.all(statusPromise)
	const purchasesPromise = purchases.map((c) => createPromise(Purchase, c))
	await Promise.all(purchasesPromise)
	const purchased_productsPromise = purchased_products.map((c) =>
		createPromise(Purchased_product, c)
	)
	await Promise.all(purchased_productsPromise)
	console.log('Base de datos cargando. Espere por favor...')
}
var purchases = [
	{
		// purchaseId:1,
		date: '2020-08-19',
		userId: 1,
		payMethodId: 1,
		statusId: 1,
	},

	{
		// purchaseId:2,
		date: '2020-08-19',
		userId: 2,
		payMethodId: 1,
		statusId: 1,
	},
	{
		// purchaseId:3,
		date: '2020-08-19',
		userId: 3,
		payMethodId: 1,
		statusId: 2,
		address: 'Av. Cabildo 2400',
	},

	{
		// purchaseId:4,
		date: '2020-08-19',
		userId: 1,
		payMethodId: 1,
		statusId: 3,
		address: 'Antártida Argentina 201',
	},
	{
		// purchaseId:5,
		date: '2020-08-19',
		userId: 2,
		payMethodId: 1,
		statusId: 4,
		address: 'República Argentina 82',
	},

	{
		// purchaseId:6,
		date: '2020-08-19',
		userId: 3,
		payMethodId: 1,
		statusId: 5,
		address: 'Alt. Brown 1196',
	},
]

var categories = [
	{
		name: 'Tinto',
	},
	{
		name: 'Blanco',
	},
	{
		name: 'Rose',
	},
	{
		name: 'Espumante',
	},
]
var cellars = [
	{
		name: 'Alenna',
	},
	{
		name: 'Alejandro Fernandez',
	},
	{
		name: 'Amalaya',
	},
	{
		name: 'Bodegones del Sur',
	},
	{
		name: 'Estancia La Cruz',
	},
	{
		name: 'Los Vascos',
	},
	{
		name: 'De Martino',
	},
	{
		name: 'Kaiken',
	},
	{
		name: 'Montes',
	},
	{
		name: 'Domaine Almanegra',
	},
	{
		name: 'Castello Banfi',
	},
	{
		name: 'Moet & Chandon',
	},
]
var strains = [
	{
		// strainId: 1
		name: 'Cabernet Franc',
		categoryId: 1,
	},
	{
		// strainId: 2
		name: 'Tempranillo',
		categoryId: 1,
	},
	{
		// strainId: 3
		name: 'Tannat',
		categoryId: 1,
	},
	{
		// strainId: 4
		name: 'Malbec',
		categoryId: 1,
	},
	{
		// strainId: 5
		name: 'Syrah',
		categoryId: 3,
	},

	{
		// strainId: 6
		name: 'Chardonnay',
		categoryId: 2,
	},
	{
		// strainId: 7
		name: 'Blend',
		categoryId: 1,
	},
	{
		// strainId: 8
		name: 'Torrentés',
		categoryId: 2,
	},
	{
		// strainId: 9
		name: 'Viognier',
		categoryId: 2,
	},
	{
		// strainId: 10
		name: 'Asti',
		categoryId: 4,
	},
	{
		// strainId: 11
		name: 'Cinsault',
		categoryId: 3,
	},
	{
		// strainId: 12
		name: 'Malbec',
		categoryId: 3,
	},
	{
		// strainId: 13
		name: 'Blend',
		categoryId: 4,
	},
]
var products = [
	{
		name: 'El enemigo Malbec',
		price: 985,
		description:
			'De color rojo rubí con alta intensidad y destellos violáceos. En nariz se aprecian aromas a fruta roja madura y notas de crianza. En boca tiene un excelente ataque, se percibe con buena textura, carnoso, de buen equilibrio y acidez, con taninos muy marcados.',
		img:
			'https://cdn.shopify.com/s/files/1/0042/8477/6517/products/el-enemigo-malbec-aleanna-alejandro-vigil-argentina-mendoza-vino-tinto-vinos-del-mundo_305_2000x.jpg?v=1545701305',
		stock: 12,
		active: true,
		categoryId: 1,
		cellarId: 1,
		strainId: 4,
		// productId: 1,
	},
	{
		name: 'El enemigo Cabernet Franc',
		price: 735,
		description:
			'De color bordó oscuro. Espectacular en nariz, con notas increíblemente sutiles que obligan a detenerse por varios minutos en esta primera instancia.',
		img:
			'https://cdn.shopify.com/s/files/1/0042/8477/6517/products/el-enemigo-cabernet-franc-aleanna-alejandro-vigil-argentina-mendoza-vino-tinto-vinos-del-mundo_327_2000x.jpg?v=1545701304',
		stock: 25,
		active: true,
		categoryId: 1,
		cellarId: 1,
		strainId: 1,
		// productId: 2,
	},
	{
		name: 'Pesquera Crianza',
		price: 3735,
		description:
			'Color cereza con ribetes violaceos. Limpio y brillante. Elevada intensidad aromatica, con notas de fruta roja madura sobre unos delicados tostados, unos expresivos especiados y refrescantes toques balsamicos. En boca es elegante, sabroso y fresco. Largo recorrido sedoso lleno de fruta. Excelente acidez y taninos amables, domados y jugosos. Final largo de gran persistencia, muy agradable.',
		img:
			'https://cdn.shopify.com/s/files/1/0042/8477/6517/products/alejandro-fernandez-pesquera-crianza-espana-ribera-del-duero-tempranillo-vino-tinto-vinos-mundo_909_2000x.jpg?v=1545701207',
		stock: 39,
		active: true,
		categoryId: 1,
		cellarId: 2,
		strainId: 2,
		// productId: 3,
	},
	{
		name: 'Amalaya Gran Corte',
		price: 1440,
		description:
			'Brillante, con un profundo y penetrante color rubí. Frutas rojas y negras con notas especiadas y mentoladas, típicas de la región y suaves notas a vainilla, provenientes de su paso por barrica.',
		img:
			'https://cdn.shopify.com/s/files/1/0042/8477/6517/products/amalaya-gran-corte-argentina-blend-salta-thibault-delmotte-vino-tinto-vinos-del-mundo_886_2000x.jpg?v=1545701211',
		stock: 12,
		active: true,
		categoryId: 1,
		cellarId: 3,
		strainId: 7,
		// productId: 4,
	},
	{
		name: 'Tanat Limited Edition',
		price: 568,
		description: 'S/D',
		img:
			'https://cdn.shopify.com/s/files/1/0042/8477/6517/products/BodegonesdelSur-Tannat_e4d144c9-0bc8-453c-97aa-2db5c988919b_2000x.jpg?v=1562031541',
		stock: 8,
		active: true,
		categoryId: 1,
		cellarId: 4,
		strainId: 3,
		// productId: 5,
	},
	{
		name: 'Jano Tannat 2013',
		price: 1536,
		description:
			'Un histórico vino, de un establecimiento que posee viñedos que son parte viva de la historia enológica de nuestro país. Estela de Frutos, creadora de este vino, parte de una elaboración tradicional, obteniendo los racimos de Tannat de viñedos con más de 85 años situados en Florida, lo que genera una muy baja producción natural -casi sin necesidad de raleos- y, por lo tanto, una mayor concentración. ',
		img:
			'https://cdn.shopify.com/s/files/1/0042/8477/6517/products/jano2013-VDM_2000x.jpg?v=1587433823',
		stock: 15,
		active: true,
		categoryId: 1,
		cellarId: 5,
		strainId: 3,
		// productId: 6,
	},
	{
		name: 'Los Vascos Le Dix',
		price: 4855,
		description:
			' Profundo color rojo brillante. En nariz entrega aromas a frutos rojos y negros, con un buen nivel de madurez que mantiene la sensación de frescura. Su guarda en barricas de roble francés provenientes de la propia tonelería DBR (Lafite) aporta al vino agradables notas a tostado, café y canela que se integran agradablemente con frutos como grosellas negras, arándanos, guindas, cerezas y moras.',
		img:
			'https://cdn.shopify.com/s/files/1/0042/8477/6517/products/los-vascos-le-dix-blend-chile-colchagua-marcelo-gallardo-vino-tinto-vinos-del-mundo_867_2000x.jpg?v=1545702292',
		stock: 19,
		active: true,
		categoryId: 1,
		cellarId: 6,
		strainId: 7,
		// productId: 7,
	},
	{
		name: 'El Enemigo Chardonanay',
		price: 6850,
		description:
			'De color dorado verdoso opaco. En nariz ofrece notas florales y vegetales, que afirman su costado silvestre, aunque con delicadeza. También se observan algunos aromas que recuerdan el marcado paso por roble.',
		img:
			'https://cdn.shopify.com/s/files/1/0042/8477/6517/products/el-enemigo-chardonnay-aleanna-alejandro-vigil-argentina-mendoza-vino-blanco-vinos-del-mundo_605_2000x.jpg?v=1545701304',
		stock: 15,
		active: true,
		categoryId: 2,
		cellarId: 1,
		strainId: 6,
		// productId: 8,
	},
	{
		name: 'Amalaya Torrentés',
		price: 660,
		description:
			'Dorado intenso con bordes verdes. Intensos y complejos aromas, donde se destaca el pomelo, jazmín y una nota mineral. Un vino muy aromático y fresco. Ideal para el consumo en verano, acompañado con productos de mar o comida mexicana',
		img:
			'https://cdn.shopify.com/s/files/1/0042/8477/6517/products/amalaya-torrontes-argentina-salta-thibault-delmotte-vino-blanco-vinos-del-mundo_464_2000x.jpg?v=1545701213',
		stock: 19,
		active: true,
		categoryId: 2,
		cellarId: 6,
		strainId: 8,
		// productId: 9,
	},
	{
		name: 'Limited Edition Viognier',
		price: 568,
		description: 'S/D',
		img:
			'https://cdn.shopify.com/s/files/1/0042/8477/6517/products/BodegonesdelSur-Viognier_2000x.jpg?v=1562031542',
		stock: 25,
		active: true,
		categoryId: 2,
		cellarId: 4,
		strainId: 9,
		// productId: 10,
	},
	{
		name: 'Amalaya Rosé',
		price: 710,
		description:
			'Capacidad: 750 ml Región: Valle Clachaqui, Salta Cosecha: 2017 Enólogo: Thibault Delmotte Rosa salmón delicado y brillante. Ataque floral muy sutil con dejos de azahares que provienen del Torrontés y notas a cereza y frutilla, típicas del malbec',
		img:
			'https://cdn.shopify.com/s/files/1/0042/8477/6517/products/amalaya-rose-argentina-malbec-salta-thibault-delmotte-vino-vinos-del-mundo_583_2000x.jpg?v=1545701211',
		stock: 99,
		active: true,
		cellarId: 1,
		categoryId: 3,
		strainId: 12,
		// productId: 11,
	},
	{
		name: 'Andeluna 1300',
		price: 1100,
		description:
			'Capacidad: 750 ml Región: Valle Clachaqui, Salta Cosecha: 2017 Enólogo: Thibault Delmotte Rosa salmón delicado y brillante. Ataque floral muy sutil con dejos de azahares que provienen del Torrontés y notas a cereza y frutilla, típicas del malbec',
		img:
			'https://cdn.shopify.com/s/files/1/0042/8477/6517/products/Andeluna1300-Rose-VDM_2000x.jpg?v=1579569689',
		stock: 99,
		active: true,
		cellarId: 1,
		categoryId: 3,
		strainId: 12,
		// productId: 12,
	},
	{
		name: 'De Martino Gallardia',
		price: 1203,
		description:
			'Gallardía es un vino fresco y elegante, que destaca por su gran carácter floral. Su nombre deriva de una flor rústica y vivaz que crece naturalmente en nuestros viñedos y que los llena de aromas y colores. Gallardía le rinde honor a su nombre soportando el implacable clima del Valle del Itata, en el sur de Chile.',
		img:
			'https://cdn.shopify.com/s/files/1/0042/8477/6517/products/de-martino-gallardia-chile-cinsault-marcelo-retamal-valle-itata-vino-rose-vinos-del-mundo_664_2000x.jpg?v=1545701290',
		stock: 99,
		active: true,
		cellarId: 7,
		categoryId: 3,
		strainId: 11,
		// productId: 13,
	},
	{
		name: 'Kaiken',
		price: 828,
		description:
			'Presenta un color rojo cereza, límpido y de gran intensidad. Con aromas frutales, de frutillas maceradas y elegantes notas de violetas que aumentan su complejidad. En boca es un vino con cuerpo, en perfecta armonía con su delicada acidez. Se muestra fresco, delicado y seductor, un perfecto compañero para diversos tipos de comidas. Este es un vino que combina de manera única el frescor de los mejores rosados con el cuerpo y suavidad única de nuestros más queridos malbecs. es un vino fresco y elegante, que destaca por su gran carácter floral. Su nombre deriva de una flor rústica y vivaz que crece naturalmente en nuestros viñedos y que los llena de aromas y colores.',
		img:
			'https://cdn.shopify.com/s/files/1/0042/8477/6517/products/KaikenMalbecRose_2000x.jpg?v=1579572619',
		stock: 99,
		active: true,
		cellarId: 8,
		categoryId: 3,
		strainId: 12,
		// productId: 14,
	},
	{
		name: 'Montes Cherub',
		price: 1580,
		description:
			'Montes Cherub es el resultado de años de experimentación con el Syrah, con el que fuimos pioneros en el Valle de Colchagua. Es un vino seco, seductor y elegante, con un brillante color rosado. Es una excelente expresión de su terroir. En nariz y paladar se muestra el carácter distintivo del Syrah, con notas de frutillas, rosas y naranja. De gran concentración frutal, muestra su riqueza de textura en el paladar con un largo y delicioso final. Posee un fuerte soporte de acidez y una pequeña presencia de taninos que le dan una estructura muy definida.Montes Cherub es un vino seco, seductor y elegante, con un brillante color rosado. Es una excelente expresión de su terroir. En nariz y paladar se muestra el carácter distintivo del Syrah, con notas de frutillas, rosas y naranja.',
		img:
			'https://cdn.shopify.com/s/files/1/0042/8477/6517/products/montes-cherub-rose-aurelio-casablanca-chile-syrah-vino-vinos-del-mundo_204_2000x.jpg?v=1545702318',
		stock: 99,
		active: true,
		cellarId: 9,
		categoryId: 3,
		strainId: 3,
		// productId: 15,
	},
	{
		name: 'Almanegra',
		price: 1969,
		description:
			'En nariz intensidad aromática, frutal y con notas a tostados. En boca es envolvente, con una acidez ligera que le brinda frescura. Su estructura es muy buena con taninos suaves y redondos y con un complejo y agradable final.',
		img:
			'https://cdn.shopify.com/s/files/1/0042/8477/6517/products/almanegra-espumante-brut-nature-rose-alejandro-kuschnaroff-argentina-domaine-malbec-vinos-del-mundo_409_2000x.jpg?v=1545701207',
		stock: 99,
		active: true,
		cellarId: 10,
		categoryId: 4,
		strainId: 13,
		// productId: 16,
	},
	{
		name: 'Banfi Vigne',
		price: 1601,
		description:
			'Castello Banfi es propietario de una histórica finca de 45 hectáreas en Strevi - Piamonte, llamado Banfi Piemonte. sus viñedos están situados entre las localidades de Novi Ligure y Acqui Terme, en una zona con pasión dedicada a la producción de los famosos vinos tradicionales de Piamonte. La bodega, fundada en Strevi en 1860, fue comprado por Banfi a finales de 1970 para completar su finca Piamonte. La cartera Banfi Piemonte cuenta con una amplia gama de productos que incluye vinos únicos brillantes, blancos y rojos, todos ellos teniendo las prestigiosas denominaciones de Piamonte Intenso y frutal con una expresión elegante de aromas típicos Moscato, salvia y flor de durazno. Dulce, crujiente, aromático y armoniosamente delicado en el paladar.',
		img:
			'https://cdn.shopify.com/s/files/1/0042/8477/6517/products/banfi-vigne-regali-asti-espumante-castello-italia-vinos-del-mundo_947_2000x.jpg?v=1545701232',
		stock: 99,
		active: true,
		cellarId: 11,
		categoryId: 4,
		strainId: 10,
		// productId: 17,
	},
	{
		name: 'Dante Robino',
		price: 741,
		description:
			'Espumante joven y actual, elaborado bajo método Charmat (o segunda fermentación en tanque). Los vinos expresan los aromas varietales de la fruta. Su estilo es atractivamente fresco, bebible, y versátil para la gastronomía. Ideal para cócteles o mezclas con jugos de fruta. La línea integra el Extra Brut, recomendado de aperitivo o para platos entrantes.',
		img:
			'https://cdn.shopify.com/s/files/1/0042/8477/6517/products/dante-robino-novecento-extra-brut-argentina-blend-espumante-marcos-miguelez-vinos-del-mundo_343_2000x.jpg?v=1545701286',
		stock: 99,
		active: true,
		cellarId: 10,
		categoryId: 4,
		strainId: 13,
		// productId: 18,
	},
	{
		name: 'Moet Imperial',
		price: 3900,
		description:
			'Vibrante, generoso, seductor. El Champagne más amado del mundo. El ícono de la casa Moet & Chandon desde 1869.',
		img:
			'https://cdn.shopify.com/s/files/1/0042/8477/6517/products/MoetImperial-VDM_2000x.jpg?v=1590499583',
		stock: 99,
		active: true,
		cellarId: 12,
		categoryId: 4,
		strainId: 13,
		// productId: 19,
	},
]

var users = [
	{
		// userId:1,
		first_name: 'Leo',
		last_name: 'Rufino',
		email: 'rufino_138@hotmail.com',
		password: '1234',
		phone: 121312132,
		admin: true,
		active: true,
		salt: 'asdafasfd',
		provider: null,
		providerId: null,
	},
	{
		// userId:2,
		first_name: 'Olivert',
		last_name: 'Borges',
		email: 'olivert.ricardo@gmail.com',
		password: '1234',
		phone: 121312132,
		admin: true,
		active: true,
		salt: 'asdafasfd',
		provider: null,
		providerId: null,
	},
	{
		// userId:3,
		first_name: 'Agustín',
		last_name: 'Minetto',
		email: 'agustin.minetto@gmail.com',
		password: '1234',
		phone: 121312132,
		admin: true,
		active: true,
		salt: 'asdafasfd',
		provider: null,
		providerId: null,
	},
	{
		// userId:4,
		first_name: 'Juan',
		last_name: 'Sepulveda',
		email: 'juan@sepulveda.com.ar',
		password: '1234',
		phone: 121312132,
		admin: true,
		active: true,
		salt: 'asdafasfd',
		provider: null,
		providerId: null,
	},
	{
		// userId:4,
		first_name: 'Agus',
		last_name: 'Min',
		email: 'aghmnl@gmail.com',
		password: '1234',
		phone: 121312132,
		admin: false,
		active: true,
		salt: 'asdafasfd',
		provider: null,
		providerId: null,
	},
]

var status = [
	{
		// statusId:1,
		name: 'carrito',
	},
	{
		// statusId:2,
		name: 'pagada',
	},
	{
		// statusId:3,
		name: 'enviada',
	},
	{
		// statusId:4,
		name: 'cancelada',
	},
	{
		// statusId:5,
		name: 'rechazada',
	},
	{
		// statusId:6
		name: 'entregada',
	},
]

var reviews = [
	{
		// reviewId:1,
		productId: 1,
		userId: 1,
		stars: 1,
		description: 'Ese vino es horrible!',
		date: '2020-08-19',
	},
	{
		productId: 1,
		userId: 2,
		stars: 5,
		description: 'Muy bueno!',
		date: '2020-08-19',
	},
	{
		// reviewId:2,
		productId: 5,
		userId: 2,
		stars: 3,
		description: 'Es medio fulero',
		date: '2020-08-19',
	},
]
var pay_methods = [
	{
		// payMethodId:1,
		name: 'Efectivo',
	},
	{
		name: 'Visa',
	},
	{
		name: 'MasterCard',
	},
	{
		name: 'MercadoPago',
	},
]

var purchased_products = [
	{
		purchaseId: 1,
		productId: 5,
		priceProduct: 39,
		quantity: 5,
		// purchased_productId: 1,
	},
	{
		purchaseId: 1,
		productId: 7,
		priceProduct: 4855,
		quantity: 3,
		// purchased_productId: 2,
	},
	{
		purchaseId: 2,
		productId: 9,
		priceProduct: 1100,
		quantity: 2,
		// purchased_productId: 3,
	},
	{
		purchaseId: 2,
		productId: 12,
		priceProduct: 1100,
		quantity: 1,
		// purchased_productId: 4,
	},
	{
		purchaseId: 3,
		productId: 5,
		priceProduct: 39,
		quantity: 5,
		// purchased_productId: 5,
	},
	{
		purchaseId: 4,
		productId: 7,
		priceProduct: 4855,
		quantity: 3,
		// purchased_productId: 6,
	},
	{
		purchaseId: 5,
		productId: 9,
		priceProduct: 1100,
		quantity: 2,
		// purchased_productId: 7,
	},
	{
		purchaseId: 6,
		productId: 12,
		priceProduct: 1100,
		quantity: 1,
		// purchased_productId: 8,
	},
]
module.exports = { createRegs, createPromise }
