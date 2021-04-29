import React from "react";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import "../styles/ProductCardCarousel.css";


export default function ProductCard({ id, name, img }) {
	return (
		<NavLink to={`/product/${id}`}>
			<Card className="card-carousel">
				<Card.Img variant="top" src={img} style={{ margin: "15px" }} />
				<Card.Body>
					<Card.Title>{name}</Card.Title>
            </Card.Body>
			</Card>
		</NavLink>
	);
}
