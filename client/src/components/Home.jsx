import React, { useState, useEffect } from "react";
import { CardGroup, Card, Nav } from "react-bootstrap";
import "../styles/Home.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCategories } from "../store/actions/index";
import logo from "../images/logoHome.png";
import marca from "../images/toni-Black.png";
import tinto from "../images/tinto.jpg";
import blanco from "../images/blanco.jpg";
import rose from "../images/rose.jpg";
import espumante from "../images/espumante.jpg";
import otra_categoria from "../images/otra-categoria.jpg";
function Home({ categories, getCategories }) {
	const [cats, setCats] = useState([]);
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
export default connect(({ categories }) => ({ categories }), { getCategories })(Home);
