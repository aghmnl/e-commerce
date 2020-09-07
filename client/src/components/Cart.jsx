import React, { useEffect } from "react";
import { connect } from "react-redux";
//import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from '../components/icons'
//import  '../store/reducers/index';
import { BsTrash } from "react-icons/bs";
import { VscAdd } from "react-icons/vsc";
import { GrSubtract } from "react-icons/gr";
import "../styles/Cart.css";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import {
	addProduct,
	deleteProduct,
	editProduct,
	emptyCart,
	increseProduct,
	decreseProduct,
	getCartItems,
} from "../store/actions/index";
import axios from "axios";
function CartItem({
	products,
	total,
	cartId,
	deleteProduct,
	editProduct,
	emptyCart,
	addProduct,
	decreseProduct,
	increseProduct,
	getCartItems,
	logged,
}) {
	const history = useHistory();
	useEffect(() => {
		if (!!cartId) getCartItems(cartId);
	}, [cartId]);
	return (
		<div style={{ marginTop: "5rem" }}>
			{products.map(product => (
				<Card id="card">
					<Container>
						<Row>
							<Col sm="1" style={{ alignSelf: "center" }}>
								<Button onClick={() => deleteProduct(product)} className="btn-danger btn-sm">
									<BsTrash />
									{/* <TrashIcon width={"20px"}/> */}
								</Button>
							</Col>
							<Col sm="2" style={{ alignSelf: "center" }}>
								<NavLink to={`/product/${product.id}`}>
									<Card.Img style={{ transform: "scale(0.5)" }} src={product.img} />
								</NavLink>
							</Col>
							<Col sm="3" style={{ alignSelf: "center" }}>
								<NavLink to={`/product/${product.id}`}>
									<Card.Title>{product.name}</Card.Title>
								</NavLink>
							</Col>
							<Col sm="2" style={{ alignSelf: "center" }}>
								<Card.Subtitle>$ {product.price}</Card.Subtitle>
							</Col>

							<Col sm="2" style={{ alignSelf: "center" }}>
								Stock: {product.stock}
							</Col>
							<Col sm="1" style={{ alignSelf: "center" }}>
								<Card.Title> {product.quantity}</Card.Title>
							</Col>

							<Col sm="1" style={{ alignSelf: "center" }}>
								{" "}
								{product.quantity < product.stock && (
									<Button
										onClick={() => {
											if (logged)
												axios
													.post(
														"http://localhost:3001/purchased_products_protected/increase_product",
														{
															cartId,
															id: product.id,
														},
														{ withCredentials: true }
													)
													.then(res => console.log(res))
													.catch(err => console.log(err));
											increseProduct(product);
										}}
										className="btn-sm"
									>
										<VscAdd />
										{/* <PlusCircleIcon width={"20px"}/> */}
									</Button>
								)}
								{product.quantity > 1 && (
									<Button
										onClick={() => {
											if (logged)
												axios
													.post(
														"http://localhost:3001/purchased_products_protected/decrease_product",
														{
															cartId,
															id: product.id,
														},
														{ withCredentials: true }
													)
													.then(res => console.log(res))
													.catch(err => console.log(err));
											decreseProduct(product);
										}}
										className="btn-danger btn-sm"
									>
										<GrSubtract />
										{/* <MinusCircleIcon width={"20px"}/> */}
									</Button>
								)}
							</Col>
						</Row>
					</Container>
				</Card>
			))}
			<Card id="total">
				<Card.Title>
					Total: $ {total}
					<p></p>
					<Button
						onClick={() => {
							emptyCart();
							if (logged)
								axios
									.delete("http://localhost:3001/purchased_products_protected/empty_cart/" + cartId, {
										withCredentials: true,
									})
									.then(res => console.log(res))
									.catch(err => console.log(err));
						}}
						className="btn-danger"
					>
						Vaciar carrito
					</Button>
				</Card.Title>
			</Card>
			{!!products.length && (
				<Card id="checkout">
					<Card.Body>
						<Button onClick={() => history.replace("/checkout")} variant="success">
							Checkout
						</Button>
					</Card.Body>
				</Card>
			)}
		</div>
	);
}
export default connect(
	state => ({
		products: state.purchased_products,
		total: state.total,
		cartId: state.cartId,
		logged: state.logged,
	}),
	{
		addProduct,
		deleteProduct,
		editProduct,
		emptyCart,
		increseProduct,
		decreseProduct,
		getCartItems,
	}
)(CartItem);
