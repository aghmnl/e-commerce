import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../styles/Product.css";
export default function Product({id, filtrarProduct}) {
	const {name, description, img, price, stock, cellarId, categoryId, strainId} = filtrarProduct(id);
	return (
		<Card style={{width:'55rem', margin:'auto' }} className="mt-3">
			<Container>
			<Row>
			<Col style={{alignSelf:'center'}}>
				<Card.Img src={img} />
			</Col>
				<Col>
				<Card.Body>
					<Card.Title>{name}</Card.Title>
					<Card.Subtitle className="mb-2 text-muted"><h3>{cellarId}</h3></Card.Subtitle>
					<Card.Text text-align="justify">{description}</Card.Text>
				</Card.Body>
				<Card.Body>
					<ListGroup className="list-group-flush">
						<ListGroupItem ><h3>{price}</h3></ListGroupItem>
						{/* size="lg" style={{fontSize:'2rem'}}  */}
						<ListGroupItem>Productos disponibles: {stock}</ListGroupItem>
						<ListGroupItem>Categoría {categoryId}</ListGroupItem>
						<ListGroupItem>Cepa {strainId}</ListGroupItem>
					</ListGroup>
				</Card.Body>
				</Col>
				</Row>
			</Container>
		</Card>
	);
}
