import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Card, Row, Col, Dropdown, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { getMyPurchases } from "../store/actions";
export default function Mypurchases() {
	const { my_purchases, logged } = useSelector(state => state);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getMyPurchases());
		document.body.id = "bg_user";
	}, []);
	if (!logged) return <Redirect to="/login" />;
	return (
		<div style={{ marginTop: "5rem" }}>
			{!!my_purchases ? (
				my_purchases.map(purchase => (
					<NavLink to={`/user/purchase/${purchase.id}`}>
						<Card id="card" style={{ width: "45rem", marginTop: "1rem" }}>
							<Container>
								<Row>
									<Col sm="6" style={{ alignSelf: "center" }}>
										<Card.Title>Compra: {purchase.id}</Card.Title>
									</Col>
									<Col sm="6" style={{ alignSelf: "center" }}>
										<Card.Subtitle className="mb-2 text-muted">Fecha compra: {purchase.date}</Card.Subtitle>
									</Col>
								</Row>
								<Row>
									<Col sm="4" style={{ alignSelf: "center" }}>
										<Card.Text>
											Usuario: {purchase.user.first_name} {purchase.user.last_name}
										</Card.Text>
									</Col>
									<Col sm="4" style={{ alignSelf: "center" }}>
										<Card.Text>Estado: {purchase.status.name}</Card.Text>
									</Col>
									<Col sm="4" style={{ alignSelf: "center" }}>
										<Card.Text>Método de pago: {!!purchase.pay_method && purchase.pay_method.name}</Card.Text>
									</Col>
								</Row>
							</Container>
						</Card>
					</NavLink>
					// purchase.products.map(product => (
					// 	<Card style={{ width: "50rem", margin: "auto" }}>
					// 		<Row>
					// 			<Col sm="2" style={{ alignSelf: "center" }}>
					// 				<Card.Img style={{ transform: "scale(0.5)" }} src={product.img}></Card.Img>
					// 			</Col>
					// 			<Col sm="3" style={{ alignSelf: "center" }}>
					// 				<NavLink to={`/product/${product.id}`}>
					// 					<Card.Title>{product.name}</Card.Title>
					// 				</NavLink>
					// 			</Col>
					// 			<Col sm="2" style={{ alignSelf: "center" }}>
					// 				<Card.Subtitle>$ {product.purchased_product.priceProduct}</Card.Subtitle>
					// 			</Col>
					// 			<Col sm="2" style={{ alignSelf: "center" }}>
					// 				<Card.Subtitle>Cantidad: {product.purchased_product.quantity}</Card.Subtitle>
					// 			</Col>
					// 			<Col sm="2" style={{ alignSelf: "center" }}>
					// 				<Card.Subtitle>{purchase.date}</Card.Subtitle>
					// 			</Col>
					// 			{!!purchase.status && purchase.status.name === "entregada" && (<Col>
					// 				<Dropdown>
					// 					<Dropdown.Toggle variant="success" id="dropdown-basic"></Dropdown.Toggle>
					// 					<Dropdown.Menu>
					// 						<Dropdown.Item>
					// 							<NavLink to={`/formReview/${product.id}`}>Review</NavLink>
					// 						</Dropdown.Item>
					// 					</Dropdown.Menu>
					// 				</Dropdown>
					// 			</Col>)}
					// 		</Row>
					// 		<Row>
					// 			<Col>
					// 				<Card.Subtitle>$ {product.total}</Card.Subtitle>
					// 			</Col>
					// 		</Row>
					// 	</Card>)
					// )
				))
			) : (
				<div>No hay nada</div>
			)}
		</div>
	);
}
