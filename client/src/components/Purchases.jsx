import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPurchases } from "../store/actions/index";
import { Card } from "react-bootstrap";

// S43 : Crear Componente Tabla de Ordenes
// Tabla que muestra una lista de ordenes.
// Esta tabla es para el admin.
// Tiene que mostrar todas las ordenes de todos los usuarios.

function allPurchases({ purchases }) {
	return (
		<div className="col-10 purchases">
			{purchases.map(purchase => (
				<Card style={{ width: "18rem" }}>
					<Card.Title>Compra: {purchase.id}</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">Fecha compra: {Date(purchase.date)}</Card.Subtitle>
					<Card.Text>
						Usuario: {purchase.user.name} {purchase.user.last_name}
					</Card.Text>
					<Card.Text>Estado: {purchase.status.name}</Card.Text>
					<Card.Text>Método de pago: {purchase.pay_method.name}</Card.Text>
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
