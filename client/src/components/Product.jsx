import React, { useSate } from "react";
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
		<Card style={{width:'55rem', margin:'auto' }} >
			<Container>
			<Row>
			<Col style={{alignSelf:'center'}}>
				<Card.Img src="https://i.ibb.co/jhJXXRv/Botella-vino-1.jpg" />
			</Col>
				<Col>
				<Card.Body>
					<Card.Title>{/*name*/}<h1>Vino</h1></Card.Title>
					<Card.Subtitle className="mb-2 text-muted"><h3>{cellarId}Mendoza</h3></Card.Subtitle>
					<Card.Text text-align="justify">{/*description*/}Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Card.Text>
				</Card.Body>
				<Card.Body>
					<ListGroup className="list-group-flush">
						<ListGroupItem ><h3>{/*price*/}$ 300</h3></ListGroupItem>
						{/* size="lg" style={{fontSize:'2rem'}}  */}
						<ListGroupItem>Productos disponibles: {stock}</ListGroupItem>
						<ListGroupItem>Categoría {/*categoryId*/}</ListGroupItem>
						<ListGroupItem>Cepa {/*strainId**/}</ListGroupItem>
					</ListGroup>
				</Card.Body>
				</Col>
				</Row>
			</Container>
		</Card>
	);
}
