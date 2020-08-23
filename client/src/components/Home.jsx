import React, { useState, useEffect } from "react";
import { CardGroup, Card, Nav } from "react-bootstrap";
import "../styles/Home.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCategories } from "../store/actions/index";
function Home({ categories, getCategories }) {
	const [cats, setCats] = useState([]);
	useEffect(() => {
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
						img = "https://i.ibb.co/p3S1zX2/red-wine-benefits-1592243220.jpg";
						break;
					case "Blanco":
						img = "https://i.ibb.co/87HwZx7/istock-1147260427.jpg";
						break;
					case "Rose":
						img = "https://i.ibb.co/dbRbL0Z/rose-wine-splashing-on-white-background.jpg";
						break;
					case "Espumante":
						img = "https://i.ibb.co/CBjkSDD/champagne-verre-1-1024x682.jpg";
						break;
					default:
						img = "https://cdn.pariscityvision.com/library/image/5731.jpg";
						break;
				}
				return { ...category, img: img };
			})
		);
	}, [categories]);
	return (
		<div>
			<Card id="logo">
				<Card.Img src="https://i.ibb.co/k9pSWmx/default-removebg-preview.png" />
				<Card.Img src="https://i.ibb.co/gMbh6ZK/toni-Black.png" />
			</Card>
			<CardGroup id="categorias">
				{cats.map(cat => (
					<Card>
						<Nav.Link>
							<Link to={`/catalogue/category/${cat.id}`}>
								<Card.Img variant="top" src={cat.img} />
								<Card.Body>
									<Card.Title>{cat.name}</Card.Title>
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
