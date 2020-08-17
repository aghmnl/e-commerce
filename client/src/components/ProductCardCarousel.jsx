import React from "react";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";

export default function ProductCard({ id, name, img }) {
	return (
		<NavLink to={`/product/${id}`}>
			<Card style={{ width: "15rem", height: "15rem", margin: "5px" }}>
				<Card.Img variant="top" src={img} style={{ padding: "5px" }} />
				<Card.Body>
					<Card.Title>{name}</Card.Title>
                </Card.Body>
			</Card>
		</NavLink>
	);
}
