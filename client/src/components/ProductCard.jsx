import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { NavLink } from "react-router-dom";

export default function ProductCard({ id, name, cellar, price, img }) {
	return (
		<NavLink to={`/product/${id}`}>
			<Card style={{ width: "18rem", margin: "100px" }}>
				<Card.Img variant="top" src={img} style={{ padding: "20px" }} />
				<Card.Body>
					<Card.Title>{name}</Card.Title>
					<ListGroupItem style={{ border: "0px", padding: "0px" }}>{cellar}</ListGroupItem>
				</Card.Body>
				<ListGroup className="list-group-flush">
					<ListGroupItem>
						<strong>{price}</strong>
					</ListGroupItem>
				</ListGroup>
			</Card>
		</NavLink>
	);
}
