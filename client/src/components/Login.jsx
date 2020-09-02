import React, { useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import { useDispatch, useSelector, connect } from "react-redux";
import { useFormik } from "formik";
import { isAuth, isAdmin, emptyCart, getCart, getCartItems, setIsAdmin } from "../store/actions/index";
import { Form, Card, Button, Col } from "react-bootstrap";
function Login() {
	const dispatch = useDispatch();
	const { logged, admin, purchased_products, cartId } = useSelector(state => state);
	const history = useHistory();
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validate: values => {
			const errors = {};
			!values.email && (errors.email = "Se requiere un Email");
			!values.password && (errors.password = "Se requiere una contraseña");
			return errors;
		},
		onSubmit: values => handleSubmit(values),
	});

	function handleSubmit(values) {
		const url = "http://localhost:3001/auth/login";
		axios
			.post(url, values, {
				withCredentials: true,
			})
			.then(res => {
				console.log({ res });
				const is_admin = res.data.user.admin;
				// Al loguearse, carga todos los productos en la DB y resetea el carrito
				dispatch(isAuth());
				dispatch(setIsAdmin(is_admin));
				if (is_admin) history.replace("/admin");
				else history.replace("/user");
				return dispatch(getCart());
			})
			.then(() => {
				if (purchased_products.length > 0) {
					console.log(cartId);
					return axios.post(
						"http://localhost:3001/purchased_products_protected/add_product",
						{
							cartId: cartId,
							cart_items: purchased_products,
						},
						{ withCredentials: true }
					);
				}
			})
			.then(() => dispatch(getCartItems(cartId)))
			.catch(({ response }) => {
				formik.setFieldError(response.data.input, response.data.message);
			});
	}

	if (logged) {
		return <Redirect to="/settings" />;
	}

	return (
		<div>
			<Card style={{ width: "30rem", margin: "5rem auto", textAlign: "left" }}>
				<Card.Body>
					<Form onSubmit={formik.handleSubmit}>
						<Form.Group as={Col}>
							<Form.Label>Email</Form.Label>
							<Form.Control
								value={formik.values.email}
								onChange={e => formik.setFieldValue("email", e.target.value)}
								onBlur={() => formik.setFieldTouched("email", true)}
								isInvalid={formik.touched.email && !!formik.errors.email}
							/>
							<Form.Control.Feedback type="invalid" tooltip>
								{formik.errors.email && formik.touched.email && formik.errors.email}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col}>
							<Form.Label>Contraseña</Form.Label>
							<Form.Control
								value={formik.values.password}
								type="password"
								onChange={e => formik.setFieldValue("password", e.target.value)}
								onBlur={() => formik.setFieldTouched("password", true)}
								isInvalid={formik.touched.password && !!formik.errors.password}
							/>
							<Form.Control.Feedback type="invalid" tooltip>
								{formik.errors.password && formik.touched.password && formik.errors.password}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col} style={{ display: "flex", flexDirection: "column" }}>
							<Button type="submit" variant="success">
								Iniciar Sesión
							</Button>
							<Link to="/register">Registarse</Link>
							<Link to="/reset">Olvidé mi contraseña</Link>
						</Form.Group>
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
}

export default connect(({ logged, admin }) => {
	return {
		logged,
		admin,
	};
})(Login);
