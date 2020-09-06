import React, { useState, useEffect } from "react";
import { CardGroup, Card, Nav, Alert } from "react-bootstrap";
import "../styles/Home.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCategories, setCookiesShown } from "../store/actions/index";
import logo from "../images/logoHome.png";
import marca from "../images/toni-Black.png";
import tinto from "../images/tinto.jpg";
import blanco from "../images/blanco.jpg";
import rose from "../images/rose.jpg";
import espumante from "../images/espumante.jpg";
import otra_categoria from "../images/otra-categoria.jpg";
function Home({ categories, getCategories, cookiesShown, setCookiesShown }) {
	const [cats, setCats] = useState([]);
	const [showToast, setShowToast] = useState(true);
	const toggleShowToast = () => {
		setShowToast(!showToast);
		setCookiesShown();
	};
	useEffect(() => {
		document.body.id = "bg_home";
		async function fetchData() {
			await getCategories();
		}
		fetchData();
	}, []);
	useEffect(() => {
		setCats(
			categories.map(category => {
				let img = "";
				switch (category.name) {
					case "Tinto":
						img = tinto;
						break;
					case "Blanco":
						img = blanco;
						break;
					case "Rose":
						img = rose;
						break;
					case "Espumante":
						img = espumante;
						break;
					default:
						img = otra_categoria;
						break;
				}
				return { ...category, img: img };
			})
		);
	}, [categories]);
	return (
		<div>
			<Card id="logo">
				<Card.Img src={logo} />
				<Card.Img src={marca} />
			</Card>
			{!cookiesShown && (
				<Alert
					variant="info"
					style={{
						position: "fixed",
						top: 0,
						width: "auto",
					}}
					show={showToast}
					onClose={toggleShowToast}
					dismissible
				>
					<Alert.Heading>
						<strong className="mr-auto">Consentimiento uso de cookies</strong>
					</Alert.Heading>
					<p>
						Este sitio web utiliza cookies, propias y de terceros, para personalizar contenido y publicidad, evitar el
						uso de spam, proporcionar funcionalidades a las redes sociales, analizar nuestro tráfico, etc. Al cerrar
						esta ventana haciendo clic en 'X' das consentimiento al uso de esta tecnología en nuestra web. Para más
						información consulta el Reglamento de Protección de Datos europeo (RGPD) de mayo de 2018.
					</p>
				</Alert>
			)}
			<CardGroup id="categorias">
				{cats.map(cat => (
					<Card>
						<Nav.Link>
							<Link to={`/catalogue/category/${cat.id}`}>
								<Card.Img variant="top" src={cat.img} className="imagenes" />
								<Card.Body>
									<Card.Title className="colorText">{cat.name}</Card.Title>
								</Card.Body>
							</Link>
						</Nav.Link>
					</Card>
				))}
			</CardGroup>
		</div>
	);
}
export default connect(({ categories, cookiesShown }) => ({ categories, cookiesShown }), {
	getCategories,
	setCookiesShown,
})(Home);
