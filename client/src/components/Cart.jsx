import React, { useEffect } from "react";
import { connect } from "react-redux";
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
								</Button>
							</Col>
							<Col sm="2" style={{ alignSelf: "center" }}>
								<NavLink to={`/product/${product.id}`}>
									<Card.Img style={{ transform: "scale(0.5)" }} src={product.img} />
								</NavLink>
							</Col>
							<Col sm="3" style={{ alignSelf: "center" }}>
								<NavLink to={`/product/${product.id}`}>
									<Card.Title style={{marginBottom: 0}}>{product.name}</Card.Title>
								</NavLink>
							</Col>
							<Col sm="2" style={{ alignSelf: "center", fontSize: "25px" }}>
								$ {product.price}
							</Col>

							<Col sm="2" style={{ alignSelf: "center" }}>
								Stock: {product.stock}
							</Col>
							<Col sm="1" style={{ alignSelf: "center", fontSize: "20px", background: "lightgray" }}>
								 {product.quantity}
							</Col>

							<Col sm="1" style={{ alignSelf: "center" }}>
								<Button
									disabled={product.quantity >= product.stock}
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
								</Button>
								<Button
									disabled={product.quantity <= 0}
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
								</Button>
						
							</Col>
						</Row>
					</Container>
				</Card>
			))}
			<Card id="total">


						<Card.Title style={{ width: "15rem", fontSize: "40px"}}>
							Total: $ {total}
						</Card.Title>


					   {!!products.length && (
							<Card id="checkout">
								<Button onClick={() => history.replace("/checkout")} variant="success">Checkout</Button>
							</Card>
					)}
									<br/>
			
								<Button id="emptyCart"
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



			</Card>

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
