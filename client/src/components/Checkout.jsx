import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Card, Col } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { emptyCart, setCart } from "../store/actions";
export default function Checkout() {
	const dispatch = useDispatch();
	const [pay_methods, setPayMethods] = useState([]);
	const [values, setValues] = useState({
		dir: "",
		pm: "",
	});
	const history = useHistory();
	const { logged, purchased_products, cartId } = useSelector(state => state);
	const getCartId = () => {
		axios
			.get("http://localhost:3001/purchase_protected/cart_id", { withCredentials: true })
			.then(res => dispatch(setCart(res.data.cartId)))
			.catch(err => console.log(err.response));
	};
	const formik = useFormik({
		initialValues: values,
		validate: values => {
			const errors = {};
			if (!values.dir) errors.dir = "Debe ingresar su dirección";
			if (!values.pm) errors.pm = "Debe ingresar un metodo de pago";
			return errors;
		},
		onSubmit: values => {
			checkout(values);
			history.replace("/user/purchases");
		},
		onChange: e => {
			console.log(e.target);
		},
	});
	useEffect(() => {
		(async () => {
			const response = await axios
				.get("http://localhost:3001/purchase_protected/pay_methods", {
					withCredentials: true,
				})
				.catch(err => console.log(err.response));
			!!response && setPayMethods(response.data);
		})();
	}, []);
	function checkout(values) {
		axios
			.put(
				"http://localhost:3001/purchase_protected/checkout",
				{
					cartId,
					dir: values.dir,
					pp: values.pm,
				},
				{ withCredentials: true }
			)
			.then(res => {
				dispatch(emptyCart());
				getCartId();
			})
			.catch(err => console.log(err.response));
	}
	if (!logged) return <Redirect to="/login" />;
	return (
		<div>
			<Card style={{ width: "55rem", margin: "5rem auto", textAlign: "left" }}>
				<Card.Body>
					<Form onChange={formik.handleChange} onBlur={formik.handleBlur} onSubmit={formik.handleSubmit}>
						<Form.Group as={Col}>
							<Form.Label>Dirrección</Form.Label>
							<Form.Control id="dir" value={formik.values.dir} isInvalid={formik.touched.dir && !!formik.errors.dir} />
							<Form.Control.Feedback type="invalid" tooltip>
								{!!formik.errors.dir && formik.touched.dir && formik.errors.dir}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col}>
							<Form.Label>Metodo de Pago</Form.Label>
							<Form.Control as="select" id="pm" isInvalid={formik.touched.pm && !!formik.errors.pm}>
								<option value="">Seleccione ...</option>
								{pay_methods.map(pm => (
									<option value={pm.id} selected={pm.id === formik.values.pm ? "selected" : ""}>
										{pm.name}
									</option>
								))}
							</Form.Control>
							<Form.Control.Feedback type="invalid" tooltip>
								{!!formik.errors.pm && formik.touched.pm && formik.errors.pm}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col}>
							<Button type="submit" variant="success">
								Finalizar Compra
							</Button>
						</Form.Group>
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
}
