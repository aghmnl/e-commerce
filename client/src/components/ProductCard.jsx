import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { NavLink } from "react-router-dom";

export default function ProductCard({ id, name, price, img }) {
	return (
		<NavLink to={`/product/${id}`}>
			<Card style={{ width: "18rem", margin: "100px" }}>
				<Card.Img variant="top" src={"https://i.ibb.co/jhJXXRv/Botella-vino-1.jpg"} style={{ padding: "20px" }} />
				<Card.Body>
					<Card.Title>Vino Henry</Card.Title>
					<ListGroupItem style={{ border: "0px", padding: "0px" }}>Bodeguita Sanjuanina</ListGroupItem>
				</Card.Body>
				<ListGroup className="list-group-flush">
					<ListGroupItem>
						<strong>4.000 USD</strong>
					</ListGroupItem>
				</ListGroup>
			</Card>
		</NavLink>
	);
}
