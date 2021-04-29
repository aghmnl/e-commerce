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
	}, [my_purchases]);
	if (!logged) return <Redirect to="/login" />;
	return (
		<div style={{ marginTop: "5rem" }}>
			{!!my_purchases && my_purchases.length ? (
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
				))
			) : (
				<div style={{ marginTop: "20rem", color: "white", fontSize: "2rem" }}>
					Todavía no ha efectuado ninguna compra
				</div>
			)}
		</div>
	);
}
