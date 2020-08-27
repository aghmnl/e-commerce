import React, { useState, useEffect, useCallback } from "react";
import { addProduct, getProduct, cleanProduct } from "../store/actions";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { Alert, Button, Col, Row, Container, Card, ListGroup, ListGroupItem, Spinner } from "react-bootstrap";
import "../styles/Product.css";
import { saveCart, saveTotal } from "../store/localState";
import store from "../store/index";
import Review, {ProductRating} from "./Review";
store.subscribe(() => {
	const { purchased_products, total } = store.getState();
	saveCart(purchased_products);
	saveTotal(total);
});
function Product({ id, productDetail, getProduct, cellar, strain, category, cleanProduct, addProduct }) {
	var historia = useHistory();
	useEffect(() => {
		getProduct(id);
	}, [id]);
	useEffect(() => {
		return () => {
			cleanProduct();
		};
	}, []);
	function goBack() {
		window.history.back();
	}
	function awaitFor(element, prop) {
		if (!element) {
			setInterval(() => "Vacio", 1000);
			return <Spinner animation="border" />;
		}
		if (!prop) return element;
		return element[prop];
	}
	if (!productDetail) return <Redirect to="/catelogue" />;
	return (
		<div>
		<Card style={{ width: "55rem", margin: "auto"}} className="mt-3 center">
			<Container>
				<Row>
					{productDetail.stock === 0 && (
						<Alert style={{ width: "55rem" }} variant="danger">
							Producto agotado
						</Alert>
					)}
					<Col style={{ alignSelf: "center" }}>
						<Card.Img src={productDetail.img} />
					</Col>
					<Col>
						<Card.Body>
							<Card.Title>
								<h1>{productDetail.name}</h1>
							</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">
								<h3>{awaitFor(cellar, "name")}</h3>
							</Card.Subtitle>
							<Card.Text text-align="justify">{productDetail.description}</Card.Text>
						</Card.Body>
						<Card.Body>
							<ListGroup className="list-group-flush">
								<ListGroupItem>
									<h3>$ {productDetail.price}</h3>
								</ListGroupItem>
								{/* size="lg" style={{fontSize:'2rem'}}  */}
								<ListGroupItem>{awaitFor(category, "name")}</ListGroupItem>
								<ListGroupItem>{awaitFor(strain, "name")}</ListGroupItem>
								<ListGroupItem>Productos disponibles: {productDetail.stock}</ListGroupItem>
							</ListGroup>
							{productDetail.stock > 0 && (
								<Button
									onClick={() => {
										addProduct(productDetail);
										historia.replace("/cart");
									}}
								>
									Añadir al carrito
								</Button>
							)}
							<Button className="float-left" onClick={() => goBack()}>
								Volver
							</Button>
						</Card.Body>
					</Col>
				</Row>
			</Container>
		</Card>
			<ProductRating users={productDetail.users} />
			{!productDetail.users?<Spinner animation="border" />:productDetail.users.map(({name, review}) => {
					return(<Review stars={review.stars} user={name} date={review.date} description={review.description}  />)
				})}
		</div>

	);
}
export default connect(
	({ productDetail }) => ({
		productDetail,
		cellar: productDetail.cellar,
		category: productDetail.category,
		strain: productDetail.strain,
	}),
	{ getProduct, addProduct, cleanProduct }
)(Product);
