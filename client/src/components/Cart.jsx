import React, { useContext, createContext } from "react";
import { connect } from "react-redux";
//import { PlusCircleIcon, MinusCircleIcon, TrashIcon } from '../components/icons'
//import  '../store/reducers/index';
import { BsTrash } from "react-icons/bs";
import { VscAdd } from "react-icons/vsc";
import { GrSubtract } from "react-icons/gr";
import "../styles/Cart.css";
import { Card, Container, Row } from "react-bootstrap";
import {
	addProduct,
	deleteProduct,
	editProduct,
	emptyCart,
	increseProduct,
	decreseProduct,
} from "../store/actions/index";

function CartItem({
	products,
	total,
	deleteProduct,
	editProduct,
	emptyCart,
	addProduct,
	decreseProduct,
	increseProduct,
}) {
	return (
		<div style={{ marginTop: "2rem" }}>
			{products.map(product => (
				<Card id="card">
					<Container>
						<Row>
							<div className="col-sm-2 p-2">
								<img
									alt={product.name}
									style={{ margin: "0 auto", maxHeight: "50px" }}
									src={product.img}
									className="img-fluid d-block"
								/>
							</div>
							<div className="col-sm-4 p-2">
								<h5 className="mb-1">{product.name}</h5>
								<p className="mb-1">$ {product.price} </p>
							</div>
							<div className="col-sm-2 p-2 text-center ">
								<p className="mb-0">Cantidad: {product.quantity}</p>
							</div>
							<div className="col-sm-4 p-2 text-right">
								<button onClick={() => increseProduct(product)} className="btn btn-primary btn-sm mr-2 mb-1">
									<VscAdd />
									{/* <PlusCircleIcon width={"20px"}/> */}
								</button>

								{product.quantity > 1 && (
									<button onClick={() => decreseProduct(product)} className="btn btn-danger btn-sm mb-1">
										<GrSubtract />
										{/* <MinusCircleIcon width={"20px"}/> */}
									</button>
								)}
								{product.quantity === 1 && (
									<button onClick={() => deleteProduct(product)} className="btn btn-danger btn-sm mb-1">
										<BsTrash />
										{/* <TrashIcon width={"20px"}/> */}
									</button>
								)}
							</div>
						</Row>
					</Container>
				</Card>
			))}
			<Card id="total">
				<Card.Title>Total: $ {total}</Card.Title>
			</Card>
		</div>
	);
}
export default connect(
	state => ({
		products: state.purchased_products,
		total: state.total,
	}),
	{
		addProduct,
		deleteProduct,
		editProduct,
		emptyCart,
		increseProduct,
		decreseProduct,
	}
)(CartItem);
