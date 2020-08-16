import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/Product.css";
export default function Product({ id, filtrarProduct }) {
	const product = filtrarProduct(id);
	if(!product) return window.location.href= "/catalogue";
	return (
		<Card style={{width:'55rem', margin:'auto' }} className="mt-3">
			<Container>
				<Row>
					<Col style={{ alignSelf: "center" }}>
						<Card.Img src={product.img} />
					</Col>
					<Col>
						<Card.Body>
							<Card.Title>
								<h1>{product.name}</h1>
							</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">
								<h3>{product.cellar.name}</h3>
							</Card.Subtitle>
							<Card.Text text-align="justify">{product.description}</Card.Text>
						</Card.Body>
						<Card.Body>
							<ListGroup className="list-group-flush">
								<ListGroupItem>
									<h3>$ {product.price}</h3>
								</ListGroupItem>
								{/* size="lg" style={{fontSize:'2rem'}}  */}

								<ListGroupItem>{product.category.name}</ListGroupItem>
								<ListGroupItem>{product.strain.name}</ListGroupItem>
								<ListGroupItem>Productos disponibles: {product.stock}</ListGroupItem>
							</ListGroup>
						</Card.Body>
					</Col>
				</Row>
			</Container>
		</Card>
	);
}
