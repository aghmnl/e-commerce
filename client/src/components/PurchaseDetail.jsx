import React, { useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import "../styles/Tabla.css";
import { useDispatch, useSelector } from "react-redux";
import { getMyPurchase } from "../store/actions";
import { useHistory, Link } from "react-router-dom";
function Purchase({ id }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { purchaseDetail } = useSelector(state => state);

	const Cancel = () => {
		axios
			.put(
				"http://localhost:3001/purchase_protected/cancel",
				{
					id,
					userEmail: purchaseDetail.user.email,
				},
				{ withCredentials: true }
			)
			.then(() => {
				history.replace("/user/purchases");
			})
			.catch(err => console.log(err.response));
	};

	useEffect(() => {
		dispatch(getMyPurchase(id));
	}, [id]);
	useEffect(() => {
		document.body.id = "bg_cart";
	}, []);
	function goBack() {
		window.history.back();
	}
	if (!purchaseDetail) return <div>Espere</div>;
	return (
		<div className="tabla">
			<h2 className="mb-5">Detalle de la compra</h2>
			<Table>
				<thead>
					<tr>
						<th>#Compra</th>
						<th>Fecha</th>
						<th>Usuario</th>
						<th>Entregar en</th>
						<th>Metodo de pago</th>
						<th>Estado</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{purchaseDetail.id}</td>
						<td>{purchaseDetail.date}</td>
						<td>{purchaseDetail.user.email}</td>
						<td>{purchaseDetail.address}</td>
						<td>{!!purchaseDetail.pay_method && purchaseDetail.pay_method.name}</td>
						<td>{purchaseDetail.status.name}</td>
					</tr>
				</tbody>
			</Table>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Precio</th>
						<th>Cantidad</th>
						<th>Subtotal</th>
						{purchaseDetail.status.id === 6 && <th>Review</th>}
					</tr>
				</thead>
				<tbody>
					{purchaseDetail.products.map(e => (
						<tr>
							<td>
								<Link to={`/product/${e.id}`}>{e.name}</Link>
							</td>
							<td>{"$ " + e.purchased_product.priceProduct}</td>
							<td>{e.purchased_product.quantity}</td>
							<td>{"$ " + e.purchased_product.priceProduct}</td>
							{purchaseDetail.status.id === 6 && (
								<th>
									<Link to={`/formReview/${e.id}`}>Review</Link>
								</th>
							)}
						</tr>
					))}
				</tbody>
			</Table>
			<div>
				<h2>Total: $ {purchaseDetail.total}</h2>
				{(() => {
					switch (purchaseDetail.status.name) {
						case "pagada":
							return (
								<div>
									<Button variant="danger" onClick={Cancel}>
										Cancelar Compra
									</Button>
									<Button onClick={() => goBack()}>Volver</Button>
								</div>
							);

						default:
							return <Button onClick={() => goBack()}>Volver</Button>;
					}
				})()}
			</div>
		</div>
	);
}

export default Purchase;
