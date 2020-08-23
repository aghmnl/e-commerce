import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPurchases } from "../store/actions/index";
import { Card, Container, Row, Col } from "react-bootstrap";

// S43 : Crear Componente Tabla de Ordenes
// Tabla que muestra una lista de ordenes.
// Esta tabla es para el admin.
// Tiene que mostrar todas las ordenes de todos los usuarios.

function allPurchases({ purchases }) {
	return (
		<div className="col-10 purchases">
			{purchases.map(purchase => (
				<Card id="card" style={{ width: "40rem", marginTop: "1rem" }}>
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
									Usuario: {purchase.user.name} {purchase.user.last_name}
								</Card.Text>
							</Col>
							<Col sm="4" style={{ alignSelf: "center" }}>
								<Card.Text>Estado: {purchase.status.name}</Card.Text>
							</Col>
							<Col sm="4" style={{ alignSelf: "center" }}>
								<Card.Text>Método de pago: {purchase.pay_method.name}</Card.Text>
							</Col>
						</Row>
					</Container>
				</Card>
			))}
		</div>
	);
}

export default connect(
	state => ({
		purchases: state.purchases,
	}),
	{ getPurchases }
)(allPurchases);
